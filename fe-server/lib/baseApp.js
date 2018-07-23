class BaseApp {

	constructor(appObj) {
		this.app = appObj;
		this.configs = {};
		this._pluginClasses = {};
	}

	initialize() {
        this.loadGlobals();
        this.loadUtils();
		this.loadConfigs();
		this.loadPluginsClasses();
		this.loadHelpersClasses();
		this.loadHooksClasses();
        this.loadSubApps();
	}

	loadGlobals() {
		/**
		 * @description : Load App Globals
		 */
		const globals = require(global.projectFolderPath + '/fe-server/globals/index.js');
        Object.assign(this, globals);
    }
    
    loadUtils() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var utils = require(FE.SERVER_APP_PATH + '/utils/index.js');
        this.utils = utils;
	}

	loadConfigs() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		var configs = require(FE.SERVER_APP_PATH + '/configs/index.js');
		this.configs = configs;
	}

	loadPluginsClasses() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		this._pluginClasses = require(FE.PLUGINS_PATH);

		/* var pluginsToBeLoaded = this.configs.plugins;
		var plugins = pluginsToBeLoaded.plugins;
		var pluginsOrder = pluginsToBeLoaded.order;
		for (var pluginKey in pluginsOrder) {
			if (plugins[pluginsOrder[pluginKey]] == true && typeof this._pluginClasses[pluginsOrder[pluginKey]] == "function") {
				var pluginObject = new this._pluginClasses[pluginsOrder[pluginKey]](this);
				pluginObject.initialize();
			}
		} */
	}
	
	loadHelpersClasses() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		this._helperClasses = require(FE.HELPERS_PATH);
		
		console.log(this._helperClasses);

		/* var helpersToBeLoaded = this.configs.helpers;
		var helpers = helpersToBeLoaded.helpers;
		var helpersOrder = helpersToBeLoaded.order;
		for (var pluginKey in helpersOrder) {
			if (helpers[helpersOrder[pluginKey]] == true && typeof this._helperClasses[helpersOrder[pluginKey]] == "function") {
				var pluginObject = new this._pluginClasses[helpersOrder[pluginKey]](this);
				pluginObject.initialize();
			}
		} */
	}
	
	loadHooksClasses() {
		/**
		 * @description : Load Client App L3 Configs
		 */
		this._hookClasses = require(FE.HOOKS_PATH);

		/* var helpersToBeLoaded = this.configs.helpers;
		var helpers = helpersToBeLoaded.helpers;
		var helpersOrder = helpersToBeLoaded.order;
		for (var pluginKey in helpersOrder) {
			if (helpers[helpersOrder[pluginKey]] == true && typeof this._helperClasses[helpersOrder[pluginKey]] == "function") {
				var pluginObject = new this._pluginClasses[helpersOrder[pluginKey]](this);
				pluginObject.initialize();
			}
		} */
    }
    
    loadSubApps() {
        const vhost = require('vhost');
		const clientArr = FE.configs.clients;

		FE.clients = {};
		for(let clientName in clientArr) {
			const appPath = clientArr[clientName]['app'];
			const domainName = clientArr[clientName]['domain'];
			let clientObj = require(appPath);
			clientObj._appProps = clientArr[clientName];
			clientObj.initialize();
			FE.clients[clientArr[clientName]['client']] = clientObj;
			console.log('FE.clients ----- >',FE.clients);
			//FE.loadClientAppa(appObj);
			FE.app.use(vhost(domainName, clientObj.app));
		}
    }
}
module.exports = BaseApp;
