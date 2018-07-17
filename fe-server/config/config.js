//require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = 'dev';
CONFIG.port         = '3000';

CONFIG.db_dialect   = 'mysql';
CONFIG.db_host      = 'dev-mumbai.cyvlbltrfdzs.ap-south-1.rds.amazonaws.com';
CONFIG.db_port      = '3306';
CONFIG.db_name      = 'dev';
CONFIG.db_user      = 'chiragbansal';
CONFIG.db_password  = '>G?3"qS/';

console.log('INSIDE CONFIG');
module.exports = CONFIG;
