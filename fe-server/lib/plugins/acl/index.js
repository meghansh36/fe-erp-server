var path      = require('path');
const BasePlugin = FE.requireLib('pluginBaseClass.js');
const mongoose = require('mongoose');
const node_acl = require('acl');


class AclPlugin extends BasePlugin{
	
	constructor(_clientApp) {
    super(_clientApp);
    this._clientApp = _clientApp;
	this._configs = this._clientApp.configs.acl;
	this._props = {};
  }
  
  	initialize(){
		this._props.dbUrl = this._configs.dbUrl
		this._props.prefix = this._configs.prefix;
		var acl;
		this.connectMongo(this._props.dbUrl, this._props.prefix)
		.then((mongoBackend)=>{
			//get acl with a mongo backend
			acl = new node_acl(mongoBackend);
			this.set_roles(acl);	//will be changed to fetch roles from mySQL and inject into mongo
			FE.ACL = acl;		//this will be used inside dispatcher to authorize requests
		})
		.catch((err)=> console.error(err));
		console.log('acl plugin initialized!');
  	}

  	//connect to mongoose
 	connectMongo(url, prefix){
    	var prom = new Promise(function(resolve, reject) {
        	mongoose.connect(url, function(err, db) {
            	var mongoBackend = 	new node_acl.mongodbBackend(mongoose.connection.db, prefix);
            	resolve(mongoBackend);
            	reject(err);
        	});
    	});
    	return prom;
	}

	//hardcorded set_roles function (to be handled later)
	set_roles(acl){
    
	    acl.addUserRoles(420, 'b').then( ()=> console.log('added user'))
	    .catch(err => console.error(err)),
	   
	    acl.addUserRoles(520, 'a').then( ()=> console.log('added user'))
	    .catch(err => console.error(err)),

	    //set permissions for roles
	    acl.allow([
	        {
	            roles: 'a',  //roles
	            allows: [
	                {resources: '/fe', permissions: ['put','delete', 'get', 'post']},
	            ]   //permissions
	        },
	        {
	            roles: 'b',
	            allows: [
	                {resources: '/fe/api', permissions: 'post'}
	            ]
	        },
	        {
	            roles: 'c',
	            allows: [
	                {resources: '/', permissions: ['post', 'put']}
	            ]
	        },
	        {
	            roles: 'd',
	            allows: [
	                {resources:'/fe', permissions: ['get', 'post']}
	            ]
	        }
	    ]);
	}

	//middleware to validate user
	// validateUser(req, res, next, acl){
	// 	acl.isAllowed(req.userId, req.url, req.method, (err, allowed)=>{
	// 		if(allowed){
	// 			next();
	// 		} else {
	// 			res.send('Access Denied'); //handle denied access
	// 		}
	// 	});
	//}
};

module.exports = AclPlugin;