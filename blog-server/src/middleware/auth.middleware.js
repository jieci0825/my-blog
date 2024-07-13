const jwt = require('jsonwebtoken')
const { AuthFailed, Forbidden } = require('@/core/error-type')
const { Role } = require('@/app/models/role.model')

const verifyToken = async (ctx, next) => {
	const authorization = ctx.request.headers.authorization || ctx.request.headers.Authorization
	if (!authorization) {
		throw new Forbidden('请携带 Token')
	}
	const token = authorization.replace('Bearer ', '')
	const { TokenConfig } = global.config
	try {
		const decode = jwt.verify(token, TokenConfig.key)
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

// todo：后期可扩展为转为给用户绑定按钮权限来判定
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

module.exports = { verifyToken, verifySuperAdmin }
