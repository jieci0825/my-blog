import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { UserInfoResp } from './type'
import type { MenuItem } from '@/apis/modules/menu/type'

/**
 * 获取用户信息
 */
export function reqUserInfo() {
	return request.get<IBaseType<UserInfoResp>>({
		url: '/user'
	})
}

/**
 * 获取作者信息
 */
export function reqGetLoginUserMenuList() {
	return request.get<IBaseType<MenuItem[]>>({
		url: '/user/menus'
	})
}
