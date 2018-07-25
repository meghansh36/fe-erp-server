var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('dev', 'chiragbansal', '>G?3"qS/',{
  host: 'dev-mumbai.cyvlbltrfdzs.ap-south-1.rds.amazonaws.com',
  port:'3306',
  tables:['fe_hrm_designation_ff_m','fe_hrm_business_unit_m','fe_hrm_department_m','fe_hrm_location_m','fe_pym_pay_group_m','fe_hrm_division_m']
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});