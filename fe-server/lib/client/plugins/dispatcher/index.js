const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');

class DispatcherPlugin extends BasePlugin {
	constructor(_appObj) {
		super(_appObj);
		this._appObj = _appObj;
		this._configs = this._appObj.configs.plugins.dispatcher;
		// this._props = {};
	}

	initialize() {
		var router = require('express').Router({
			mergeParams: true
		});
		//the router/dispatcher will function here
		 FE.ACL.then((acl)=>{
		  
		  //just testing acl
		  console.log(acl);
		  router.get('/api/', (req, res, next)=>{
		    acl.isAllowed(420, '/api/', 'post', (err, allowed)=>{
		      if(allowed){
		        next();
		      } else if(!allowed) {
		        res.send('Access Denied');
		      } else if(err){
						next();
					}
		    });	
		  });
			
		  router.get('/:module/:controller/:action', (req, res, next)=>{
		    // acl.isAllowed(420, 'fe/api', 'get', (err, allowed)=>{
		    //   if(allowed){
		    //     next();
		    //   } else {
		    //     res.send('Access Denied');
		    //   }
		    // })
		  // }, (req, res, next) => {
		    var controller = this._appObj.SUB_APP_MODULES_PATH +'/'+ req.params.module + "/controllers/" + req.params.controller+'.js';
		    var controller_class = require(controller);
		    var controllerObj = new controller_class();
		    var action = req.params.action;
		    controllerObj[action](req,res);
			});
			
			// router.get('/:module/:controller/:action/:id', (req, res, next)=>{
		  //   var controller = this._appObj.SUB_APP_MODULES_PATH +'/'+ req.params.module + "/controllers/" + req.params.controller+'.js';
		  //   var controller_class = require(controller);
		  //   var controllerObj = new controller_class();
		  //   var action = req.params.action;
		  //   controllerObj[action](req,res);
		  // });


		  router.post('/:module/:controller/:action', (req, res, next)=>{
		    var controller = this._appObj.SUB_APP_MODULES_PATH +'/'+ req.params.module + "/controllers/" + req.params.controller+'.js';
		    var controller_class = require(controller);
		    var controllerObj = new controller_class();
		    var action = req.params.action;
		    controllerObj[action](req,res);
		  });
		});     

		// this._appObj.app.use('/:module/:controller/:action', (req, res, next) => {
		// 	var controller = this._appObj.SUB_APP_MODULES_PATH + '/' + req.params.module + "/controllers/" + req.params.controller + '.js';
		// 	console.log('serving request');
		// 	res.send('contoller' + controller);

		// 	var controller_class = require(controller);
		// 	var controllerObj = new controller_class();
		// 	var action = req.params.action;
		// 	controllerObj[action](req, res);
		// });
		this._appObj.app.use('/api/:client/:legislation',router);
		console.log('Dispatcher plugin initialized');

	}
}
module.exports = DispatcherPlugin;