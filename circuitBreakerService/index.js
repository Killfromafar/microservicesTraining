var express = require("express");
var app = express();
var request = require("request");
var requestErrorCount = 0;
var requestErrorThreshold = 2;

function makeRequest(res) {
  request("http://localhost:3002", function(error, response, body) {
    if (error) {
      if (requestErrorCount === requestErrorThreshold) {
        circuitBreaker(res, error);
      } else {
        requestErrorCount++;
        res.send("Request Failed!");
      }
    } else {
      requestErrorCount = 0;
      res.send(body);
    }
  });
}

function circuitBreaker(res, error) {
  setTimeout(function() {
    global.circuitBreakerOpen = false;
  }, 5000);
  global.circuitBreakerOpen = true;
  res.send("Circuit breaker closed -> open");
}

app.get("/", function(req, response) {
  if (global.circuitBreakerOpen) {
    response.send("Circuit breaker open");
  } else {
    makeRequest(response);
  }
});

app.listen(3003, () => console.log("Circuit Breaker listening port 3003!"));
