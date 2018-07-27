const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');
const mongoose = require('mongoose');
const node_acl = require('acl');


class AclPlugin extends BasePlugin{
	
	constructor(_appObj) {
    super(_appObj);
	this._configs = this._appObj.configs.plugins.acl;
	this._props = {};
  }
  
  	initialize(){
		this._props.dbUrl = this._configs.dbUrl
		this._props.prefix = this._configs.prefix;
		var acl;

		//connect to a mongo db and creat acl backend
		FE.ACL = this.connectMongo(this._props.dbUrl, this._props.prefix)
		.then((mongoBackend)=>{
		//get acl with a mongo backend
			acl = new node_acl(mongoBackend);
			//define user roles  and functions
			this.set_roles(acl);	//will be changed to fetch roles from mySQL and inject into mongo
			return acl;				//this will be used inside dispatcher to authorize requests via FE.ACL
		})
		.catch((err)=> console.error(err));
		console.log('acl plugin initialized!');
  	}

  	//connect to a mongo db using mongoose
 	connectMongo(url, prefix){
    	return new Promise(function(resolve, reject) {
        	mongoose.connect(url, function(err, db) {
            	var mongoBackend = 	new node_acl.mongodbBackend(mongoose.connection.db, prefix);
            	resolve(mongoBackend);
            	reject(err);
        	});
    	});
	}

	//hardcorded set_roles function (to be handled later)
	set_roles(acl){

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

		// assign roles to users
		acl.addUserRoles(420, 'b').then( ()=> console.log('added user'))
	    .catch(err => console.error(err));
	   
	    acl.addUserRoles(520, 'a').then( ()=> console.log('added user'))
	    .catch(err => console.error(err));
	}

};

module.exports = AclPlugin;