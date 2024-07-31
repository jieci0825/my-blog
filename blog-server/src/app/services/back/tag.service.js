const { Tag } = require('@model/tag.model')
const { TagBlog } = require('@model/tag-blog.model')
const { Collide } = require('@/core/error-type')
const { sequelize } = require('@/core/db')

/**
 * 创建标签
 * @param {string[]} tagNames 标签名数组
 */
async function createTags(tagNames) {
	if (!tagNames || !tagNames.length) return
	const insertData = tagNames.map(name => ({ tag_name: name }))
	const tagList = await Tag.findAll({ where: { tag_name: tagNames } })
	if (tagList.length) throw new Collide('标签名称已存在')
	await Tag.bulkCreate(insertData, { ignoreDuplicates: true })
}

/**
 * 获取标签列表
 */
async function getTagList(data) {
	const where = {}
	if (data.tag_name) where.tag_name = data.tagName

	const { rows, count } = await Tag.findAndCountAll({ where, offset: data.page, limit: data.pageSize })
	return { list: rows, total: count }
}

/**
 * 编辑标签
 */
async function editTag(data) {
	const isTagExist = await Tag.findOne({ where: { id: data.id } })
	if (!isTagExist) throw new Collide('标签不存在')

	const isTagNameExist = await Tag.findOne({ where: { tag_name: data.tagName } })
	if (isTagNameExist) throw new Collide('标签名称已存在')

	await Tag.update({ tag_name: data.tagName }, { where: { id: data.id } })
}

/**
 * 删除标签
 */
async function deleteTag(id) {
	if (!id) return
	const isTagExist = await Tag.findOne({ where: { id } })
	if (!isTagExist) throw new Collide('标签不存在')

	const result = await sequelize.transaction(async t => {
		// 删除标签与博客的关联
		await TagBlog.destroy({ where: { tag_id: id }, force: true, transaction: t })
		// 删除标签
		await Tag.destroy({ where: { id }, force: true, transaction: t })
	})

	return result
}

module.exports = {
	createTags,
	getTagList,
	editTag,
	deleteTag
}
