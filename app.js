const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  '@root'  : __dirname,
  '@L1Root':'../'+__dirname+'/fe-server/',
  '@L1Main':'../'+__dirname+'/fe-server/main',
  '@L1Process':__dirname+'/fe-server/main/process'
//   '@L2Root':'../'+__dirname+'/fe-server/legislations/fe',
//   '@L2Main':'../'+__dirname+'/fe-server/legislations/fe/main',
//   '@L2Process':'../'+__dirname+'/fe-server/legislations/fe/main/process',
//   '@L3Root':'../'+__dirname+'/fe-server/legislations/fe/clients',
//   '@L3Main':'../'+__dirname+'/fe-server/legislations/fe/clients/fe/main',
//   '@L3Process':'../'+__dirname+'/fe-server/legislations/fe/clients/fe/main/process',
});
moduleAlias()
const express = require('express')
// main-app
//const app = express();
app = express();
var passport = require('passport');
require('./configHandler.js');
require('./fe-server/globals/clientsDetails.js');
require('./fe-server/middlewares/fe.middleware.require.js');
// /const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const middleware = require('./fe-server/middlewares/fe.middleware.dispatcher');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(cookieParser());
// app.use('/:client/api/',function(req,res,done){
//   console.log('Inside FE subapp.');
//   done();
// },middleware);

// app.use(session({

// })


module.exports = app;
require("./mountSubApps.js");












// sub-app
// const host1 = require('./app1.js')
// const host2 = require('./app2.js')
// const admin = require('./admin/app')
// const h5 = require('./h5/app')

// app.use(vhost('host1.localhost', host1))
// app.use(vhost('host2.localhost', host2))
//app.use(vhost('api.example.com', api))

// app.use(vhost('www.example.com', h5))
// app.use(vhost('example.com', h5))

// app.use(function (req, res) {
//   console.error('404 in main app')
//   res.status(404).send('Not Found')
// })