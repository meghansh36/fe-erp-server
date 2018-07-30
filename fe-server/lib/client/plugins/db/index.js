var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');

/**
 * 
 * 
 * @class DbPlugin
 * @extends {BasePlugin}
 */
class DbPlugin extends BasePlugin {
	/**
	 * Creates an instance of DbPlugin.
	 * @param {any} _appObj 
	 * 
	 * @memberOf DbPlugin
	 */
	constructor(_appObj) {
		super(_appObj);
		this._configs = this._appObj.configs.plugins.db;
		this._props = {};
		this._models = {};
	}

	initialize() {

		this._props.dbName = this._configs.db_name;
		this._props.dbPort = this._configs.db_port;
		this._props.dbUser = this._configs.db_user;
		this._props.dbPassword = this._configs.db_password;
		this._props.dbHost = this._configs.db_host;
		this._props.dbDialect = this._configs.db_dialect;
		this._props.operatorsAliases = this._configs.operatorsAliases;
		this._props.sync = this._configs.sync;
		this._props.define = this._configs.define;

		this.initializeSequelize();

	}

	initializeSequelize(){
		const sequelize = new Sequelize(
			this._props.dbName,
			this._props.dbUser,
			this._props.dbPassword, {
				host: this._props.dbHost,
				dialect: this._props.dbDialect,
				port: this._props.dbPort,
				operatorsAliases: this._props.operatorsAliases,
				sync: this._props.sync,
				define: this._props.define
			});

		FE.DBOBJECT = sequelize;
		this.registeringModels(sequelize);
	}

	registeringModels(sequelize){
		var modulesPath = this._appObj.SUB_APP_MODULES_PATH;
		this._models = {};
		fs.readdirSync(modulesPath).forEach(module => {
			var modelFolderName = modulesPath + '/' + module + '/models';
			// fs.access(modelFolderName, fs.constants.R_OK, (err) => {
			// 	if (err) {

			// 	} else {
					Object.assign(
						this._models, ...fs.readdirSync(modelFolderName)
						.filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
						.map(function (file) {
							const model = require(path.join(modelFolderName, file));
							return {
								[model.name]: model.init(sequelize),
							};
						})
					);
				
			
		})

		for (const model of Object.keys(this._models)) {
			typeof this._models[model].associate === 'function' && this._models[model].associate(this._models);
		}

		this._appObj.models = this._models;
	}

}
module.exports = DbPlugin;
