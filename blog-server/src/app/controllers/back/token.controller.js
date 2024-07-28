const bcrypt = require('bcryptjs')
const tokenService = require('@ser-back/token.service')
const { User } = require('@/app/models/user.model')
const { tokenRules, getVerifyTokenRules } = require('@/app/rules/back/token.rule')
const { DataSuccess, ParamsError, AuthFailed } = require('@/core/error-type')
const { generateToken, decrypt, genNumberCode } = require('@/utils')
const { Validator } = require('@/validator')
const { VerifyCode } = require('@model/verify-code.model')
const { VerifyCodeType } = require('@/enums')
const { sendMail } = require('@/utils/email')

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
 * 获取验证码
 */
async function getVerifyCode(cxt) {
	const { data } = new Validator().validate(cxt, getVerifyTokenRules)
	const code = await genNumberCode(VerifyCode)
	const insertData = {
		code,
		type: VerifyCodeType.EMAIL,
		account: data.account,
		email: data.email
	}
	await tokenService.createVerifyCode(insertData)

	sendMail(data.email, code)

	throw new DataSuccess({ code })
}

/**
 * 验证令牌
 */
async function verify(ctx) {
	throw new DataSuccess(ctx.decode)
}

module.exports = {
	token,
	verify,
	getVerifyCode
}
