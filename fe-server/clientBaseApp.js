class ClientBaseApp {
    
    constructor() {
        this.configs = {};
        this._pluginClasses = {};
     }

    initialize() {
        this.loadConfigs();
        this.loadPlugins();
    }

    loadConfigs() {
        /**
         * @description : Load Client App L3 Configs
         */
        var configs = require('./configs/index.js');
        this.configs = configs;
    }

    loadPlugins() {
        /**
         * @description : Load Client App L3 Configs
         */
        var pluginClasses = require(this.configs.FE_PLUGINS_PATH + '/index.js');
        this._pluginClasses = pluginClasses;

        var pluginsToBeLoaded = this.configs.plugins;
        var plugins = pluginsToBeLoaded.plugins;
        for(var i in plugins) {

        }
    }
}