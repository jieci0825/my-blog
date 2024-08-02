import type { BlogTagItem } from '../blog-tag/type'

export interface BlogItem {
	id: string
	date: string
	title: string
	previewUrl?: string
	description?: string
	htmlContent: string
	status: 0 | 1 | 2
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
	status: 0 | 1 | 2
	tagIds: number[]
	categoryId?: number
}
