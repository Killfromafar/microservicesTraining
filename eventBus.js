const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// register a listener for the 'FAILURE' event
eventEmitter.on('UnknownEvent', function () {
  console.log('Recieved a unknown event');
  //How do we do an express response.send(404) from here? the below wont work unless we pass the response through on every function
  //res.sendStatus(404);
});

module.exports = eventEmitter;