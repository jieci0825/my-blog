const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { getDatesBetween } = require('.')

// 日志文件目录
const logDir = path.resolve(__dirname, '../logs')

// 读取日志文件
function readLogFile(fileName, deviceCount, offset, limit) {
	return new Promise((resolve, reject) => {
		const filePath = path.resolve(logDir, fileName)
		const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' })
		const rl = readline.createInterface({ input: readStream })

		const logs = []

		rl.on('line', lineData => {
			if (!lineData) return
			deviceCount.total++

			const logInfo = JSON.parse(lineData)
			const userAgent = logInfo.http_user_agent

			if (userAgent) {
				if (isDeviceType(userAgent, 'Windows')) {
					deviceCount.windowCount++
				} else if (isDeviceType(userAgent, 'iPhone')) {
					deviceCount.iPhoneCount++
				} else if (isDeviceType(userAgent, 'Android')) {
					deviceCount.androidCount++
				} else if (isDeviceType(userAgent, 'Mac OS')) {
					deviceCount.macOSCount++
				}
			}

			if (logs.length < limit && deviceCount.total > offset) {
				logs.push(logInfo)
			}
		})

		rl.on('close', () => {
			resolve(logs)
		})
	})
}

function isDeviceType(userAgent, deviceType) {
	return userAgent.indexOf(deviceType) !== -1
}

async function getAccessLog(date, { order = 'DESC', page = 1, pageSize = 10 }) {
	if (!date) throw new Error('日期不能为空')

	// 访问设备统计
	const deviceCount = { total: 0, windowCount: 0, androidCount: 0, iPhoneCount: 0, macOSCount: 0 }
	const offset = (page - 1) * pageSize
	const logFileName = `${date}.access.log`

	// 检测日志文件是否存在
	if (!fs.existsSync(path.resolve(logDir, logFileName))) {
		return {
			logList: [],
			deviceCount
		}
	}

	// 日志列表
	const logList = await readLogFile(logFileName, deviceCount, offset, pageSize)

	return {
		logList,
		deviceCount
	}
}

module.exports = {
	getAccessLog
}
