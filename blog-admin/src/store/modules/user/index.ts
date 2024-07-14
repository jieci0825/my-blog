import { ref } from 'vue'
import type { UserInfo } from './type'
import { defineStore } from 'pinia'
import { MenuItem } from '@/apis/modules/menu/type'
import { getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { BLOG_ADMIN_CURRENT_MENU_LIST } from '@/constants'

export const piniaUserStore = defineStore('user', () => {
	// 当前登录的用户信息
	const userInfo = ref<UserInfo | null>(null)
	// 设置用户信息
	const setUserInfo = (data: UserInfo) => {
		userInfo.value = data
	}
	// 清除用户信息
	const clearUserInfo = () => {
		userInfo.value = null
	}

	// 当前登录用户的菜单列表
	const userMenuList = ref<MenuItem[]>(getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST) || [])
	// 设置用户菜单列表
	const setUserMenuList = (data: MenuItem[]) => {
		userMenuList.value = data
		setLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST, data)
	}
	// 清除用户菜单列表
	const clearUserMenuList = () => {
		userMenuList.value = []
		removeLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)
	}

	return {
		userInfo,
		setUserInfo,
		clearUserInfo,
		userMenuList,
		setUserMenuList,
		clearUserMenuList
	}
})
