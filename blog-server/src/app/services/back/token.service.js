const schedule = require('node-schedule')
const { VerifyCode } = require('@model/verify-code.model')

/**
 * 创建验证码
 * @param {object} data
 */
async function createVerifyCode(data) {
	const insertData = {
		code: data.code,
		date: new Date(),
		expires_in: global.config.captchaExpiresIn,
		type: data.type,
		is_valid: true,
		account: data.account,
		email: data.email
	}

	const result = await VerifyCode.create(insertData)
	schedule.scheduleJob(new Date(Date.now() + global.config.captchaExpiresIn), function () {
		// 将验证码是否有效设置为无效
		VerifyCode.update({ is_valid: false }, { where: { id: result.id } })
	})
	return result
}

module.exports = { createVerifyCode }
