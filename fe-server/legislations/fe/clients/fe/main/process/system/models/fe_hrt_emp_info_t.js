/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgEmpInfoModel = require('@L1Root/legislations/fe/main/process/default/models/fe_hrt_emp_info_t.js');
module.exports =  class EmpInfoModel extends LgEmpInfoModel {
	constructor(){
		super(...arguments);
		console.log('femodel');
	}
}	