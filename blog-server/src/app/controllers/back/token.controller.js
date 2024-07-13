const { User } = require('@/app/models/user.model')
const { tokenRules } = require('@/app/rules/back/token.rule')
const { DataSuccess, ParamsError } = require('@/core/error-type')
const { generateToken, md5password } = require('@/utils')
const { Validator } = require('@/validator')

/**
 * 颁发令牌
 */
async function token(ctx) {
	const { data } = new Validator().validate(ctx, tokenRules)

	const userInfo = await User.findOne({ where: { account: data.account } })
	if (!userInfo) throw new ParamsError('当前用户不存在')

	const { id, account, password, role_id } = userInfo.dataValues
	const curPassword = md5password(data.password)
	if (curPassword !== password) throw new ParamsError('密码错误')

	const tokenData = { id, account, roleId: role_id }

	const { TokenConfig } = global.config
	const token = generateToken(tokenData, TokenConfig.key, TokenConfig.expiresIn)
	throw new DataSuccess({ token })
}

/**
 * 验证令牌
 */
async function verify(ctx) {
	throw new DataSuccess(ctx.decode)
}

module.exports = {
	token,
	verify
}
