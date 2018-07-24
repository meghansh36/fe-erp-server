function configLoader(appObj) {
	let config = {
		APP_PATH: global.projectFolderPath,
		CLIENT_APP_PATH: global.projectFolderPath + '/fe-client',
		SERVER_APP_PATH: global.projectFolderPath + '/fe-server',
		LIBRARY_PATH: global.projectFolderPath + '/fe-server/lib',
	};
	return config;
}
module.exports = configLoader;
