const BaseHelper = FE.requireLib('helperBaseClass.js');
const winston = require('winston');
require('winston-daily-rotate-file');

class LoggerHelper extends BaseHelper {

	constructor(_clientApp) {
		super(_clientApp);
		this._clientApp = _clientApp;
		this._configs = this._clientApp.configs.helpers.logger;
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

	_log(type, error, description, stage, vars) {
		var logMsg = {};

		var msg = '';
		var fileIndex = 3;
		if(this._isError(error)) {
			var err = error;
			msg = error.message;
			fileIndex = 1;
		} else {
			var err = new Error();
			msg = error;
		}
		var caller_line = err.stack.split("at ")[fileIndex];
		
		var index = caller_line.indexOf("(");
		var lastIndex = caller_line.lastIndexOf(")");
		index = caller_line.slice(index + 1, lastIndex);
		
		var line = index.match(/:[0-9]+:/).toLocaleString();
		line = line.replace(/[^0-9]/g, '');
		
		var curTime = new FE.utils.date();
		var timestamp = curTime.format('YYYY-MM-DD HH:MM:SS');

		logMsg.level = type || 'info';
		logMsg.time = timestamp || '';
		logMsg.msg = msg || '';
		logMsg.desc = description || '';
		logMsg.stg = stage || '000';
		logMsg.file = index || 'Not Found';
		logMsg.stack = err.stack || 'Not Found';
		logMsg.line = line || 'Not Found';
		var logStr = JSON.stringify(logMsg);
		this._logger.log(type, logMsg);
	}

	info(error, description, stage, vars) {
		return this._log('info', error, description, stage, vars);
	}

	error(error, description, stage, vars) {
		return this._log('error', error, description, stage, vars);
	}

	warn(error, description, stage, vars) {
		return this._log('warn', error, description, stage, vars);
	}

	verbose(error, description, stage, vars) {
		return this._log('verbose', error, description, stage, vars);
	}

	debug(error, description, stage, vars) {
		return this._log('debug', error, description, stage, vars);
	}

	silly(error, description, stage, vars) {
		return this._log('silly', error, description, stage, vars);
	}

	/**
     * Checks if value is an Error or Error-like object
     * @static
     * @param  {Any}     val Value to test
     * @return {Boolean}     Whether the value is an Error or Error-like object
     */
    _isError(val) {
        return !!val && typeof val === 'object' && (
            val instanceof Error || (
                val.hasOwnProperty('message') && val.hasOwnProperty('stack')
            )
        );
	}
}
module.exports = LoggerHelper;