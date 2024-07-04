import { computed } from 'vue'
import { piniaGlobalStore } from '../global'

export const useGlobalGetters = () => {
	const global = piniaGlobalStore()

	// 获取作者信息
	const getAuthorInfoState = computed(() => {
		return global.authorInfoState
	})

	return {
		getAuthorInfoState
	}
}

export const useGlobalActions = () => {
	const { setAuthorInfo } = piniaGlobalStore()

	return {
		setAuthorInfo
	}
}
