function rmsGateway(podcastId) {
  return podcastId
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
}

module.exports = rmsGateway;