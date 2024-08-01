const { sequelize } = require('@/core/db')
const { Blog } = require('@model/blog.model')
const { BlogTag } = require('@model/blog-tag.model')
const { BlogTagUnite } = require('@model/blog-tag.unite.model')
const { Op } = require('sequelize')
const blogCategoryService = require('./blog-category.service')
const { toCamelCaseForObj } = require('@/utils')

/**
 * 创建博客
 * @params {object} data
 */
async function createBlog(data) {
	const insertData = {
		date: new Date(),
		preview_url: data.previewUrl,
		title: data.title,
		description: data.description,
		html_content: data.htmlContent,
		status: 1,
		author_id: data.authorId,
		category_id: data.categoryId
	}

	const result = await sequelize.transaction(async t => {
		const blog = await Blog.create(insertData, { transaction: t })
		const tagInsertData = data.tagIds.map(tagId => {
			return {
				tag_id: tagId,
				blog_id: blog.id
			}
		})
		await BlogTagUnite.bulkCreate(tagInsertData, { transaction: t })
	})

	return result
}

/**
 * 获取博客列表
 * @params {object} data
 */
async function getBlogList(data) {
	const where = {}
	if (data.title) where.title = { [Op.substring]: data.title }

	// 获取所有的分类
	const allBlogCategory = await blogCategoryService.getBlogCategoryList()
	const blogCategoryList = allBlogCategory.map(item => {
		return { id: item.id, categoryName: item.category_name }
	})
	const { rows, count } = await Blog.findAndCountAll({
		where,
		offset: data.page,
		limit: data.pageSize,
		attributes: { exclude: ['html_content', 'createdAt', 'updatedAt', 'deletedAt'] }
	})

	const blogList = []

	for (const row of rows) {
		const item = row.dataValues
		// 分类
		const category = blogCategoryList.find(item => item.id === row.category_id)
		item.categoryName = category ? category.categoryName : '未分类'
		// 标签
		const BlogTagIds = await BlogTagUnite.findAll({ where: { blog_id: item.id } })
		const tagIds = BlogTagIds.map(item => item.tag_id)
		const tagList = await BlogTag.findAll({ where: { id: tagIds } })
		item.tags = tagList
		// 格式化
		blogList.push(toCamelCaseForObj(item))
	}

	return {
		list: blogList,
		total: count
	}
}

module.exports = {
	createBlog,
	getBlogList
}
