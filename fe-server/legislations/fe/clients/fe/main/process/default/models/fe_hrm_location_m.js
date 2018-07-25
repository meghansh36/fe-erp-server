/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgLocationModel = require('@L1Root/legislations/fe/main/modules/default/models/fe_hrm_location_m.js')
module.exports =  class LocationModel extends LgLocationModel {
	constructor(){
		super(...arguments);
		console.log('femodel');
	}
}	