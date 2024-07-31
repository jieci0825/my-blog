const { editTagRules } = require('@/app/rules/back/tag.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const tagService = require('@ser-back/tag.service')

/**
 * 创建标签
 */
async function createTags(ctx) {
	const { tagNames } = ctx.request.body
	await tagService.createTags(tagNames)
	throw new Success('创建标签成功')
}

/**
 * 获取标签列表
 */
async function getTagList(ctx) {
	const { data } = new Validator().validate(ctx)
	const result = await tagService.getTagList(data)
	throw new DataSuccess(result, '获取标签列表成功')
}

/**
 * 编辑标签
 */
async function editTag(ctx) {
	const { data } = new Validator().validate(ctx, editTagRules)
	await tagService.editTag(data)
	throw new Success('编辑标签成功')
}

/**
 * 删除标签
 */
async function deleteTag(ctx) {
	const { data } = new Validator().validate(ctx)
	await tagService.deleteTag(data.id)
	throw new Success('删除标签成功')
}

module.exports = {
	createTags,
	getTagList,
	editTag,
	deleteTag
}
