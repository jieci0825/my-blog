import dayjs from 'dayjs'

export function formatTime(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}

// 检测是否为空
export function isEmpty(value: any): boolean {
	return value === null || value === undefined || value === ''
}

// 转换文件大小单位
const units = ['B', 'KB', 'MB', 'GB'] as const
type ByteUnit = (typeof units)[number]
export function convertBytes(bytes: number, toUnit: ByteUnit = 'MB') {
	const index = units.indexOf(toUnit.toUpperCase() as ByteUnit)

	if (index === -1) {
		throw new Error(`无效的单位。请使用以下其中之一: ${units.join(', ')}`)
	}

	let result = bytes
	for (let i = 0; i < index; i++) {
		result /= 1024
	}

	return result.toFixed(2) + ' ' + units[index]
}
