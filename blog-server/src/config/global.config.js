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
		PRIVATE_KEY,
		PUBLIC_KEY,
		expiresIn: '1d'
	},
	adminName: 'SuperAdmin',
	adminAccount: 'coderjc',
	port: 9527
}
