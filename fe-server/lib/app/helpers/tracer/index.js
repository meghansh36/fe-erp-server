const BaseHelper = FE.requireLib('/app/helperBaseClass.js');
const winston = require('winston');
require('winston-daily-rotate-file');

class TracerHelper extends BaseHelper {

	constructor(_appObj) {
		super(_appObj);
		this._appObj = _appObj;
		this._configs = this._appObj.configs.helpers.tracer;
		this._props = {};
	}

	initialize() {
		this._prepareConfigs();
		this._createTransportObj();
		this._createLoggerObj();
	}

	_prepareConfigs() {
		this._props.dirname = this._configs.logsFolder;
        this._props.filename = this._configs.filenameConvention;
        this._props.datePattern = this._configs.datePattern;
		this._props.maxSize = this._configs.maxSize;
		this._props.level = this._configs.level;
		this._props.timestamp = this._configs.timestamp;
		this._props.prettyPrint = this._configs.prettyPrint;
	}

	_createTransportObj() {
        var DailyRotateFile = winston.transports.DailyRotateFile;
		this._transport = new DailyRotateFile(this._props);
	}

	_createLoggerObj() {
		this._logger = winston.createLogger({
			transports: [this._transport],   
		   	exitOnError: false
		});
	}

	_log(type, message, description, stage, vars) {
		var logMsg = {};

		var err = new Error();
		var caller_line = err.stack.split("at ")[3];
		
		var index = caller_line.indexOf("(");
		var lastIndex = caller_line.lastIndexOf(")");
		index = caller_line.slice(index + 1, lastIndex);
		
		var line = index.match(/:[0-9]+:/).toLocaleString();
		line = line.replace(/[^0-9]/g, '');
		
		var curTime = new FE.utils.date();
		var timestamp = curTime.format('YYYY-MM-DD HH:MM:SS');

		logMsg.level = type || 'info';
		logMsg.time = timestamp || '';
		logMsg.msg = message || '';
		logMsg.desc = description || '';
		logMsg.stg = stage || '000';
		logMsg.file = index || 'Not Found';
		logMsg.line = line || 'Not Found';
		var logStr = JSON.stringify(logMsg);
		this._logger.log(type, logMsg);
	}

	info(message, description, stage, vars) {
		return this._log('info', message, description, stage, vars);
	}

	error(message, description, stage, vars) {
		return this._log('error', message, description, stage, vars);
	}

	warn(message, description, stage, vars) {
		return this._log('warn', message, description, stage, vars);
	}

	verbose(message, description, stage, vars) {
		return this._log('verbose', message, description, stage, vars);
	}

	debug(message, description, stage, vars) {
		return this._log('debug', message, description, stage, vars);
	}

	silly(message, description, stage, vars) {
		return this._log('silly', message, description, stage, vars);
	}
}
module.exports = TracerHelper;