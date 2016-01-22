'use strict';

var UnsubscribeModel = require('../../../models/Subreddit');


module.exports = function (router) {

    var model = new UnsubscribeModel();

    router.get('/', function (req, res) {
        
        res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
        
    });

};
