import { IBaseListType } from '../types'

export interface BlogTagItem {
	id: number
	tagName: string
}

export interface GetBlogTagListParams extends IBaseListType {
	tagName?: string
}

export interface CreateBlogTagParams {
	tagNames: string[]
}
