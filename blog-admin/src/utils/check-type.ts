export function isObject(value: any): boolean {
	return Object.prototype.toString.call(value) === '[object Object]'
}

export function isArray(value: any): boolean {
	return Array.isArray(value)
}
