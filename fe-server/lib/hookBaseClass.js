class BaseHook {
  constructor(clientApp, requestObj) {
    this._clientApp = clientApp;
    this._requestObj = requestObj;
  }

  initialize() {
  }
}
module.exports = BaseHook;
