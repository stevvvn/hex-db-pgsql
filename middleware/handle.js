'use strict';

const { Pool } = require('pg');
const fs = require('fs');

module.exports = async ({ app, conf }) => {
	const connInfo = conf.get('pgsql');
	if (connInfo.ssl) {
		Object.values(connInfo.ssl).forEach((key, val) => {
			if (typeof val === 'string' && (/^[.\/]/).test(val) && fs.existsSync(val)) {
				connInfo.ssl[key] = fs.readFileSync(val);
			}
		});
	}
	app.locals.pgsql  = new Pool(connInfo);
};
