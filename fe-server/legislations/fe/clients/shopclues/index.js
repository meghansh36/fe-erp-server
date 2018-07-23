var express = require('express');
var ClientBaseApp = FE.requireL0('clientBaseApp.js');


var app = express();
class ClientApp extends ClientBaseApp {};
app.all('/', (req, res)=>{
    console.log("In Shop");
    res.send("Shop")
})
var clientObj = new ClientApp(app);
clientObj.initialize();
module.exports = clientObj;
