var bus = require("./eventBus");

bus.on("PodcastRetrieved", function(podcast) {
  console.log("BUILDING CARD...");
  cardResponse = {
    cardImageUrl: podcast.brandImage,
    cardContent:
      "Now playing " + podcast.brandName + " from " + podcast.publishDate
  };
  bus.emit("CardBuilt", cardResponse);
});
