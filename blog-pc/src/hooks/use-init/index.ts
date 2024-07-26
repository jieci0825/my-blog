import { useGlobalActions } from '@/store'
import { globalApi } from '@/apis'
import { initFontBeautify, initTheme } from './helper'

export const useInit = async () => {
	initFontBeautify()
	initTheme()

	const { setAuthorInfo } = useGlobalActions()

	const authorInfoResp = await globalApi.reqGetAuthorInfo()

	setAuthorInfo(authorInfoResp.data)
}
