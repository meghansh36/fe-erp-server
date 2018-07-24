function configLoader(appObj) {
	let config = {
		dbUrl   : 'mongodb://guest:guest1@ds133597.mlab.com:33597/fe-erp', 	//change to the mongodb URL
		prefix	: 'acl_'  					//  change ?
	};
	return config;
}
module.exports = configLoader;
