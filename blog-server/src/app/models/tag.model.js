const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class Tag extends Model {}

Tag.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		tag_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '标签名称'
		}
	},
	{ sequelize, tableName: 'tags' }
)

module.exports = { Tag }
