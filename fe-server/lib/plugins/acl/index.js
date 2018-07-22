var path      = require('path');
const BasePlugin = FE.requireL0('pluginBaseClass.js');
const mongoose = require('mongoose');
const node_acl = require('acl');


class AclPlugin extends BasePlugin{
	
	constructor(_clientApp) {
    super(_clientApp);
    this._clientApp = _clientApp;
    this._configs = this._clientApp.configs.acl;
  }
  
  	intialize(){
		return this.connectMongo()
		.then((acl)=>{
			//logic to store roles and users into mongo
			set_roles(acl);	//will be changed to fetch roles from mySQL and inject into mongo
			return acl;		//this will be used inside dispatcher to authorize requests
		})
		.catch((err)=> console.error(err)); 
  	}

  	//connect to mongoose
 	connectMongo(){
    	var prom = new Promise(function(resolve, reject) {
        	mongoose.connect(this._configs.mongoUrl, function(err, db) {
            	var acl = 	new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, this._configs.prefix));
            	resolve(acl);
            	reject(err);
        	});
    	});
    	return prom;
	}

	//middleware to validate user
	validateUser(req, res, next, acl){
		acl.isAllowed(req.userId, req.url, req.method, (err, allowed)=>{
			if(allowed){
				next();
			} else {
				res.send('Access Denied'); //handle denied access
			}
		});
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

};