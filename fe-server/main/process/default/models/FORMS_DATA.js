/* jshint indent: 1 */
const Sequelize = require('sequelize');
module.exports =  class FeFormsData extends Sequelize.Model {
	static init(sequelize, DataTypes) {
	  return super.init( {
		ID: {  //id
			type: Sequelize.INTEGER(10),
            allowNull: false,
            autoIncrement:true,
			primaryKey: true
		},
		FORM_CODE: {  //formCode
            type: Sequelize.INTEGER(7),
			allowNull: true
		},
		LABEL: { //label
			type: Sequelize.STRING(20),
			allowNull: true
		},
		JSON: {  //json
			type: Sequelize.TEXT,
			allowNull: true
		},
		attribute1: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		attribute2: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		attribute3: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		attribute4: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		attribute5: {
			type: Sequelize.STRING(255),
			allowNull: true
		}
	}, {
        tableName: 'FORMS_DATA',
        sequelize
	});
}
};
