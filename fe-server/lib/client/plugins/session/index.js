const session = FE.require('express-session');
const uuid = FE.require('uuid');

const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');

class SessionPlugin extends BasePlugin {
  constructor(_appObj) {
    super(_appObj);
    this._configs = this._appObj.configs.plugins.session;
    this._props = {};
  }

  initialize() {
    this._props.key = this._configs.sessionKey;
    this._props.secret = this._configs.clientSecret;
    this._props.resave = this._configs.resave;
    this._props.saveUninitialized = this._configs.saveUninitialized;
    this._props.cookie = {};
    this._props.cookie.maxAge = this._configs.cookie.maxAge;
    this._props.cookie.expires = this._configs.cookie.expires;
    this._props.genid = this.sessionIdGenerated;

    if (this._configs.storeType == 'mongo') {
      this._mongoStoreProps = {};
      if (!this._configs.mongo) {
        //@todo : will throw exception
      }
      const mongoStore = FE.require('connect-mongo')(session);

      this._mongoStoreProps.url = this._configs.mongo.url;
      this._mongoStoreProps.ttl = this._configs.mongo.ttl;
      this._props.store = new mongoStore(this._mongoStoreProps);
    }

    this._appObj.app.use(session(this._props));

    // checks if user's cookie is saved in the browser when user is logout
    const thisObj = this;
    this._appObj.app.use((req, res, next) => {
      if(req.cookies[thisObj._props.key] && !req.session.username) {
        res.clearCookie(thisObj._props.key);
      }
      next();   
    });
  }

  sessionIdGenerated(requestObj) {
    var newSessionId = uuid();
    requestObj.sessionId = newSessionId;
    return newSessionId;
  }
}
module.exports = SessionPlugin;
