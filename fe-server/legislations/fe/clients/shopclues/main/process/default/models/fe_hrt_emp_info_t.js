/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgEmpInfoModel = require('@L2Process/default/models/fe_hrt_emp_info_t.js')
module.exports =  class EmpInfoModel extends LgEmpInfoModel {
	constructor(){
		super(...arguments);
		console.log('shopcluesmodel');
	}
}	