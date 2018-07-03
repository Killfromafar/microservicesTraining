var bus = require("./eventBus");

bus.on("GetPodcast", function(podcastId) {
  console.log("GETTING PODCAST...");
  const podcast = podcastId
    ? {
        podcastName: "The Archers",
        podcastDuration: 7000,
        podcastStreamUrl: "http://plz-dont-hack.io",
        token: "b006gpr",
        publishDate: "12/06/2018",
        brandImage: "http://bbcImage.com",
        brandName: "The Archers"
      }
    : null;
  if (podcast) {
    bus.emit("PodcastRetrieved", podcast);
  } else {
    bus.emit("FAILURE");
  }
});
