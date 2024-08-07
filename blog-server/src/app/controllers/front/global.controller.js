const { DataSuccess } = require('@/core/error-type')
const { getDaysDiff } = require('@/utils')
const globalService = require('@ser-front/global.service')

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

module.exports = {
	getAuthorInfo,
	getSiteHomeInfo
}
