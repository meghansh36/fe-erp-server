/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgEmpJobModel = require('@L2Process/default/models/fe_hrt_emp_job_t.js')
module.exports =  class EmpJobModel extends LgEmpJobModel {
	constructor(){
		super(...arguments);
	}
}	