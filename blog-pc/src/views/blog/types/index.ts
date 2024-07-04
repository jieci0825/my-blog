export interface AuthorInfo {
	nickname: string
	avatarUrl: string
	description: string
	sign: string
}

export interface BlogItem {
	title: string
	description?: string
	date: string
	tags: string[]
	coverUrl?: string // 封面图
	comments: number
	views: number
}

export interface BlogSkeletonProps {
	loading: boolean
}
