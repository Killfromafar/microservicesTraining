var bus = require("./eventBus");

const podcasts = [
  {
    podcastId: "theArchersId",
    podcastName: "The Archers",
    podcastStreamUrl: "http://www.plz-dont-hack.io",
    brandName: "The Archers",
    publishDate: "01/01/18"
  },
  {
    podcastId: "worldCupId",
    podcastName: "World Cup",
    podcastStreamUrl: "http://www.plz-dont-hack-goalhole.io",
    brandName: "World Cup",
    publishDate: "01/01/18"
  },
  {
    podcastId: "wimbledonId",
    podcastName: "Wimbledon",
    podcastStreamUrl: "http://www.plz-dont-hack-tennis.io",
    brandName: "Wimbledon",
    publishDate: "01/01/18"
  }
];

bus.on("GetPodcast", function(podcastId) {
  console.log("GETTING PODCAST...");
  const podcast = podcasts.find(pc => pc.podcastId === podcastId);
  console.log(podcast);
  if (podcast) {
    bus.emit("PodcastRetrieved", podcast);
  } else {
    bus.emit("FAILURE");
  }
});

bus.on("PodcastPostList", function(podcastList) {
  console.log("BANANANANANANANA", podcastList);
  // podcasts.concat(podcastList);
  // bus.emit("PodcastListPosted");
});
