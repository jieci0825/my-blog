import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthorInfo } from './type'

export const piniaGlobalStore = defineStore('global', () => {
	const authorInfoState = ref<AuthorInfo | null>(null)

	// 设置作者信息
	const setAuthorInfo = (info: AuthorInfo) => {
		authorInfoState.value = info
	}

	return {
		authorInfoState,
		setAuthorInfo
	}
})
