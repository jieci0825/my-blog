// todo
export interface BlogInfo {
	title: string
	author: string
	date: string
	htmlContent: string
}

export interface BlogDetailContentProps {
	blogInfo: any
}

export interface BlogDetailSidebarProps {
	titleList: Element[]
}

export interface TitleNode {
	titleLevel: number
	title: string
	children: TitleNode[]
	raw: Element
	parent: TitleNode | null
}
