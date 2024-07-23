export type LayoutModeType = 'vertical' | 'horizontal'

export interface GlobalConfig {
	isCollapse: boolean
	isAccordion: boolean
	routeAnimation: string
	asideWidth: number
	grayMode: boolean
	colorWeakness: boolean
	layoutMode: LayoutModeType
}
