var bus = require("./eventBus");

const podcasts = [
  {
    podcastId: "theArchersId",
    podcastName: "The Archers",
    podcastStreamUrl: "http://www.plz-dont-hack.io"
  },
  {
    podcastId: "worldCupId",
    podcastName: "World Cup",
    podcastStreamUrl: "http://www.plz-dont-hack-goalhole.io"
  },
  {
    podcastId: "wimbledonId",
    podcastName: "Wimbledon",
    podcastStreamUrl: "http://www.plz-dont-hack-tennis.io"
  }
];

bus.on("GetPodcast", function(podcastId) {
  console.log("GETTING PODCAST...");
  const podcast = podcasts.find(pc => pc.podcastId === podcastId);
  if (podcast) {
    bus.emit("PodcastRetrieved", podcast);
  } else {
    bus.emit("FAILURE");
  }
});

bus.on("PostPodcast", function(podcast) {
  podcasts.push(podcast);
  bus.emit("PodcastPosted");
});
