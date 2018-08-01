const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');
const path = require('path');

/**
 *
 *
 * @class DispatcherPlugin
 * @extends {BasePlugin}
 */
class DispatcherPlugin extends BasePlugin {
	/**
	 * Creates an instance of DispatcherPlugin.
	 * @param {any} _appObj
	 *
	 * @memberOf DispatcherPlugin
	 */
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
			//console.log(acl);
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

			router.put('/:module/:controller/:action',this.handleRequest.bind(this));
			router.get('/:module/:controller/:action', this.handleRequest.bind(this));
			router.post('/:module/:controller/:action', this.handleRequest.bind(this));
			router.patch('/:module/:controller/:action', this.handleRequest.bind(this));
			router.delete('/:module/:controller/:action', this.handleRequest.bind(this));
		});
		this._appObj.app.use('/api/:client/:legislation',router);
	}

	handleRequest( req, res, done ) {
		var actionClassPath = path.join(FE.SERVER_APP_PATH, '/main/modules/'+req.params.module+'/controllers/'+req.params.controller+'/'+req.params.action+'Action.js');
		var actionClass = FE.require(actionClassPath);
		var actionClassObject =  new actionClass();
		actionClassObject.initialize(req,res,done);``
	}

}

module.exports = DispatcherPlugin;
