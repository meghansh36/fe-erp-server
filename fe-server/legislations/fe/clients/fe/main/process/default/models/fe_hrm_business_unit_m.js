/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgBusinessUnitModel = require('@L2Process/default/models/fe_hrm_business_unit_m.js');
module.exports =  class BusinessUnitModel extends LgBusinessUnitModel {
	constructor(){
		super(...arguments);
	}
}	