'use strict';

var express = require('express');
var kraken = require('kraken-js');
var session = require('express-session');
var Grant = require('grant-express');

var Purest = require('purest')
var reddit = new Purest({provider:'reddit'})

var options, app;

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

        // var grantConfig = config.get('middleware:grant');
        var grantConfig = config.get('middleware:grant:module:arguments');
        var env = config.get('env:env');
        console.log(env)
        var grant = new Grant(grantConfig[0][env]);
        next(null, config);
    }
};

app = module.exports = express();
app.use([kraken(options)]);

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});