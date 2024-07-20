import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { BLOG_ADMIN_TOKEN } from '@/constants'

export const piniaGlobalStore = defineStore('global', () => {
	// token
	const token = ref<string | undefined>(getLocalCache(BLOG_ADMIN_TOKEN))
	const setToken = (value: string) => {
		setLocalCache(BLOG_ADMIN_TOKEN, value)
		token.value = value
	}
	const clearToken = () => {
		removeLocalCache(BLOG_ADMIN_TOKEN)
		token.value = undefined
	}

	// collapse
	const isCollapse = ref(false)
	const toggleCollapse = (value: boolean) => {
		isCollapse.value = value
	}

	return {
		token,
		setToken,
		clearToken,
		isCollapse,
		toggleCollapse
	}
})
