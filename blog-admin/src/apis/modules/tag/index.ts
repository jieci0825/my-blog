import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { TagItem, GetTagListParams, CreateTagParams } from './type.ts'

/**
 * 获取标签列表
 */
export const reqGetTagList = (params: GetTagListParams) => {
	return request.get<IBaseType<IBaseListType<TagItem>>>({ url: '/tag', params })
}

/**
 * 创建标签
 */
export const reqCreateTag = (data: CreateTagParams) => {
	return request.post<IBaseType<string>>({ url: '/tag', data })
}

/**
 * 编辑标签
 */
export const reqEditTag = (data: TagItem) => {
	return request.put<IBaseType<string>>({ url: '/tag', data })
}

/**
 * 删除标签
 */
export const reqDeleteTag = (id: string) => {
	return request.delete<IBaseType<string>>({ url: `/tag/${id}` })
}
