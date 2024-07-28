const { Rule } = require('@/validator')

const tokenRules = {
	account: new Rule().isString().required(),
	password: new Rule().isString().required()
}

const getCaptchaRules = {
	account: new Rule()
		.isString()
		.required()
		.min(6)
		.max(12)
		.pattern(/^[a-zA-Z0-9]+$/), // 字母和数字
	email: new Rule()
		.isString()
		.required([''])
		.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

module.exports = {
	tokenRules,
	getCaptchaRules
}
