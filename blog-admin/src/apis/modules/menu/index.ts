import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { MenuItem, ReqGetMenuListParams } from './type'

/**
 * 获取全部的菜单列表
 */
export const reqGetAllMenuList = (params: ReqGetMenuListParams) => {
	return request.get<IBaseType<MenuItem[]>>({ url: '/menu', params })
}

/**
 * 创建菜单
 */
export const reqCreateMenu = (data: MenuItem) => {
	return request.post<IBaseType<string>>({ url: '/menu', data })
}

/**
 * 编辑菜单
 */
export const reqEditMenu = (data: MenuItem) => {
	return request.put<IBaseType<string>>({ url: '/menu', data })
}

/**
 * 删除菜单
 */
export const reqDeleteMenu = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `/menu/${id}` })
}
