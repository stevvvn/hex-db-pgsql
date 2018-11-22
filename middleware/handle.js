'use strict';
const { createPool } = require('promise-mysql');

module.exports = async ({ app, conf }) =>
	app.locals.mysql = createPool(conf.get('mysql'));
