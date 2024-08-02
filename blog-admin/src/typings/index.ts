export type ExtractFields<T extends { field: string }[]> = {
	[K in T[number]['field']]: any
}

export enum EBlogStatus {
	HIDE = 0, // 隐藏
	PUBLISH = 1, // 发布
	DRAFT = 2 // 草稿
}

export type BlogStatus = (typeof EBlogStatus)[keyof typeof EBlogStatus]
