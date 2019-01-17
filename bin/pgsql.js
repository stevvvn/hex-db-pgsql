#!/usr/bin/env node
'use strict';
const fs = require('fs');
const { spawn } = require('child_process');
const obj = require('hex-object');
const confPath = process.argv[2] || process.cwd();

const conf = obj.wrap(require(`${ confPath }/conf`));
if (fs.existsSync(`${ confPath }/secrets.js`)) {
	conf.augment(require(`${ confPath }/secrets`)).normalize();
}

const env = {};
const sslParams = {
	'ca': 'PGSSLROOTCERT',
	'key': 'PGSSLKEY',
	'cert': 'PGSSLCERT'
};
Object.entries(conf.get('pgsql')).forEach(([ key, val ]) => {
	if (key === 'ssl') {
		Object.entries(sslParams).forEach(([ jsName, pgName ]) => {
			if (val[jsName]) {
				env[pgName] = val[jsName];
			}
		});
	}
	else {
		env[`PG${ key.toUpperCase() }`] = val;
	}
});
spawn('psql', [ '-w' ], { env, 'stdio': 'inherit' });
