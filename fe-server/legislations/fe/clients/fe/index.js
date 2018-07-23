var express = require('express');
var ClientBaseApp = FE.requireLib('clientBaseApp.js');


var app = express();
class ClientApp extends ClientBaseApp {};
var clientObj = new ClientApp(app);
module.exports = clientObj;
