function configLoader(appObj) {
	let config = {
		"core": require('lodash'),
		"date": require('moment')
	};
	return config;
}
module.exports = configLoader;
