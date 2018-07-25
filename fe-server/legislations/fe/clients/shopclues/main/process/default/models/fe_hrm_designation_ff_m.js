/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgDesignationModel = require('@L1Root/legislations/fe/main/modules/default/models/fe_hrm_designation_ff_m.js')
module.exports =  class DesignationModel extends LgDesignationModel {
	constructor(){
		super(...arguments);
		console.log('femodel');
	}
}	