var rmsGateway = require("./rmsGateway");
var bus = require('./eventBus');

const aggragateRoot = {
  deviceId: "beep",
  userId: "boop",
  requestTimestamp: Date.now
};

function getPodcastCommand(request, response) {
  console.log('PLACE3');
  podcast = rmsGateway(request.body.podcastId);
  if (podcast) {
    console.log('PLACE4');
    // trigger an event called 'PodcastRetrieved' and send
    // a podcast from rms to the listeners
    bus.emit('PodcastRetrieved', podcast);
  } else { 
    console.log('PLACE5');
    eventEmitter.emit('FAILURE');
  }

}

module.exports = getPodcastCommand;