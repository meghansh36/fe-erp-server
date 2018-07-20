class ClientBaseApp {
    
    constructor(appObj) {
        this._appObj = appObj;
        this.configs = {};
        this._pluginClasses = {};
     }

    initialize() {
        this.mountSubApp();
        this.loadConfigs();
        this.loadPlugins();
        this.tempFunc();
    }

    mountSubApp() {
        this.app = this._appObj;
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
        var pluginClasses = require(FE.PLUGINS_PATH + '/index.js');
        this._pluginClasses = pluginClasses;

        var pluginsToBeLoaded = this.configs.plugins;
        var plugins = pluginsToBeLoaded.plugins;
        var pluginsOrder = pluginsToBeLoaded.order;

        for(var order in pluginsOrder ) {
            if(plugins[order] === true) {
                var pluginObject = new this._pluginClasses[i]();
                pluginObject.initialize(this);
            }
        }
    }

    tempFunc() {
        var passport = require('passport');
        var middleware = require('@L1Root/middlewares/dispatcher.js');
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use((req, res, next) => {
            if(req.cookies.user_sid && !req.session.username) {
                res.clearCookie('user_sid');
            }
            next();   
        });

        this.app.use('/:client/api/',function(req,res,done) {
            console.log('Inside FE subapp.');
            done();
        }, middleware);
    }
}

module.exports = ClientBaseApp;