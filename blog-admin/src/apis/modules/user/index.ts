import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { GetUserListParams, UserItem } from './type'
import type { MenuItem } from '@/apis/modules/menu/type'

/**
 * 获取用户信息
 */
export function reqUserInfo() {
	return request.get<IBaseType<UserItem>>({
		url: '/user'
	})
}

/**
 * 获取登录用户的菜单列表
 */
export function reqGetLoginUserMenuList() {
	return request.get<IBaseType<MenuItem[]>>({
		url: '/user/menus'
	})
}

/**
 * 获取用户列表
 */
export function reqGetUserList(params: GetUserListParams) {
	return request.get<IBaseListType<UserItem>>({
		url: '/user/list',
		params
	})
}

/**
 * 编辑用户信息
 */
export function reqEditUserInfo(data: UserItem) {
	return request.put<IBaseType<string>>({ url: '/user', data })
}
