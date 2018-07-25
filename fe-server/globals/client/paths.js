function configLoader(appObj) {
	let config = {
		SUB_APP_PATH: FE.SERVER_APP_PATH + '/legislations/' + appObj._appProps.legislation + '/clients/' + appObj._appProps.client,
		SUB_APP_MAIN_PATH: FE.SERVER_APP_PATH + '/legislations/' + appObj._appProps.legislation + '/clients/' + appObj._appProps.client + 'main',
		SUB_APP_MODULES_PATH: FE.SERVER_APP_PATH + '/legislations/' + appObj._appProps.legislation + '/clients/' + appObj._appProps.client + '/main/modules',
	};
	return config;
}
module.exports = configLoader;
