import { ref, watch } from 'vue'
import { EFontChangeType } from './type'
import { getLocalCache, setLocalCache } from '@/utils'

const isFontBeautify = ref(true)

const CHANGE_FONT_STATE = 'CHANGE_FONT_STATE'

watch(
	() => isFontBeautify.value,
	() => {
		const state = isFontBeautify.value ? EFontChangeType.OPEN : EFontChangeType.OFF
		isFontBeautify.value ? open() : off()
		setLocalCache(CHANGE_FONT_STATE, state)
	}
)
function open() {
	document.body.classList.remove('reset-font')
}

function off() {
	document.body.classList.add('reset-font')
}

export function useChangeFont() {
	const current = getLocalCache(CHANGE_FONT_STATE)

	if (!current) {
		// 设置字体初始状态值
		setLocalCache(CHANGE_FONT_STATE, EFontChangeType.OPEN)
	} else {
		current === EFontChangeType.OFF ? (isFontBeautify.value = false) : (isFontBeautify.value = true)
	}

	return { isFontBeautify }
}
