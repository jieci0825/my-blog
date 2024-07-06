export interface BlogDetailContentProps {
	htmlContent: string
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
