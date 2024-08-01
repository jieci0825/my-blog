import { h } from 'vue'

export const openDeleteMessageBox = (message: string = '你确定要执行此删除行为吗？') => {
	return new Promise<void>(resolve => {
		ElMessageBox({
			title: '删除提示',
			message: h('p', { style: { color: 'var(--el-color-danger)' } }, message),
			showCancelButton: true,
			confirmButtonText: '确认',
			cancelButtonText: '取消'
		})
			.then(() => {
				resolve()
			})
			.catch(() => {})
	})
}
