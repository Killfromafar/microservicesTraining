var rmsGateway = require("./rmsGateway");
var bus = require('./eventBus');


function getPodcastCommand(request) {
  console.log('PLACE2');
  podcast = rmsGateway(request.body.podcastId);
  if (podcast) {
    console.log('PLACE3');
    bus.emit('PodcastRetrieved', podcast);
  } else { 
    console.log('PLACE4');
    bus.emit('FAILURE');
  }
}

module.exports = getPodcastCommand;