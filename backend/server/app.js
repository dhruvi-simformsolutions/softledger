const restana = require('restana');
const config = require('./config');
const middleware = require('./middleware');
const routes = require('./routes');

// Setup server
let app = restana({
  ignoreTrailingSlash: true,
  //setup default error response
  errorHandler: (err, req, res) => {
    console.log("unhandled", err);
    return res.send({ err }, 500)
  }
});

middleware(app);
routes(app);

// Start server
function startServer() {
  app.server = app.start(config.port, config.ip)
    .then(server => {
      console.log('server listening on %d', config.port);
      return server;
    });
}

startServer();

// Expose app
module.exports = app;