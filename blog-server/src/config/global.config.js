module.exports = {
	environment: 'development',
	database: {
		dbName: 'your_database_name',
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'your_password'
	},
	TokenConfig: {
		key: 'your_secret_key',
		expiresIn: '1d'
	},
	adminName: 'your_admin_name',
	adminAccount: 'your_admin_account',
	port: 9527
}
