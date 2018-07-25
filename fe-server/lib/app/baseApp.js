class BaseApp {

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
		this.loadAppGlobals();
		this.loadAppUtils();
		this.loadAppConfigs();
		this.loadAppPlugins();
		this.loadAppHelpers();
		this.loadAppHooks();
		this.loadSubApps();
	}

	loadAppGlobals() {
		/**
		 * @description : Load App Globals
		 */
		//Cannot use FE.SERVER_APP_PATH bcoz globals have not been defined yet.
		//const loader = require(FE.SERVER_APP_PATH + '/globals/app/index.js');
		const loader = require(global.projectFolderPath + '/fe-server/globals/app/index.js');
		const globals = loader(this);
		Object.assign(this, globals);
	}

	loadAppUtils() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		const loader = require(FE.SERVER_APP_PATH + '/utils/app/index.js');
		this.utils = loader(this);
	}

	loadAppConfigs() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		const loader = require(FE.SERVER_APP_PATH + '/configs/app/index.js');
		this.configs = loader(this);
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

	loadSubApps() {
		const vhost = require('vhost');
		const clientArr = FE.configs.clients;
		console.log(clientArr);
		FE.clients = {};
		for (let clientName in clientArr) {
			const appPath = clientArr[clientName]['app'];
			const domainName = clientArr[clientName]['domain'];
			let clientObj = require(appPath);
			clientObj._appProps = clientArr[clientName];
			clientObj.initialize();
			FE.clients[clientArr[clientName]['client']] = clientObj;
			FE.app.use(vhost(domainName, clientObj.app));
		}
	}
}
module.exports = BaseApp;
