function configLoader(appObj) {
	let hooksConfig = {
		path: FE.APP_PATH + '/fe-server/lib/client/hooks',
		includes: {
			"logger": true,
			"tracer": true,
		},
		order: [
			"logger",
			"tracer",
		]
    };
    return hooksConfig;
}
module.exports = configLoader;
