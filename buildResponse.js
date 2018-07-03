var bus = require("./eventBus");

bus.on("PodcastRetrieved", function(podcast) {
  console.log("BUILDING STREAM...");
  streamUrlResponse = {
    streamUrl: podcast.podcastStreamUrl
  };
  bus.emit("StreamUrlBuilt", streamUrlResponse);
});
