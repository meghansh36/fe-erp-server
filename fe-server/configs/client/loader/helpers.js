function configLoader(appObj) {
	let helperConfig = {
		path: FE.APP_PATH + '/fe-server/lib/client/helpers',
		includes: {
			"logger": true,
			"loggerDb": true,
			"tracer": true,
			"tracerDb": true
		},
		order: [
			"logger",
			"loggerDb",
			"tracer",
			"tracerDb"
		]
    };
    return helperConfig;
}
module.exports = configLoader;
