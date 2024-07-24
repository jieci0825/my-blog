import { defineStore } from 'pinia'
import { reactive, ref, toRefs, watch } from 'vue'
import { getLocalCache, removeLocalCache, setLocalCache } from '@/utils'
import { BLOG_ADMIN_GLOBAL_CONFIG, BLOG_ADMIN_TOKEN, LAYOUT_MODE } from '@/constants'
import type { GlobalConfig, LayoutModeType } from './type'

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

	// refresh
	const refresh = ref(true)
	const handleRefresh = () => (refresh.value = !refresh.value)

	// 全局配置
	const defaultGlobalConfig: GlobalConfig = {
		isCollapse: false,
		isAccordion: false,
		routeAnimation: 'fade',
		asideWidth: 240,
		grayMode: false,
		colorWeakness: false,
		layoutMode: LAYOUT_MODE.VERTICAL
	}
	const globalConfig = reactive<GlobalConfig>(
		Object.assign(defaultGlobalConfig, getLocalCache(BLOG_ADMIN_GLOBAL_CONFIG) || {})
	)
	const toggleCollapse = (value?: boolean) => setSwitchGlobalConfig('isCollapse', value)
	const toggleAccordion = (value?: boolean) => setSwitchGlobalConfig('isAccordion', value)
	const toggleGrayMode = (value?: boolean) => {
		setSwitchGlobalConfig('grayMode', value)
		document.body.classList.toggle('gray-mode', value)
	}
	const toggleColorWeakness = (value?: boolean) => {
		setSwitchGlobalConfig('colorWeakness', value)
		document.body.classList.toggle('color-weakness', value)
	}
	const setRouteAnimation = (value: string) => (globalConfig.routeAnimation = value)
	const setMenuWidth = (value: number) => (globalConfig.asideWidth = value)
	const setLayoutMode = (value: LayoutModeType) => (globalConfig.layoutMode = value)

	watch(
		() => globalConfig,
		() => storageGlobalConfig(),
		{ deep: true, immediate: true }
	)

	// 存储全局配置
	function storageGlobalConfig() {
		setLocalCache(BLOG_ADMIN_GLOBAL_CONFIG, globalConfig)
	}

	// 设置开关的全局配置
	function setSwitchGlobalConfig(field: keyof GlobalConfig, value?: boolean) {
		;(globalConfig[field] as boolean) = value === undefined ? !globalConfig[field] : value
	}

	return {
		...toRefs(globalConfig),
		token,
		refresh,
		setToken,
		clearToken,
		setMenuWidth,
		handleRefresh,
		toggleGrayMode,
		toggleCollapse,
		toggleAccordion,
		toggleColorWeakness,
		setRouteAnimation,
		setLayoutMode
	}
})
