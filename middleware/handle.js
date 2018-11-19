'use strict';

const { Pool } = require('pg');

module.exports = async ({ app, conf }) =>
	app.locals.pgsql  = new Pool(conf.get('pgsql'));
