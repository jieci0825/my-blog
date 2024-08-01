import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { TagItem, GetTagListParams, CreateTagParams } from './type.ts'

const PREFIX = '/blog/tag'

/**
 * 获取标签列表
 */
export const reqGetTagList = (params: GetTagListParams) => {
	return request.get<IBaseType<IBaseListType<TagItem>>>({ url: PREFIX, params })
}

/**
 * 创建标签
 */
export const reqCreateTag = (data: CreateTagParams) => {
	return request.post<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 编辑标签
 */
export const reqEditTag = (data: TagItem) => {
	return request.put<IBaseType<string>>({ url: PREFIX, data })
}

/**
 * 删除标签
 */
export const reqDeleteTag = (id: string) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/${id}` })
}
