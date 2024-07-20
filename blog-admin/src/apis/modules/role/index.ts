import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { ReqAssignPermission, ReqCreateRole, RoleItem } from './type'
import type { MenuItem } from '@/apis/modules/menu/type'

/**
 * 创建角色
 */
export const reqCreateRole = async (data: ReqCreateRole) => {
	return request.post<IBaseType<string>>({ url: '/role', data })
}

/**
 * 获取角色列表
 */
export const reqGetRoleList = async () => {
	return request.get<IBaseType<RoleItem[]>>({ url: '/role' })
}

/**
 * 删除角色
 */
export const reqDeleteRole = async (id: number) => {
	return request.delete<IBaseType<string>>({ url: `/role/${id}` })
}

/**
 * 编辑角色信息
 */
export const reqEditRole = async (data: RoleItem) => {
	return request.put<IBaseType<string>>({ url: `/role`, data })
}

/**
 * 根据角色id获取菜单列表
 */
export const reqGetMenuListByRoleId = async (id: number) => {
	return request.get<IBaseType<MenuItem[]>>({ url: `/role/menu/${id}` })
}

/**
 * 给角色分配权限
 */
export const reqAssignPermission = async (data: ReqAssignPermission) => {
	return request.post<IBaseType<string>>({ url: '/role/assign-permission', data })
}
