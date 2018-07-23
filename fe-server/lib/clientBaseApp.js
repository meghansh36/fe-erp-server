class ClientBaseApp {

	constructor(appObj) {
		this.app = appObj;
		this.configs = {};
    	this._pluginClasses = {};
    	this.helpers = {};
	}

	initialize() {
		this.mountSubApp();
		this.loadGlobals();
		this.loadConfigs();
		this.initPlugins();
    	this.initHelpers();
	}

	mountSubApp() {
		// view-engine setup
		this.app.set('views', FE.SERVER_APP_PATH + '/legislations/fe/clients/fe/main/process/');
		this.app.set('view engine', 'pug');
	}

	loadGlobals() {
		/**
		 * @description : Load App Globals
		 */
		const globals = require(this._appProps.globalsPath);
		Object.assign(this, globals);
	}

	loadConfigs() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var configs = require(this._appProps.configsPath);
		configs = Object.assign({}, FE.configs, configs);
		this.configs = configs;
	}

	initPlugins() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var pluginsToBeLoaded = this.configs._plugins;
		var plugins = pluginsToBeLoaded.plugins;
		var pluginsOrder = pluginsToBeLoaded.order;
		for (var pluginKey in pluginsOrder) {
			if (plugins[pluginsOrder[pluginKey]] == true && typeof FE._pluginClasses[pluginsOrder[pluginKey]] == "function") {
				var pluginObject = new FE._pluginClasses[pluginsOrder[pluginKey]](this);
				pluginObject.initialize();
			}
		}
	}

	initHelpers() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var helpersToBeLoaded = this.configs._helpers;
		var helpers = helpersToBeLoaded.helpers;
		var helpersOrder = helpersToBeLoaded.order;
		for (var pluginKey in helpersOrder) {
			if (helpers[helpersOrder[pluginKey]] == true && typeof FE._helperClasses[helpersOrder[pluginKey]] == "function") {
				var helperObject = new FE._helperClasses[helpersOrder[pluginKey]](this);
				helperObject.initialize();
				this.helpers[helpersOrder[pluginKey]] = helperObject;
			}
		}
	}
}
module.exports = ClientBaseApp;
