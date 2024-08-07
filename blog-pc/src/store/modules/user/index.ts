import { defineStore } from 'pinia'
import type { UserItem } from '@/apis/modules/user/type'
import { ref } from 'vue'

export const piniaUserStore = defineStore('user', () => {
	// 用户信息
	const userInfo = ref<UserItem | null>(null)
	// 设置用户信息
	const setUserInfo = (data: UserItem | null) => {
		userInfo.value = data
	}

	return {
		userInfo,
		setUserInfo
	}
})
