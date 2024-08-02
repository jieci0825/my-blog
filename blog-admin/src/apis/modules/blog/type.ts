import type { BlogStatus } from '@/typings'
import type { BlogTagItem } from '../blog-tag/type'

export interface BlogItem {
	id: number
	date: string
	title: string
	previewUrl?: string
	description?: string
	htmlContent: string
	status: BlogStatus
	categoryName?: string
	lookNums: number
	likeNums: number
	tags: BlogTagItem[]
	categoryId?: number | null
	authorId: number
}

export interface CreateBlogParams {
	title: string
	previewUrl?: string
	description?: string
	htmlContent: string
	status: BlogStatus
	tagIds: number[]
	categoryId?: number
}
