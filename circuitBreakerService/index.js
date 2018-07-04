var express = require('express');
var app = express();
var request = require('request');

function makeRequest() {
  request("http://localhost:3002", function (error, response, body) {
    console.log(body);

    if (error) {
      circuitBreaker(response, error)
    } else {
      response.send(body);
    }
  });
}

function circuitBreaker(response, error) {
  // var circuitBreakerConfig = {
  //   errorCount: 5,
  //   timeToReset: 5
  // };
  console.log('circuit breaker code');

  setInterval(makeRequest, 3000);

  console.log('response', response);
  console.log('error', error);

  global.circuitBreakerOpen = true;
  // response.send('Circuit breaker triggered');
}

app.get('/', function (req, response) {
  if (global.circuitBreakerOpen) {
    response.send('I am a clever circuit breaker');
  } else {
    console.log('Make request');
    makeRequest();
  }
});

app.listen(3003, () => console.log("Circuit Breaker listening port 3003!"));
