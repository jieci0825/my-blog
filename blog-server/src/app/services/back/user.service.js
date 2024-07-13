const { Menu } = require('@/app/models/menu.model')
const { RoleMenu } = require('@/app/models/role-menu.model')
const { User } = require('@/app/models/user.model')
const { Collide } = require('@/core/error-type')
const { toTree, toCamelCaseForObj } = require('@/utils')
const { Op } = require('sequelize')

/**
 * 创建用户
 * @param {object} data
 */
async function createUser(data) {
	const userInfo = await User.findOne({ where: { account: data.account } })
	if (userInfo) {
		throw new Collide('当前账号已经存在')
	}

	const insertData = {
		account: data.account,
		password: data.password,
		nickname: data.nickname,
		avatar_url: data.avatarUrl,
		sign: data.sign,
		description: data.description
	}

	await User.create(insertData)
}

/**
 * 获取用户信息
 * @param {number} id 用户id
 */
async function getUserInfo(id) {
	const userInfo = await User.findOne({ where: { id } })
	return userInfo
}

/**
 * 获取用户列表
 * @param {object} condition
 */
async function getUserList(condition) {
	const where = {}
	if (condition.nickname) {
		where.nickname = { [Op.like]: `%${condition.nickname}%` }
	}

	const { count, rows } = await User.findAndCountAll({ where, offset: condition.page, limit: condition.pageSize })
	return { list: rows, total: count }
}

/**
 * 分配角色
 * @param {object} data
 */
async function assignRole(data) {
	await User.update({ role_id: data.roleId }, { where: { id: data.userId } })
}

/**
 * 获取登录用户的菜单列表
 */
async function getLoginUserMenuList(userId) {
	const userInfo = await User.findByPk(userId)
	const roleMenuList = await RoleMenu.findAll({ where: { role_id: userInfo.role_id } })
	const menuIds = roleMenuList.map(item => item.menu_id)
	const menuList = await Menu.findAll({
		where: { id: { [Op.in]: menuIds } },
		attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
	})
	const treeMenu = toTree(
		menuList.map(item => toCamelCaseForObj(item.dataValues)),
		0,
		{ childEmpty: null, parentField: 'menuPid' }
	)
	return treeMenu
}

module.exports = {
	createUser,
	getUserInfo,
	getUserList,
	assignRole,
	getLoginUserMenuList
}
