const fs = require('fs')
const path = require('path')

// 私钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'))
// 公钥
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'))

module.exports = {
	environment: 'development',
	database: {
		dbName: 'blog',
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'qwer0825.'
	},
	TokenConfig: {
		PRIVATE_KEY: PRIVATE_KEY.toString(),
		PUBLIC_KEY: PRIVATE_KEY.toString(),
		expiresIn: '1d'
	},
	siteHomeInfo: {
		title: '劫辞の树洞',
		slogan: '见字如面，愿君不啻微茫，造炬成阳',
		publish: '2023-01-01'
	},
	logPath: '/www/wwwlogs/blog.coderjc.cn',
	aesKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuz6GNWWL12awIfZ3HD8Q',
	adminName: 'SuperAdmin',
	adminAccount: 'coderjc',
	port: 9527,
	captchaExpiresIn: 1000 * 60 * 5 // 验证码有效时长
	// captchaExpiresIn: 1000 * 10 // 测试时间-验证码有效时长
}
