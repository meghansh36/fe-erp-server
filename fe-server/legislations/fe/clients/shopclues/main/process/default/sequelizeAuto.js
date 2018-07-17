var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('dev', 'chiragbansal', '>G?3"qS/',{
  host: 'dev-mumbai.cyvlbltrfdzs.ap-south-1.rds.amazonaws.com',
  port:'3306',
  tables:['aureole_lookup']
});

auto.run(function (err) {
  if (err) throw err;

  // console.log(auto.tables); // table list
  // console.log(auto.foreignKeys); // foreign key list
});