var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
const BasePlugin = FE.requireL0('pluginBaseClass.js');

class DbPlugin extends BasePlugin {
  constructor(_clientApp) {
    super(_clientApp);
    this._clientApp = _clientApp;
    this._configs = this._clientApp.configs.db;
  }

  initialize() {
    //this._clientApp.app.use(session(this._props));
    const sequelize = new Sequelize(this._configs.db_name, this._configs.db_user, this._configs.db_password, {
      host: this._configs.db_host,
      dialect: this._configs.db_dialect,
      port: this._configs.db_port,
      operatorsAliases: this._configs.operatorsAliases,
      sync:this._configs.sync,
      define:this._configs.define
    });

    var modelsPath  = this._clientApp.SUB_APP_PROCESS_PATH;

    const models = Object.assign({}, ...fs.readdirSync(modelsPath+'/default/models')
    .filter(file =>
      (file.indexOf(".") !== 0) && (file !== "index.js")
    )
    .map(function (file) {
      const model = require(path.join(__dirname, file));
      // console.log(model.init(sequelize).tableName)
      return {
        [model.name]: model.init(sequelize),
      };
    })
    );


    for (const model of Object.keys(models)) {

      typeof models[model].associate === 'function' && models[model].associate(models);
    }

    this._clientApp.models = models;

  }

  

}
module.exports = DbPlugin;


//const CLASSMETHODS = 'classMethods';
//const ASSOCIATE = 'associate';



// Load model associations
