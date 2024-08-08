const { DataSuccess, Success } = require('@/core/error-type')
const { Validator } = require('@/validator')
const backUserService = require('@ser-back/user.service')
const userService = require('@ser-front/user.service')

/**
 * 获取登录用户信息
 */
async function getLoginUserInfo(ctx) {
	const { id } = ctx.decode
	const result = await backUserService.getUserInfo(id)
	throw new DataSuccess(result)
}

/**
 * 注册
 */
async function register(ctx) {
	const { data } = new Validator().validate(ctx)
	await userService.register(data)
	throw new Success('注册成功')
}

module.exports = {
	getLoginUserInfo,
	register
}
