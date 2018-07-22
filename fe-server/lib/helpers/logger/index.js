const BaseHelper = FE.requireL0('helperBaseClass.js');
const winston = FE.require('winston');
FE.require('winston-daily-rotate-file');

class LoggerHelper extends BaseHelper {
	constructor(_clientApp) {
		super(_clientApp);
		this._clientApp = _clientApp;
		this._configs = this._clientApp.configs.helpers.logger;
		this._props = {};
	}

	initialize() {
		this.initTraceLogger();
	}

	initTraceLogger() {
		var TraceLogger = require('./trace.js');
		this.trace = new TraceLogger(this._configs.trace);
		this.trace.initialize();
	}
}
module.exports = LoggerHelper;
