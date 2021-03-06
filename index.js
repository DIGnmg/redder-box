'use strict';

var express = require('express');
var kraken = require('kraken-js');
var session = require('express-session');
var Grant = require('grant-express');
var Purest = require('purest')
var reddit = new Purest({provider:'reddit'})

var options, app;

// process.env['NODE_ENV'] = 'production';

// top of your main app's file
var opbeat = require('opbeat').start({
  organizationId: 'ec2599017d484a00bb3dfdff0d5a86ca',
  appId: '28df65cc41',
  secretToken: 'f9597f97067713e126cefd10afba989c9798c441'
});

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */

        next(null, config);
    }
};

app = module.exports = express();
app.use([kraken(options)]);

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
    // opbeat.captureError(new Error('Ups, something broke'));
});
