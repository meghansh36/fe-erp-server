function configLoader(appObj) {
	let pluginConfig = {
		path: FE.APP_PATH + '/fe-server/lib/client/plugins',
		includes    : {
			"session"       : true,
			"db"            : true,
			//"reqHooks"      : true,
			"auth"          : true,
			"acl"           : true,
			"dispatcher"    : true
		},
		order    : [
			"session",
			"db",
			//"reqHooks",
			"auth",
			"acl",
			"dispatcher"
		]
    };
    return pluginConfig;
}

module.exports = configLoader;
