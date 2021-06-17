'use strict';
const chai = require('chai');
const should = chai.should();
let sinonChai = require("sinon-chai");
chai.use(sinonChai);

global.expect = chai.expect;