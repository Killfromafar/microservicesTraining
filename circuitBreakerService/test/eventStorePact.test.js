const path = require("path");
const { Pact } = require("@pact-foundation/pact");
var rp = require("request-promise");

const MOCK_SERVER_PORT = 1235;

describe("Pact", () => {
  // (1) Create the Pact object to represent your provider
  const provider = new Pact({
    consumer: "circuitBreakerService",
    provider: "microservicesEventStore",
    port: MOCK_SERVER_PORT,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
    spec: 2
  });

  // this is the response you expect from your Provider
  const EXPECTED_BODY = [
    {
      card: { cardContent: "Now playing The Archers from 01/01/18" },
      stream: "http://www.plz-dont-hack.io"
    }
  ];

  describe("when there are a list of projects", () => {
    describe("and there is a valid user session", () => {
      beforeAll(done => {
        // (2) Start the mock server
        provider
          .setup()
          // (3) add interactions to the Mock Server, as many as required
          .then(() => {
            return provider.addInteraction({
              // The 'state' field specifies a "Provider State"
              state: "I have a list of events",
              uponReceiving: "a request for events",
              withRequest: {
                method: "GET",
                path: "/"
              },
              willRespondWith: {
                status: 200,
                headers: { "Content-Type": "application/json" },
                body: EXPECTED_BODY
              }
            });
          })
          .then(() => done());
      });

      // (4) write your test(s)
      it("should retrieve the list of events", () => {
        return rp("http://127.0.0.1:1235/") // <- this method would make the remote http call
          .then(body => {
            expect(JSON.parse(body)[0]).toHaveProperty(
              "stream",
              "http://www.plz-dont-hack.io"
            );
          })
          .then(() => provider.verify());
        // (5) validate the interactions you've registered and expected occurred
        // this will throw an error if it fails telling you what went wrong
      });

      // (6) write the pact file for this consumer-provider pair,
      // and shutdown the associated mock server.
      // You should do this only _once_ per Provider you are testing.
      afterAll(() => {
        provider.finalize();
      });
    });
  });
});
