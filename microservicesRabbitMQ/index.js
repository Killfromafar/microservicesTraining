var express = require('express');
var app = express();
require('./receive');

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(3001, () => console.log("Receive listening port 3001 HAHAHAHAHAHAHAHAHA!"));
