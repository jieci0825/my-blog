export interface TocItem {
	label: string
	children?: TocItem[] | null
}

export interface TocNode extends TocItem {
	level: number
	isLeaf: boolean
	raw: TocItem
	children: TocNode[] | null
}

export interface TocProps {
	title?: string
	tocList: TocItem[]
	isMarker?: boolean // 是否显示标记
}

export interface TocEmits {
	(e: 'click', item: TocItem, event: MouseEvent): void
}

export interface TocItemWrapProps {
	tocItem: TocNode
	retract?: number
}
