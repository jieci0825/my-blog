const { Rule } = require('@/validator')

const createUserRules = {
	account: new Rule()
		.isString()
		.required()
		.min(6)
		.max(12)
		.pattern(/^[a-zA-Z0-9]+$/), // 字母和数字
	password: new Rule()
		.isString()
		.required()
		.min(6)
		.max(16)
		.pattern(/^[a-zA-Z0-9\/\-]+$/),
	nickname: new Rule().isString().required().min(2).max(10),
	avatarUrl: new Rule().isString(),
	sign: new Rule().isString().min(0).max(100),
	description: new Rule().isString().min(0).max(200)
}

const editUserRules = {
	id: new Rule().isNumber().isInteger().required(),
	account: new Rule()
		.isString()
		.required()
		.min(6)
		.max(12)
		.pattern(/^[a-zA-Z0-9]+$/), // 字母和数字
	nickname: new Rule().isString().required().min(2).max(10),
	avatarUrl: new Rule().isString(),
	sign: new Rule().isString().min(0).max(100),
	description: new Rule().isString().min(0).max(200)
}

const getUserListRules = {
	page: new Rule().isNumber().isInteger().required().min(0),
	pageSize: new Rule().isNumber().isInteger().required().min(1).max(30),
	nickname: new Rule().isString().min(0).max(10)
}

const assignRoleRules = {
	roleId: new Rule().isNumber().isInteger().required().min(1),
	userId: new Rule().and('roleId')
}

const modifyUserPasswordRules = {
	oldPassword: new Rule()
		.isString()
		.required()
		.min(6)
		.max(16)
		.pattern(/^[a-zA-Z0-9\/\-]+$/),
	newPassword: new Rule().and('oldPassword')
}

module.exports = {
	createUserRules,
	getUserListRules,
	assignRoleRules,
	editUserRules,
	modifyUserPasswordRules
}
