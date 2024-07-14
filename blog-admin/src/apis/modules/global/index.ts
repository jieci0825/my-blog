import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { LoginParams, LoginParamsResp } from './type.ts'

/**
 * 登录
 */
export function reqLogin(data: LoginParams) {
	return request.post<IBaseType<LoginParamsResp>>({
		url: '/token',
		data
	})
}
