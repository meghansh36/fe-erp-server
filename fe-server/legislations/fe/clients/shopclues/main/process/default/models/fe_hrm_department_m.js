/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgDepartmentModel = require('@L2Process/default/models/fe_hrm_department_m.js')
	module.exports =  class DepartmentModel extends LgDepartmentModel {
	constructor(){
		super(...arguments);
		console.log('femodel');
	}
}	