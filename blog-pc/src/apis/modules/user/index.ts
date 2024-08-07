import request from '@/apis/request'
import type { UserItem } from './type.ts'
import type { IBaseType } from '../types'

/**
 * 获取登录用户的信息
 */
export function reqGetLoginUserInfo() {
	return request.get<IBaseType<UserItem>>({ url: '/user' })
}
