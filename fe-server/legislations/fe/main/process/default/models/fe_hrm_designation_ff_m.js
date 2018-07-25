/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const FeDesignationModel = require('@L1Modules/default/models/fe_hrm_designation_ff_m.js')
module.exports =  class LgDesignationModel extends FeDesignationModel {
	constructor(){
		super(...arguments);
		console.log('femodel');
	}
}	