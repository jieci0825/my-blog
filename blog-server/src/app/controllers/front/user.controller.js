const { DataSuccess } = require('@/core/error-type')
const backUserService = require('@ser-back/user.service')

/**
 *
 */
async function getLoginUserInfo(ctx) {
	const { id } = ctx.decode
	const result = await backUserService.getUserInfo(id)
	throw new DataSuccess(result)
}

module.exports = {
	getLoginUserInfo
}
