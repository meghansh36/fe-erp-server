function configLoader(appObj) {
	let pluginConfig = {
		path: FE.APP_PATH + '/fe-server/lib/app/plugins',
		includes: {"dummy":true},
		order: ["dummy"]
    };
    return pluginConfig;
}

module.exports = configLoader;
