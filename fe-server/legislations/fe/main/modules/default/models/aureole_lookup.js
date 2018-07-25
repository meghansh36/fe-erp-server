/* jshint indent: 1 */
const Sequelize = require('sequelize');
module.exports =  class AureoleLookup extends Sequelize.Model {
	static init(sequelize, DataTypes) {
	  return super.init(
		  {

			translation_id: {
				type: Sequelize.INTEGER(10),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			client_id: {
				type: Sequelize.INTEGER(10),
				allowNull: true
			},
			legislation_id: {
				type: Sequelize.INTEGER(10),
				allowNull: true
			},
			lookup_type_id: {
				type: Sequelize.INTEGER(10),
				allowNull: true
			},
			translation_type: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			code: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			meaning: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			description: {
				type: Sequelize.STRING(2000),
				allowNull: true
			},
			tip: {
				type: Sequelize.STRING(2000),
				allowNull: true
			},
			parent_translation_id: {
				type: Sequelize.INTEGER(10),
				allowNull: true
			},
			active: {
				type: Sequelize.STRING(10),
				allowNull: true
			},
			dev_status: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			lookup_type: {
				type: Sequelize.STRING(174),
				allowNull: true
			},
			lookup_order: {
				type: Sequelize.INTEGER(10),
				allowNull: true
			},
			attribute1: {
				type: Sequelize.STRING(100),
				allowNull: true
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
				type: Sequelize.STRING(100),
				allowNull: true
			},
			attribute9: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			attribute10: {
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
			},
			attribute11: {
				type: Sequelize.STRING(100),
				allowNull: true
			},
			attribute12: {
				type: Sequelize.STRING(100),
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
				type: Sequelize.INTEGER(11),
				allowNull: true
			},
			origin: {
				type: Sequelize.STRING(10),
				allowNull: true
			},
			customization_level: {
				type: Sequelize.STRING(10),
				allowNull: true
			}
		}, {
			tableName: 'aureole_lookup',
			sequelize
		});
	}
}
