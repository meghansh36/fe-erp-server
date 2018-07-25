/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const FeEmpInfoModel = require('@L1Modules/default/models/fe_hrt_emp_info_t.js')
module.exports =  class LgEmpInfoModel extends FeEmpInfoModel {
	constructor(){
		super(...arguments);
		//console.log('femodel');
	}
}	