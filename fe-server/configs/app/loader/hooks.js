function configLoader(appObj) {
	let hooksConfig = {
		path: FE.APP_PATH + '/fe-server/lib/app/hooks',
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
