/* jshint indent: 1 */
const Sequelize = require('sequelize');

module.exports =  class FeEmpInfoModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init( 
      {	
		attribute1: {
			type: Sequelize.INTEGER(10),
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
			type: Sequelize.STRING(20),
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
		attribute11: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute12: {
			type: Sequelize.STRING(20),
			allowNull: true
		},
		attribute13: {
			type: Sequelize.STRING(20),
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
			type: Sequelize.INTEGER(10),
			allowNull: true
		},
		attribute17: {
			type: Sequelize.STRING(1000),
			allowNull: true
		},
		attribute18: {
			type: Sequelize.STRING(1000),
			allowNull: true
		},
		attribute19: {
			type: Sequelize.STRING(1000),
			allowNull: true
		},
		attribute20: {
			type: Sequelize.STRING(1000),
			allowNull: true
		},
		attribute21: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute22: {
			type: Sequelize.STRING(20),
			allowNull: true
		},
		attribute23: {
			type: Sequelize.STRING(20),
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
			type: Sequelize.STRING(20),
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
			type: Sequelize.STRING(20),
			allowNull: true
		},
		attribute30: {
			type: Sequelize.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		attribute31: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute32: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute33: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute34: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute35: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute36: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute37: {
			type: Sequelize.STRING(3000),
			allowNull: true
		},
		attribute38: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute39: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute40: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute41: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute42: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute43: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute44: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute45: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		attribute46: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		attribute47: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		attribute48: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		attribute49: {
			type: Sequelize.INTEGER(11),
			allowNull: true
		},
		attribute50: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute1: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute2: {
			type: Sequelize.INTEGER(10),
			allowNull: true
		},
		c_attribute3: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute4: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute5: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute6: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute7: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute8: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute9: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute10: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute11: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute12: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute13: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute14: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute15: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute16: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute17: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute18: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute19: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute20: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute21: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute22: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute23: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute24: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute25: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute26: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute27: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute28: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute29: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute30: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute31: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute32: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute33: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute34: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute35: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute36: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute37: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute38: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute39: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute40: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute41: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute42: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute43: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute44: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute45: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute46: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute47: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute48: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute49: {
			type: Sequelize.STRING(100),
			allowNull: true
		},
		c_attribute50: {
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
      },
	  { 
		  tableName:'fe_hrt_emp_info_t',
		  sequelize
		}
    );
  }

  static associate(models) {
	this.hasMany(models.EmpJobModel, {
		foreignKey: 'attribute2',
		sourceKey: 'attribute1' 
	})
  }
}	