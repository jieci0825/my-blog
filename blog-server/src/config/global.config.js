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
		PUBLIC_KEY: PUBLIC_KEY.toString(),
		REFRESH_KEY: 'mm2qIh8X6MPxR2mMl4U4S.fUQNos65Y1LLL0tLRCtiRx6JhvAtdFm',
		REFRESH_EXPIRESIN: '30d',
		EXPIRESIN: '1d'
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
	captchaExpiresIn: 1000 * 60 * 5, // 验证码有效时长
	defaultAvatars: [
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-1.jpeg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-2.jpg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-3.jpeg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-4.jpeg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-5.jpg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-6.jpeg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-7.jpg',
		'http://cos.coderjc.cn/my-resource/default-avatar/avatar-8.jpeg'
	]
}
