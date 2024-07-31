const { Rule } = require('@/validator')

const createBlogRules = {
	date: new Rule().isString().required(),
	title: new Rule().isString().required(),
	description: new Rule().isString().min(1).max(200).required(),
	htmlContent: new Rule().isString().required(),
	status: new Rule().enum([0, 1]).required(),
	categoryId: new Rule().isNumber().min(1).required()
}

module.exports = {
	createBlogRules
}
