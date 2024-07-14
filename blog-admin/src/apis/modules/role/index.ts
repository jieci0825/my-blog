import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { RoleItem } from './type'

/**
 * 获取角色列表
 */
export const reqGetRoleList = async () => {
	return request.get<IBaseType<RoleItem[]>>({ url: '/role' })
}
