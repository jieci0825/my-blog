import dayjs from 'dayjs'

export function formatTime(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(date).format(format)
}
