const { DataSuccess } = require('@/core/error-type')

/**
 * 获取站点首页信息
 */
async function getSiteHomeInfo(ctx) {
	throw new DataSuccess(global.config.siteHomeInfo)
}

module.exports = { getSiteHomeInfo }
