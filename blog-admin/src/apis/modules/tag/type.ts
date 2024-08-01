import { IBaseListType } from '../types'

export interface TagItem {
	id: number
	tagName: string
}

export interface GetTagListParams extends IBaseListType {
	tagName?: string
}

export interface CreateTagParams {
	tagNames: string[]
}
