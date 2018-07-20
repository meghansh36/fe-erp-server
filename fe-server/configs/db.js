//require('dotenv').config();//instatiate environment variables

let dbConfig = {
    app: 'dev',
    port: '3000',
    db_dialect:'mysql',
    db_host: 'dev-mumbai.cyvlbltrfdzs.ap-south-1.rds.amazonaws.com',
    db_port: '3306',
    db_name: 'dev',
    db_user: 'chiragbansal',
    db_password : '>G?3"qS/',
    operatorsAliases: false,
    sync:{force:false},
    define:{
      timestamps: false
    }
  }
  module.exports = dbConfig;
  