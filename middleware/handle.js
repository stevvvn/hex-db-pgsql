'use strict';

const sqlite = require('sqlite');

module.exports = async ({ app, conf }) =>
	app.locals.sqlite = await sqlite.open(conf.get('sqlite.path'), { Promise });
