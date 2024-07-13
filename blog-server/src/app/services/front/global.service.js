const { User } = require('@/app/models/user.model')

/**
 * 获取作者信息
 */
async function getAuthorInfo() {
	const authroInfo = await User.findOne({
		where: { account: global.config.adminAccount },
		attributes: { exclude: ['role_id'] }
	})
	return authroInfo
}

module.exports = {
	getAuthorInfo
}
