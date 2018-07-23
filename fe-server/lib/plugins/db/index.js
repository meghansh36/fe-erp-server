var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
const BasePlugin = FE.requireLib('pluginBaseClass.js');

class DbPlugin extends BasePlugin {
	constructor(_clientApp) {
		super(_clientApp);
		this._clientApp = _clientApp;
		this._configs = this._clientApp.configs.db;
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

		var processesPath = this._clientApp.SUB_APP_PROCESS_PATH;
		this._models = {};
		fs.readdirSync(processesPath).forEach(process => {
			var modelFolderName = processesPath + '/' + process + '/models';
			fs.access(modelFolderName, fs.constants.R_OK, (err) => {
				if (err) {

				} else {
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
				}
			});
		})

		for (const model of Object.keys(this._models)) {
			typeof this._models[model].associate === 'function' && this._models[model].associate(this._models);
		}

		this._clientApp.models = this._models;

		console.log(FE.clients.fe);

	}

}
module.exports = DbPlugin;
