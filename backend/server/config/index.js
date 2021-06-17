'use strict';


module.exports = {
	//what my env is dev, test, prod
  env: process.env.NODE_ENV,
  
	// Server port
  port: process.env.PORT || 8083,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  //env specific fields
	...require(`./${process.env.NODE_ENV}.env.js`)
}