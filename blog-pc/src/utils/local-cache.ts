export function getLocalCache(key: string) {
	let result = undefined

	try {
		result = JSON.parse(localStorage.getItem(key)!)
	} catch (e) {
		result = localStorage.getItem(key)
	}

	return result
}

export function setLocalCache(key: string, value: string) {
	if (value === '') return

	if (typeof value === 'string') {
		localStorage.setItem(key, value)
	} else {
		localStorage.setItem(key, JSON.stringify(value))
	}
	localStorage.setItem(key, value)
}

export function removeLocalCache(key: string) {
	localStorage.removeItem(key)
}
