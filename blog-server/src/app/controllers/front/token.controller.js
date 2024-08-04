const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getTokenRules } = require('@/app/rules/front/token.rule')
const { DataSuccess, ParamsError, AuthFailed } = require('@/core/error-type')
const { decrypt, generateToken, generateRefreshToken } = require('@/utils')
const { Validator } = require('@/validator')
const { User } = require('@model/user.model')

/**
 * 获取 token
 */
async function getToken(ctx) {
	const { data } = new Validator().validate(ctx, getTokenRules)

	const where = { status: 1 }
	// 确定账号的类型，邮箱、系统账号
	const isEmail = new RegExp('^[^s@]+@[^s@]+.[^s@]+$').test(data.account)
	if (isEmail) {
		where.email = data.account
	}

	const userInfo = await User.findOne({ where })
	if (!userInfo) throw new ParamsError('当前账号不存在')

	const { id, account, password, role_id } = userInfo.dataValues

	const originalPassword = decrypt(data.password)

	// 校验密码
	const correct = bcrypt.compareSync(originalPassword, password)
	if (!correct) {
		throw new AuthFailed('密码错误')
	}

	const tokenData = { id, account, roleId: role_id }
	const { TokenConfig } = global.config
	const accessToken = generateToken(tokenData, TokenConfig.PRIVATE_KEY, TokenConfig.EXPIRESIN)
	const refreshToken = generateRefreshToken(tokenData, TokenConfig.REFRESH_KEY, TokenConfig.REFRESH_EXPIRESIN)
	throw new DataSuccess({ accessToken, refreshToken })
}

/**
 * 刷新 token
 */
async function refresh(ctx) {
	const rt = ctx.request.headers['refresh-authorization']
	if (!rt) {
		throw new ParamsError('refresh-authorization 参数错误')
	}
	const token = rt.replace('Bearer ', '')

	// 开始解析token
	try {
		const { TokenConfig } = global.config
		const decode = jwt.verify(token, TokenConfig.REFRESH_KEY)
		delete decode.iat
		delete decode.exp
		// 解析成功则重新下发刷新令牌和刷新令牌
		const accessToken = generateToken(decode, TokenConfig.PRIVATE_KEY, TokenConfig.EXPIRESIN)
		const refreshToken = generateRefreshToken(decode, TokenConfig.REFRESH_KEY, TokenConfig.REFRESH_EXPIRESIN)

		throw new DataSuccess({
			accessToken: 'Bearer ' + accessToken,
			refreshToken: 'Bearer ' + refreshToken
		})
	} catch (error) {
		// token 过期 TokenExpiredError
		// token 无效 JsonWebTokenError
		if (error.name === 'TokenExpiredError') {
			throw new AuthFailed('登录凭证已过期，请重新登录')
		} else if (error.name === 'JsonWebTokenError') {
			throw new AuthFailed('登录凭证无效，请重新登录')
		} else {
			throw error
		}
	}
}

module.exports = {
	getToken,
	refresh
}
