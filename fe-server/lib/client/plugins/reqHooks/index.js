const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');

class ReqHookPlugin extends BasePlugin {
  constructor(_appObj) {
    super(_appObj);
    this._configs = this._appObj.configs.plugins._reqHooks;
    this._props = {};
  }

  initialize() {
    // checks if user's cookie is saved in the browser when user is logout
    const thisObj = this;
    this._appObj.app.use((req, res, next) => {
      req.hooks = req.hooks || {};
      for(var i in thisObj._appObj._hookClasses)  {
        req.hooks[i] = new thisObj._appObj._hookClasses[i](thisObj._appObj, req, res, next);
        req.hooks[i].initialize();
      }
    });
  }
}
module.exports = ReqHookPlugin;
