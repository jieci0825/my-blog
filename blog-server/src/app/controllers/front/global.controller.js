const { DataSuccess } = require('@/core/error-type')
const { getDaysDiff } = require('@/utils')
const globalService = require('@ser-front/global.service')
const cosTools = require('@/utils/cos-tools')
const { Validator } = require('@/validator')
const backFileService = require('@ser-back/file.service')

/**
 * 获取作者信息
 */
async function getAuthorInfo(ctx) {
	const result = await globalService.getAuthorInfo()
	throw new DataSuccess(result)
}

/**
 * 获取站点首页信息
 */
async function getSiteHomeInfo(ctx) {
	const data = { ...global.config.siteHomeInfo }
	data.runDays = getDaysDiff(data.publish, new Date())
	throw new DataSuccess(data)
}

/**
 * 获取临时凭证
 */
async function getCredential(ctx) {
	// 获取策略
	const policy = cosTools.packagePolicy('UPLOAD')

	// 获取临时凭证参数
	const params = {
		Name: 'coderjc', // 自定义调用方英文名称
		Policy: policy,
		DurationSeconds: 60
	}

	// 获取临时凭证
	const credential = await cosTools.getCredential(params)

	throw new DataSuccess(credential)
}

/**
 * 创建文件记录
 */
async function createFileRecord(ctx) {
	const { data } = new Validator().validate(ctx)
	// 创建文件记录
	await backFileService.createFileRecord(data)
	throw new DataSuccess('创建文件记录成功')
}

module.exports = {
	getAuthorInfo,
	getSiteHomeInfo,
	getCredential,
	createFileRecord
}
