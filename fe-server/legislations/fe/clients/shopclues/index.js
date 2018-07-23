var express = require('express');
var ClientBaseApp = FE.requireLib('/client/baseApp.js');


var app = express();
class ClientApp extends ClientBaseApp {};
var clientObj = new ClientApp(app);
module.exports = clientObj;
