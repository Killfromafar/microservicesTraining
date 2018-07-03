var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var getPodcastCommand = require("./getPodcastCommand");
var aggregateRoot = require("./aggregateRoot");
var buildCard = require("./buildCard");
var buildResponse = require("./buildResponse");
var bus = require("./eventBus");
var amqp = require("amqplib/callback_api");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

function queueResponse(response) {
  amqp.connect(
    "amqp://localhost",
    function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = "serviceBQueue";

        ch.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(JSON.stringify(response)));
        console.log(" [x] serviceBQueue Sent %s", response);
      });

      conn.createChannel(function(err, ch) {
        var q = "serviceCQueue";

        ch.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(JSON.stringify(response)));
        console.log(" [x] serviceCQueue Sent %s", response);
      });
      // setTimeout(function() { conn.close(); process.exit(0) }, 500);
    }
  );
}

app.post("/", function(req, res) {
  var streamBuilt = false;
  var cardBuilt = false;
  aggregateRoot.userId = req.userId;

  bus.on("ResponseReady", function(appResponse) {
    console.log("About to respond to express: " + JSON.stringify(appResponse));
    queueResponse(appResponse);
    res.sendStatus(200);
  });

  var appResponse = {};

  bus.on("ResponsePartiallyReady", function(partialResponse) {
    console.log("PARTIAL RESPONSE LISTENER...");
    if (partialResponse.card) {
      appResponse.card = partialResponse.card;
    }
    if (partialResponse.stream) {
      appResponse.stream = partialResponse.stream;
    }
    if (streamBuilt && cardBuilt) {
      bus.emit("ResponseReady", appResponse);
    }
  });

  bus.on("StreamUrlBuilt", function(streamResponse) {
    console.log("STEAM BUILT LISTENER");
    var appResponse = {
      stream: streamResponse.streamUrl
    };
    streamBuilt = true;
    bus.emit("ResponsePartiallyReady", appResponse);
  });

  bus.on("CardBuilt", function(cardResponse) {
    console.log("CARD BUILT LISTENER: ");
    var appResponse = {
      card: cardResponse
    };
    cardBuilt = true;
    bus.emit("ResponsePartiallyReady", appResponse);
  });

  bus.on("FAILURE", function() {
    console.log("Recieved a FAILURE event");
    res.sendStatus(404);
  });

  bus.emit("GetPodcast", req.body.podcastId);
});

//get route just to test exptress is working via browser
app.get("/", function(req, res) {
  console.log("working");
  res.sendStatus(200);
});

request("http://localhost:3002", function(error, response, body) {
  const podcastList = body.map(event => {
    console.log(event);
    return { message: event.message };
  });
  bus.emit("PodcastPostList", podcastList);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
