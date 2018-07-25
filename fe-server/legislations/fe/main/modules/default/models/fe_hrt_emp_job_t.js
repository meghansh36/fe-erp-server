/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const FeEmpJobModel = require('@L1Modules/default/models/fe_hrt_emp_job_t.js')
module.exports =  class LgEmpJobModel extends FeEmpJobModel {
	constructor(){
		super(...arguments);
	}
}	