const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')
const { md5password } = require('@/utils')

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '用户id'
		},
		account: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			comment: '账号'
		},
		nickname: {
			type: DataTypes.STRING,
			comment: '昵称'
		},
		password: {
			type: DataTypes.STRING,
			set(val) {
				this.setDataValue('password', md5password(val))
			},
			allowNull: false,
			comment: '密码'
		},
		avatar_url: {
			type: DataTypes.STRING,
			comment: '头像地址'
		},
		sign: {
			type: DataTypes.STRING,
			comment: '个性签名'
		},
		description: {
			type: DataTypes.STRING,
			comment: '个人简介'
		},
		role_id: {
			type: DataTypes.INTEGER,
			comment: '角色id'
		}
	},
	{ sequelize, tableName: 'users' }
)

module.exports = { User }
