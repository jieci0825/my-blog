import { computed } from 'vue'
import { piniaGlobalStore } from '../global'

export const useGlobalGetters = () => {
	const globalStore = piniaGlobalStore()

	// 获取作者信息
	const getAuthorInfoState = computed(() => {
		return globalStore.authorInfoState
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

	return {
		getAuthorInfoState,
		getRouteAnimation,
		getGrayMode,
		getColorWeakness,
		getFontBeautify,
		getTheme,
		getPrimaryColor
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
		setPrimaryColor
	} = piniaGlobalStore()

	return {
		setAuthorInfo,
		toggleGrayMode,
		toggleColorWeakness,
		setRouteAnimation,
		toggleFontBeautify,
		toggleTheme,
		setPrimaryColor
	}
}
