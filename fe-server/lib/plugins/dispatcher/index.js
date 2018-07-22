const BasePlugin = FE.requireL0('pluginBaseClass.js');

class DispatcherPlugin extends BasePlugin {
constructor(_clientApp) {
    super(_clientApp);
    this._clientApp = _clientApp;
    this._configs = this._clientApp.configs.dispatcher;
    // this._props = {};
  }

  initialize() {

    var router = require('express').Router({mergeParams: true});
    
    //acl dependencies
    var Acl_class = requireL1('lib/plugins/acl');
    var aclObj = new Acl_class(this._clientApp);
    var getAcl = aclObj.initialize();
    var acl;
    this.getAcl().then((acl)=>{
      //the router/dispatcher will function here
        router.get('/:module/:controller/:action',aclObj.validateUser(req, res, next, acl), (req, res, next) => {
        var controller = "../legislations/fe/clients/"+req.params.client+"/main/process/"+req.params.module+"/controllers/"+req.params.controller+'.js';
        var controller_class = require(controller);
        var controllerObj = new controller_class();
        var action = req.params.action;
        controllerObj[action](req,res);
      });    
    });
    

    this._clientApp.app.use('/',function(req,res,done){
      res.send('adsdsadsa');
    },router);
  }
}
module.exports = DispatcherPlugin;
