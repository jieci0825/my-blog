const { DataSuccess } = require('@/core/error-type')
const globalService = require('@ser-front/global.service')

/**
 * 获取作者信息
 */
async function getAuthorInfo(ctx) {
	const result = await globalService.getAuthorInfo()
	throw new DataSuccess(result)
}

module.exports = {
	getAuthorInfo
}
