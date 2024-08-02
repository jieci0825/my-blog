const { sequelize } = require('@/core/db')
const { Blog } = require('@model/blog.model')
const { BlogTag } = require('@model/blog-tag.model')
const { BlogTagUnite } = require('@model/blog-tag.unite.model')
const { Op } = require('sequelize')
const blogCategoryService = require('./blog-category.service')
const { toCamelCaseForObj, formatDateTime } = require('@/utils')
const { User } = require('@/app/models/user.model')

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
		category_id: data.categoryId || null
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

	// 提取本次查询博客列表的作者id并查询作者昵称
	const authorIds = [...new Set(rows.map(item => item.author_id))]
	const authorList = await User.findAll({ where: { id: authorIds } })
	const authorMap = authorList.map(item => {
		return { id: item.id, authorName: item.nickname }
	})

	// 获取本次查询博客列表素有的标签id并查询标签信息
	const blogIds = rows.map(item => item.id)
	const BlogTagIds = await BlogTagUnite.findAll({ where: { blog_id: blogIds } })
	const tagIds = [...new Set(BlogTagIds.map(item => item.tag_id))]
	const tagList = await BlogTag.findAll({ where: { id: tagIds } })

	const blogList = []

	for (const row of rows) {
		const item = row.dataValues
		// 分类
		const category = blogCategoryList.find(item => item.id === row.category_id)
		item.categoryName = category ? category.categoryName : '未分类'
		// 标签
		const BlogTagIds = await BlogTagUnite.findAll({ where: { blog_id: item.id } })
		const tagIds = BlogTagIds.map(item => item.tag_id)
		item.tags = tagList.filter(item => tagIds.includes(item.id))
		// 作者
		const authorInfo = authorMap.find(item => item.id === row.author_id)
		item.author = authorInfo ? authorInfo.authorName : ''
		// 格式化
		item.date = formatDateTime(item.date)
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
