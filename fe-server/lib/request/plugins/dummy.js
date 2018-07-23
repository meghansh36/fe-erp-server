const BasePlugin = FE.requireLib('/app/pluginBaseClass.js');

class DummyPlugin extends BasePlugin {
	constructor(_appObj) {
		super(_appObj);
	}

	initialize() {
		console.log('App Level Dummy Plugin Initialized');
	}
}
module.exports = DummyPlugin;
