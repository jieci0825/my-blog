import dayjs from 'dayjs'

export function formatTime(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}

// 检测是否为空
export function isEmpty(value: any): boolean {
	return value === null || value === undefined || value === ''
}
