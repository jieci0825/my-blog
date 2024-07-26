const bcrypt = require('bcryptjs')
const { User } = require('@/app/models/user.model')
const { tokenRules } = require('@/app/rules/back/token.rule')
const { DataSuccess, ParamsError, AuthFailed } = require('@/core/error-type')
const { generateToken, decrypt } = require('@/utils')
const { Validator } = require('@/validator')

/**
 * 颁发令牌
 */
async function token(ctx) {
	const { data } = new Validator().validate(ctx, tokenRules)

	const userInfo = await User.findOne({ where: { account: data.account } })
	if (!userInfo) throw new ParamsError('当前用户不存在')

	const { id, account, password, role_id } = userInfo.dataValues

	const originalPassword = decrypt(data.password)

	// 校验密码
	const correct = bcrypt.compareSync(originalPassword, password)
	if (!correct) {
		throw new AuthFailed('密码错误')
	}

	const tokenData = { id, account, roleId: role_id }

	const { TokenConfig } = global.config
	const token = generateToken(tokenData, TokenConfig.PRIVATE_KEY, TokenConfig.expiresIn)
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
