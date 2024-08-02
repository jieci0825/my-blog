import type { JcTableConfig } from '@/components/jc-table'

const tagTableConfig: JcTableConfig = {
	columns: [
		{ label: '封面', property: 'previewUrl', width: 120, slotName: 'preview' },
		{ label: '时间', property: 'date', width: 220 },
		{ label: '作者', property: 'author', width: 100, showOverflowTooltip: true },
		{ label: '标题', property: 'title', width: 240, showOverflowTooltip: true },
		{ label: '描述', property: 'description', minWidth: 260, showOverflowTooltip: true },
		{ label: '状态', property: 'status', width: 100, slotName: 'status' },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default tagTableConfig
