import type { JcTableConfig } from '@/components/jc-table'

const userTableConfig: JcTableConfig = {
	columns: [
		{ label: '标签名称', property: 'tagName', width: 200 },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default userTableConfig
