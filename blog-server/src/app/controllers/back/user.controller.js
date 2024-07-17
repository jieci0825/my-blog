const { Validator } = require('@/validator')
const { Success, DataSuccess } = require('@/core/error-type')
const userService = require('@ser-back/user.service')
const { createUserRules, getUserListRules, assignRoleRules, editUserRules } = require('@/app/rules/back/user.rule')

/**
 * 创建用户
 */
async function createUser(ctx) {
	const { data } = new Validator().validate(ctx, createUserRules)
	await userService.createUser(data)
	throw new Success('创建用户成功')
}

/**
 * 获取登录用户的信息
 */
async function getLoginUserInfo(ctx) {
	const { id } = ctx.decode
	const result = await userService.getUserInfo(id)
	throw new DataSuccess(result)
}

/**
 * 获取用户列表
 */
async function getUserList(ctx) {
	const { data } = new Validator().validate(ctx, getUserListRules)
	const result = await userService.getUserList(data)
	throw new DataSuccess(result)
}

/**
 * 分配角色
 */
async function assignRole(ctx) {
	const { data } = new Validator().validate(ctx, assignRoleRules)
	await userService.assignRole(data)
	throw new Success('分配角色成功')
}

/**
 * 获取登录用户的菜单列表
 */
async function getLoginUserMenuList(ctx) {
	const { id } = ctx.decode
	const result = await userService.getLoginUserMenuList(id)
	throw new DataSuccess(result)
}

/**
 *
 */
async function editUser(ctx) {
	const { data } = new Validator().validate(ctx, editUserRules)
	await userService.editUser(data)
	throw new Success('编辑用户成功')
}

module.exports = {
	createUser,
	getLoginUserInfo,
	getUserList,
	assignRole,
	getLoginUserMenuList,
	editUser
}
