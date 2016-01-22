'use strict';

var IndexModel = require('../models/index');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        res.send('<code><pre>' + model.name + '</pre></code>');
    });

};
