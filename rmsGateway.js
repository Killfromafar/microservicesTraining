function rmsGateway(podcastId) {
  return podcastId
    ? {
      podcastName: "The Archers",
      podcastDuration: 7000,
      podcastStreamUrl: "http://plz-dont-hack.io"
    }
    : null;
}

module.exports = rmsGateway;