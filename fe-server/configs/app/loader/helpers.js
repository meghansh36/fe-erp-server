function configLoader(appObj) {
	let helperConfig = {
		path: FE.APP_PATH + '/fe-server/lib/app/helpers',
		includes: {
			"logger": true,
			"tracer": true,
		},
		order: [
			"logger",
			"tracer",
		]
    };
    return helperConfig;
}
module.exports = configLoader;
