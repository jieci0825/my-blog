<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'

import _hljs from './script/use-highlight'
import { InsertFnType } from './types/index-type'
import { debounce } from '@/utils'

// 这里不要使用 ref
let editor: any
const editorRef = ref()

// emit 事件
const emit = defineEmits<{
	uploadFile: [file: File, callback: InsertFnType] // 提交成功
}>()

// 图片上传 hook
const imageHook = () => {
	editor.removeHook('addImageBlobHook')

	editor.addHook('addImageBlobHook', (file: File, callback: InsertFnType) => {
		emit('uploadFile', file, callback)
	})
}

// 高亮代码块
const highlightCode = () => {
	const codeEls = document.querySelectorAll('pre code')
	codeEls.forEach((codeEl: any) => {
		// 获取当前元素 data-language 属性的值
		// const lang = codeEl.getAttribute('data-language')
		if (codeEl.getAttribute('data-highlighted') !== 'yes') {
			_hljs.highlightElement(codeEl as HTMLElement)
		}
	})
}

const _dHighlightCode = debounce(highlightCode, 500)

onMounted(() => {
	editor = new Editor({
		el: editorRef.value,
		language: 'zh-CN',
		height: '100%',
		initialEditType: 'markdown',
		previewStyle: 'vertical',
		placeholder: '请输入内容...',
		events: {
			change: _dHighlightCode.bind(this)
		},
		codeBlock: {
			indent: 1 // 这里设置代码块的前面缩进为 2 个空格
		}
	})
	imageHook()
})

const getHtml = () => {
	return editor.getHTML()
}

const setHtml = (val: string) => {
	editor.setHTML(val)
}

const clear = () => {
	editor.setHTML('<p><br></p>')
}

defineExpose({
	getHtml,
	clear,
	setHtml
})
</script>

<template>
	<div class="editor-box">
		<div
			class="markdown-editor markdown-body"
			ref="editorRef"></div>
	</div>
</template>

<style scoped lang="less">
.editor-box {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
