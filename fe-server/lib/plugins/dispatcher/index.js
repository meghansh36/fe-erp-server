const BasePlugin = FE.requireLib('pluginBaseClass.js');

class DispatcherPlugin extends BasePlugin {
constructor(_clientApp) {
    super(_clientApp);
    this._clientApp = _clientApp;
    this._configs = this._clientApp.configs.dispatcher;
    // this._props = {};
  }

  initialize() {

    var router = require('express').Router({mergeParams: true});
    router.get('/:module/:controller/:action',(req, res, next) => {
        var controller = "../legislations/fe/clients/"+req.params.client+"/main/process/"+req.params.module+"/controllers/"+req.params.controller+'.js';
        var controller_class = require(controller);
        var controllerObj = new controller_class();
        var action = req.params.action;
        controllerObj[action](req,res);
    });

    this._clientApp.app.use('/',function(req,res,done){
      res.send('adsdsadsa');
    },router);
  }
}
module.exports = DispatcherPlugin;
