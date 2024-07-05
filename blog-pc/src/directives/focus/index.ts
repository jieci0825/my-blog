// 自动获取焦点指令
//  - 如果当前元素不是 input 元素，则自动查找当前元素下的第一个 input 元素
export default {
	mounted(el: HTMLElement) {
		// 判断当前元素是否是 input
		const isInput = el.tagName.toLowerCase() === 'input'

		if (isInput) {
			setTimeout(() => {
				el.focus()
			}, 0)
		} else {
			const inputDom = el.querySelector('input')
			inputDom && inputDom.focus()
		}
	}
}
