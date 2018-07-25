class ClientBaseApp {

	constructor(appObj) {
		this.app = appObj;
		this.configs = {};
		this._pluginClasses = {};
		this._helperClasses = {};
		this._hookClasses = {};

		this.plugins = {};
		this.helpers = {};
		this.hooks = {};
	}

	initialize() {
		this.mountSubApp();
		this.loadAppGlobals();
		this.loadAppUtils();
		this.loadAppConfigs();
		this.loadAppPlugins();
		this.loadAppHelpers();
		this.loadAppHooks();
	}

	mountSubApp() {
		// view-engine setup
		this.app.set('views', FE.SERVER_APP_PATH + '/legislations/fe/clients/fe/main/modules/');
		this.app.set('view engine', 'pug');
	}

	loadAppGlobals() {
		/**
		 * @description : Load App Globals
		 */
		const loader = require(FE.SERVER_APP_PATH + '/globals/client/index.js');
		const globals = loader(this);

		const clientLoader = require(this._appProps.configsPath);
		const clientGlobals = clientLoader(this);

		Object.assign(this, globals, clientGlobals);
	}

	loadAppUtils() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		const loader = require(FE.SERVER_APP_PATH + '/utils/client/index.js');
		const utils = loader(this);

		const clientLoader = require(this._appProps.utilsPath);
		const clientUtils = clientLoader(this);

		this.utils = Object.assign({}, utils, clientUtils);
	}

	loadAppConfigs() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		const loader = require(FE.SERVER_APP_PATH + '/configs/client/index.js');
		const configs = loader(this);

		const clientLoader = require(this._appProps.configsPath);
		const clientConfigs = clientLoader(this);

		this.configs = Object.assign({}, configs, clientConfigs);
		console.log(this.configs);
	}

	loadAppPlugins() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var pluginClassLoader = require(this.configs.loader.plugins.path);
		this._pluginClasses = pluginClassLoader(this);

		var pluginsToBeLoaded = this.configs.loader.plugins;
		var plugins = pluginsToBeLoaded.includes;
		var pluginsOrder = pluginsToBeLoaded.order;
		for (var pluginKey in pluginsOrder) {
			if (plugins[pluginsOrder[pluginKey]] == true && typeof this._pluginClasses[pluginsOrder[pluginKey]] == "function") {
				var pluginObject = new this._pluginClasses[pluginsOrder[pluginKey]](this);
				pluginObject.initialize();
				this.plugins[pluginsOrder[pluginKey]] = pluginObject;
			}
		}
	}

	loadAppHelpers() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var helperClassLoader = require(this.configs.loader.helpers.path);
		this._helperClasses = helperClassLoader(this);

		var helpersToBeLoaded = this.configs.loader.helpers;
		var helpers = helpersToBeLoaded.includes;
		var helpersOrder = helpersToBeLoaded.order;
		for (var helperKey in helpersOrder) {
			if (helpers[helpersOrder[helperKey]] == true && typeof this._helperClasses[helpersOrder[helperKey]] == "function") {
				var helperObject = new this._helperClasses[helpersOrder[helperKey]](this);
				helperObject.initialize();
				this.helpers[helpersOrder[helperKey]] = helperObject;
			}
		}
	}

	loadAppHooks() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var hookClassLoader = require(this.configs.loader.hooks.path);
		this._hookClasses = hookClassLoader(this);

		var hooksToBeLoaded = this.configs.loader.hooks;
		var hooks = hooksToBeLoaded.includes;
		var hooksOrder = hooksToBeLoaded.order;
		for (var hookKey in hooksOrder) {
			if (hooks[hooksOrder[hookKey]] == true && typeof this._hookClasses[hooksOrder[hookKey]] == "function") {
				var hookObject = new this._hookClasses[hooksOrder[hookKey]](this);
				hookObject.initialize();
				this.hooks[hooksOrder[hookKey]] = hookObject;
			}
		}
	}
}
module.exports = ClientBaseApp;
