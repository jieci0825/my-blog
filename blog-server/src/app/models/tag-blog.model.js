const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class TagBlog extends Model {}

TagBlog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		tag_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '标签名称'
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '博客id'
		}
	},
	{ sequelize, tableName: 'tag_blogs' }
)

module.exports = { TagBlog }
