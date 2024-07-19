const { File } = require('@/app/models/file.model')

/**
 * 创建文件记录
 */
async function createFileRecord(data) {
	const insertData = {
		filename: data.filename,
		size: data.size,
		key: data.key,
		location: data.location,
		mimetype: data.mimetype
	}

	await File.create(insertData)
}

module.exports = {
	createFileRecord
}
