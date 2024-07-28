const jwt = require('jsonwebtoken')
const { AuthFailed, Forbidden } = require('@/core/error-type')
const { Role } = require('@/app/models/role.model')
const { Captcha } = require('@model/captcha.model')
const { Validator } = require('@/validator')

/**
 * 校验 token
 */
const verifyToken = async (ctx, next) => {
	const authorization = ctx.request.headers.authorization || ctx.request.headers.Authorization
	if (!authorization) {
		throw new Forbidden('请携带 Token')
	}
	const token = authorization.replace('Bearer ', '')
	const { TokenConfig } = global.config
	try {
		const decode = jwt.verify(token, TokenConfig.PUBLIC_KEY, { algorithms: ['RS256'] })
		ctx.decode = decode
		await next()
	} catch (error) {
		if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
			throw new AuthFailed('无效的 Token', 9999)
		} else {
			throw error
		}
	}
}

// * 后期可增加其他扩展，进一步校验选线
/**
 * 检测是否超级管理员
 */
const verifySuperAdmin = async (ctx, next) => {
	const { roleId } = ctx.decode
	const roleInfo = await Role.findByPk(roleId)
	if (!roleInfo) {
		throw new Forbidden('权限不足')
	}
	if (roleInfo.role_name !== global.config.adminName) {
		throw new Forbidden('仅超级管理员可处理')
	}
	await next()
}

/**
 * 检验验证码
 */
const verifyCaptcha = async (ctx, next) => {
	const { data } = new Validator().validate(ctx)
	const { captcha, account } = data
	const codeInfo = await Captcha.findOne({ where: { account, captcha } })
	if (!codeInfo) {
		throw new AuthFailed('验证码错误或者不存在')
	}
	const endTime = new Date(codeInfo.date).getTime() + codeInfo.expires_in
	const curTime = new Date().getTime()
	if (!codeInfo.is_valid || endTime - curTime <= 0) {
		throw new AuthFailed('无效的验证码')
	}
	await next()
}

module.exports = { verifyToken, verifySuperAdmin, verifyCaptcha }
