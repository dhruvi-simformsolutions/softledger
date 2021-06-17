'use strict';

const morgan = require('morgan');
const shrinkRay = require('shrink-ray-current');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');
const cors = require('cors');

const middleware = app => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(shrinkRay());
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());
  //parse query
  app.use((req, res, next) => {
    let tmp = url.parse(req.url, true).query;
    let query = {};
    //replace array keys
    Object.keys(tmp).forEach(key => {
      let newKey = key.replace('[]', '');
      query[newKey] = tmp[key];
    });

    req.query = query;
    next();
  })
}

module.exports = middleware;