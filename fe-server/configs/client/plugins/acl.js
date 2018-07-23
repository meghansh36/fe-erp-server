function configLoader(appObj) {
	let config = {
		dbUrl   : 'mongodb://localhost/acl', 	//change to the mongodb URL
		prefix	: 'acl_'  					//  change ?
	};
	return config;
}
module.exports = configLoader;
