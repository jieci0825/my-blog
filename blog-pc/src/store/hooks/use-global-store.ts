import { computed } from 'vue'
import { piniaGlobalStore } from '../modules/global'
import { globalApi } from '@/apis'
import type { LoginParams } from '@/apis/modules/global/type'

export const useGlobalGetters = () => {
	const globalStore = piniaGlobalStore()

	// 获取作者信息
	const getAuthorInfo = computed(() => {
		return globalStore.authorInfo
	})

	// route-animation
	const getRouteAnimation = computed(() => globalStore.routeAnimation)
	// 灰色模式
	const getGrayMode = computed(() => globalStore.grayMode)
	// 色弱模式
	const getColorWeakness = computed(() => globalStore.colorWeakness)
	// 字体美化
	const getFontBeautify = computed(() => globalStore.fontBeautify)
	// 主题切换
	const getTheme = computed(() => globalStore.theme)
	// 获取主色
	const getPrimaryColor = computed(() => globalStore.primaryColor)

	// 获取站点首页信息
	const getSiteHomeInfo = computed(() => globalStore.siteHomeInfo)

	return {
		getAuthorInfo,
		getRouteAnimation,
		getGrayMode,
		getColorWeakness,
		getFontBeautify,
		getTheme,
		getPrimaryColor,
		getSiteHomeInfo
	}
}

export const useGlobalActions = () => {
	const {
		setAuthorInfo,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		toggleFontBeautify,
		toggleTheme,
		setPrimaryColor,
		setSiteHomeInfo
	} = piniaGlobalStore()

	// 登录
	const login = async (data: LoginParams) => {
		const resp = await globalApi.reqLogin(data)
		console.log(resp)
	}

	// 获取站点首页信息
	const reqGetSiteHomeInfo = async () => {
		const resp = await globalApi.reqGetSiteHomeInfo()
		setSiteHomeInfo(resp.data)
	}

	return {
		setAuthorInfo,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		toggleFontBeautify,
		toggleTheme,
		setPrimaryColor,
		login,
		reqGetSiteHomeInfo
	}
}
