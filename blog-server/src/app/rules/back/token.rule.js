const { Rule } = require('@/validator')

const tokenRules = {
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
		.pattern(/^[a-zA-Z0-9]+$/) // 字母和数字
}

module.exports = {
	tokenRules
}
