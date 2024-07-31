const { createBlogRules } = require('@/app/rules/back/blog.rule')
const { DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const blogService = require('@ser-back/blog.service')

/**
 * 创建博客
 */
async function createBlog(ctx) {
	const { data } = new Validator().validate(ctx, createBlogRules)
	await blogService.createBlog(data)
	throw new DataSuccess('创建博客成功')
}

module.exports = {
	createBlog
}
