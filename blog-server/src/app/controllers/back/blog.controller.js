const { createBlogRules, getBlogListRules } = require('@/app/rules/back/blog.rule')
const { DataSuccess, Success } = require('@/core/error-type')
const { Validator } = require('@/validator')
const blogService = require('@ser-back/blog.service')

/**
 * 创建博客
 */
async function createBlog(ctx) {
	const { data } = new Validator().validate(ctx, createBlogRules)
	data.authorId = ctx.decode.id
	await blogService.createBlog(data)
	throw new Success('创建博客成功')
}

/**
 * 获取博客列表
 */
async function getBlogList(ctx) {
	const { data } = new Validator().validate(ctx, getBlogListRules)
	const result = await blogService.getBlogList(data)
	throw new DataSuccess(result)
}

module.exports = {
	createBlog,
	getBlogList
}
