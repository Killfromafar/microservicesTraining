var express = require('express');
var app = express();
var request = require('request');

app.get('/', function (req, res) {


  function circuitBreaker(response) {
    // var circuitBreakerConfig = {
    //   errorCount: 5,
    //   timeToReset: 5
    // };
    console.log('circuit breaker code');

    global.circuitBreakerOpen = true;
    res.send('fail');
  }

  if (global.circuitBreakerOpen) {
    res.send('I am a clever circuit breaker');
  } else {
    console.log('in request');
    request("http://localhost:3002", function (error, response, body) {
      console.log(body);

      if (error) {
        circuitBreaker(error)
      } else {
        res.send(body);
      }
    });
  }
});

app.listen(3003, () => console.log("Circuit Breaker listening port 3003!"));
