import { computed } from 'vue'
import { piniaGlobalStore } from '../modules/global'
import { globalApi } from '@/apis'
import { LoginParams } from '@/apis/modules/global/type'

import router from '@/routers'
import { useUserActions } from './use-user-store'
import { getLocalCache, registerDynamicRoutes } from '@/utils'
import { BLOG_ADMIN_CURRENT_MENU_LIST, BLOG_ADMIN_TOKEN } from '@/constants'
import routeDynamic from '@/routers/route-dynamic'

export const useGlobalGetters = () => {
	const globalStore = piniaGlobalStore()

	// 获取 token
	const getToken = computed(() => globalStore.token)

	// collapse
	const getCollapse = computed(() => globalStore.isCollapse)

	return {
		getToken,
		getCollapse
	}
}

export const useGlobalActions = () => {
	const { setToken, clearToken } = piniaGlobalStore()
	const { clearUserInfo, reqGetUserInfo, reqGetUserMenuList, clearUserMenuList } = useUserActions()

	// 登录
	const login = async (data: LoginParams) => {
		const resp = await globalApi.reqLogin(data)
		// 存储 token
		setToken(resp.data.token)

		// 获取用户菜单列表
		await reqGetUserMenuList()
		// 注册路由
		const menus = getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)
		registerDynamicRoutes(routeDynamic, menus)

		// 跳转进入首页
		// todo: 检查是否携带路径参数，携带则跳转携带的参数，没有则是默认的
		router.push('/')
	}

	// 退出登录
	const logout = () => {
		clearToken()
		clearUserInfo()
		clearUserMenuList()
	}

	// 加载本地数据
	const loadLocal = async () => {
		const token = getLocalCache(BLOG_ADMIN_TOKEN)
		if (token) {
			const menus = getLocalCache(BLOG_ADMIN_CURRENT_MENU_LIST)
			menus && registerDynamicRoutes(routeDynamic, menus)
			await reqGetUserInfo()
		}
	}

	return {
		login,
		setToken,
		logout,
		loadLocal
	}
}
