var express = require("express");
var app = express();
require("./receive");
global.eventList = [];

app.get("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(global.eventList));
});

app.listen(3002, () =>
  console.log("Receive listening port 3002 HAHAHAHAHAHAHAHAHA!")
);
