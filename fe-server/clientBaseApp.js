class ClientBaseApp {

  constructor(appObj) {
    this._appObj = appObj;
    this.configs = {};
    this._pluginClasses = {};
  }

  initialize() {
    this.mountSubApp();
    this.loadGlobals();
    this.loadConfigs();
    this.mountSubApp();    
    this.loadPlugins();
    this.tempFunc();
  }

  mountSubApp() {
    this.app = this._appObj;
    // view-engine setup
    this.app.set('views', FE.SERVER_APP_PATH + '/legislations/fe/clients/fe/main/process/');
    this.app.set('view engine', 'pug');
  }

  loadGlobals(){
  /**
   * @description : Load App Globals
  */
    const globals = require('./globals/index.js');
    FE._.assign(this.app,globals);

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
    this._pluginClasses = require(FE.PLUGINS_PATH + '/index.js');

    var pluginsToBeLoaded = this.configs.plugins;
    var plugins = pluginsToBeLoaded.plugins;
    var pluginsOrder = pluginsToBeLoaded.order;
    for (var pluginKey in pluginsOrder) {
      if (plugins[pluginsOrder[pluginKey]] == true && typeof this._pluginClasses[pluginsOrder[pluginKey]] == "function") {
        var pluginObject = new this._pluginClasses[pluginsOrder[pluginKey]](this);
        pluginObject.initialize();
      }
    }
  }

  tempFunc() {
    var middleware = require('@L1Root/middlewares/dispatcher.js');
    this.app.use('/:client/api/', function (req, res, done) {
      console.log('Inside FE subapp.');
      done();
    }, middleware);
  }
}
module.exports = ClientBaseApp;
