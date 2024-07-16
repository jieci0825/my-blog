import type { JcTableConfig } from '@/components/jc-table'

const userTableConfig: JcTableConfig = {
	columns: [
		{ label: '用户账号', property: 'account', width: 120 },
		{ label: '用户昵称', property: 'nickname', width: 120 },
		{ label: '个性签名', property: 'sign', width: 200, showOverflowTooltip: true },
		{ label: '个人简介', property: 'description', width: 300, showOverflowTooltip: true },
		{ label: '用户角色', property: 'roleNickname', width: 150 },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right' }
	],
	border: true
}

export default userTableConfig
