import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { MenuItem, ReqGetMenuListParams } from './type'

/**
 * 获取全部的菜单列表
 */
export const reqGetAllMenuList = (params: ReqGetMenuListParams) => {
	return request.get<IBaseType<MenuItem[]>>({ url: '/menu', params })
}
