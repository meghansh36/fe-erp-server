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
const appObj = express();

appObj.use(bodyParser.json());
appObj.use(bodyParser.urlencoded({'extended':'true'}));
appObj.use(cookieParser());
appObj.use(dynamicStatic);

/**
 * @description : Make FE Obj Global
 */
global.FE = global.FE || {};
FE.app = appObj;

/**
 * @description : Load App Globals
 */
const appGlobals = require('./globals/index.js');
Object.assign(FE, appGlobals);

/**
 * @description : Load App Global L0 Configs
 */
var configs = require('./configs/index.js');
FE.configs = configs;

module.exports = FE.app;
require('./clientSubApps');



//console.log(FE);