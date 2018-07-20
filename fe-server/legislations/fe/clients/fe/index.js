var express = require('express');
var middleware = require('@L1Root/middlewares/dispatcher.js');
var passport = require('passport');

var clientObj = {};
var app = express();


/**
 * @description : Load Client App L3 Configs
 */
var configs = require('./configs/index.js');
clientObj.configs = configs;
clientObj.app = app;

clientObj.app.use(passport.initialize());
clientObj.app.use(passport.session());

clientObj.app.use((req, res, next) => {
    if(req.cookies.user_sid && !req.session.username) {
        res.clearCookie('user_sid');
    }
    next();   
});

clientObj.app.use('/:client/api/',function(req,res,done) {
    console.log('Inside FE subapp.');
    done();
}, middleware);

module.exports = clientObj;