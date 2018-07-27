/* jshint indent: 1 */
//const Sequelize = require('sequelize');
const LgSystemDebuggerLogModel = require('@L1Root/legislations/fe/main/modules/default/models/fe_sys_debugger_log_t.js');
module.exports =  class SystemDebuggerLogModel extends LgSystemDebuggerLogModel {
	constructor(){
		super(...arguments);
		console.log('logmodel');
	}
}	