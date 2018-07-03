#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect(
  "amqp://localhost",
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = "serviceCQueue";

      ch.assertQueue(q, { durable: false });
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      ch.consume(
        q,
        function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
          event = {
            timestamp: Date.now(),
            message: msg.content.toString()
          };

          global.eventList.push(JSON.stringify(event));
        },
        { noAck: true }
      );
    });
  }
);
