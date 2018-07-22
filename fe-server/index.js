/**
 * @author : Chirag Bansal
 * @date   : 
 * @description : Used plugin (module-alias) to set paths as @L1Root = Main App folder
 */
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@root'       : global.projectFolderPath,
  '@L1Root'     : global.projectFolderPath + '/fe-server/',
  '@L1Main'     : global.projectFolderPath + '/fe-server/main',
  '@L1Process'  : global.projectFolderPath + '/fe-server/main/process'
});
moduleAlias();

/**
 * @description: basic requires
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dynamicStatic = require('express-dynamic-static')();
const BaseAppClass = require('./baseApp');
const appObj = express();

appObj.use(bodyParser.json());
appObj.use(bodyParser.urlencoded({'extended':'true'}));
appObj.use(cookieParser());
appObj.use(dynamicStatic);

/**
 * @description : Make FE Obj Global
 */
global.FE = new BaseAppClass(appObj);
FE.initialize();
module.exports = FE.app;

FE.clients.fe.helpers.logger.trace.info('my message');