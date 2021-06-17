'use strict';

const routes = app => {

  //main api routes
  require('./api')(app, '/');

}

module.exports = routes;``