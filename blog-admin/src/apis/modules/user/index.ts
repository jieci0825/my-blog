import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { GetUserListParams, UserItem, ModifyUserPasswordParams } from './type'
import type { MenuItem } from '@/apis/modules/menu/type'

/**
 * 创建用户
 */
export function reqCreateUser(data: UserItem) {
	return request.post<IBaseType<string>>({ url: '/user', data })
}

/**
 * 获取用户信息
 */
export function reqUserInfo() {
	return request.get<IBaseType<UserItem>>({ url: '/user' })
}

/**
 * 获取登录用户的菜单列表
 */
export function reqGetLoginUserMenuList() {
	return request.get<IBaseType<MenuItem[]>>({ url: '/user/menus' })
}

/**
 * 获取用户列表
 */
export function reqGetUserList(params: GetUserListParams) {
	return request.get<IBaseListType<UserItem>>({ url: '/user/list', params })
}

/**
 * 编辑用户信息
 */
export function reqEditUserInfo(data: UserItem) {
	return request.put<IBaseType<string>>({ url: '/user', data })
}

/**
 * 注销用户
 */
export function reqLogoffUser(id: string | number) {
	return request.delete<IBaseType<string>>({ url: `/user/${id}` })
}

/**
 * 分配角色
 */
export function reqAssignRole(data: { userId: string | number; roleId: string }) {
	return request.post<IBaseType<string>>({ url: '/user/assign-role', data })
}

/**
 * 修改用户密码
 */
export function reqModifyUserPassword(data: ModifyUserPasswordParams) {
	return request.put<IBaseType<string>>({ url: '/user/modify-password', data })
}
