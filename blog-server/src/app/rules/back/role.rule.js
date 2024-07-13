const { Rule } = require('@/validator')

const createRoleRules = {
	roleName: new Rule()
		.isString()
		.required([''])
		.pattern(/^[A-Za-z]+$/),
	roleDesc: new Rule().isString().required()
}

const editRoleRules = { ...createRoleRules, id: new Rule().isNumber().required().min(1) }

module.exports = { createRoleRules, editRoleRules }
