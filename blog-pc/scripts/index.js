import { debounce } from '../src/utils'

function setFontSize(doc, win, designWidth) {
	var html = doc.documentElement
	function refreshRem() {
		var clientWidth = html.clientWidth
		if (clientWidth >= designWidth) {
			html.style.fontSize = '100px'
		} else {
			html.style.fontSize = 100 * (clientWidth / designWidth) + 'px'
		}
	}
	refreshRem()
}

function onResize() {
	// setFontSize(document, window, 750)
}

// onResize()

window.addEventListener('resize', debounce(onResize, 100))
