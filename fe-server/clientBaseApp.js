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
    this.loadPlugins();
    this.tempFunc();
  }

  mountSubApp() {
    this.app = this._appObj;
  }

  loadGlobals(){
  /**
   * @description : Load App Globals
  */
    const globals = require('./globals/index.js');
    _.assign(this.app,globals);

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
    var passport = require('passport');
    var middleware = require('@L1Root/middlewares/dispatcher.js');
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use((req, res, next) => {
      if (req.cookies.user_sid && !req.session.username) {
        res.clearCookie('user_sid');
      }
      next();
    });

    this.app.use('/:client/api/', function (req, res, done) {
      console.log('Inside FE subapp.');
      done();
    }, middleware);
  }
}
module.exports = ClientBaseApp;
