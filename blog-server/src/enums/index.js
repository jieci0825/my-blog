const { createEnums } = require('@/utils')

// 登录类型
const LoginType = createEnums({
	USER_ACCOUNT: 1, // 账户
	USER_MOBILE: 2, // 手机
	USER_EMAIL: 3 // 邮箱
})

// 验证码类型
const CaptchaType = createEnums({
	EMAIL: 100 // 邮箱
})

// 账号主体类型
const ACCOUNT_TYPE = createEnums({
	EMAIL: 'email', // 邮箱
	SYSTEM_ACCOUNT: 'system_account' // 系统账号
})

module.exports = {
	LoginType,
	CaptchaType,
	ACCOUNT_TYPE
}
