var express = require("express");
var bodyParser = require("body-parser");

var getPodcastCommand = require("./getPodcastCommand");
var bus = require('./eventBus');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", function (req, res) {
  console.log('PLACE2');

  bus.on('PodcastRetrieved', function () {
    console.log('Received the podcast: ' + JSON.stringify(podcast));
    res.sendStatus(200);
  });

  bus.on('FAILURE', function () {
    console.log('Recieved a FAILURE event');
    res.sendStatus(404);
  });

  //execute command
  getPodcastCommand(req, res);
});

//get route just to test exptress is working via browser
app.get("/", function (req, res) {
  console.log("working");
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));