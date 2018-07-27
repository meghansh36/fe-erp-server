/* jshint indent: 1 */
const Sequelize = require('sequelize');

module.exports = class FeSystemDebuggerLogModel extends Sequelize.Model{
	
	static init(sequelize, DataTypes) {
		return super.init(
		  {
		 attribute1: {
			type: Sequelize.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		attribute2: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute3: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute4: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute5: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute6: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute7: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute8: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		attribute9: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		attribute10: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		attribute11: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		attribute12: {
			type: Sequelize.STRING(129),
			allowNull: true
		},
		attribute13: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute14: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute15: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute16: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute17: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute18: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute19: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute20: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		attribute21: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute22: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute23: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute24: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute25: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute26: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute27: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute28: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute29: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute30: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		who_created: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		when_created: {
			type: Sequelize.DATE,
			allowNull: true
		},
		who_updated: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		when_updated: {
			type: Sequelize.DATE,
			allowNull: true
		}
	} 
	, {
		tableName: 'fe_sys_debugger_log_t',
		sequelize
	});
}
};
