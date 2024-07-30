const { DataSuccess } = require('@/core/error-type')
const siteService = require('@ser-back/site.service')

/**
 * 获取站点首页信息
 */
async function getSiteHomeInfo(ctx) {
	throw new DataSuccess(global.config.siteHomeInfo)
}

/**
 * 获取站点访问数据
 */
async function getSiteVisits(ctx) {
	const result = await siteService.getSiteVisits()
	throw new DataSuccess(result)
}

module.exports = { getSiteHomeInfo, getSiteVisits }
