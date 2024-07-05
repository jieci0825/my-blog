<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { BlogDetailContentProps } from '../types'
import { codeToHtml } from 'shiki'

const props = defineProps<BlogDetailContentProps>()

watch(
	() => props.htmlContent,
	newVal => {
		if (!newVal) return
		nextTick(() => {
			highlight()
		})
	},
	{ immediate: true }
)

async function highlight() {
	const preList = Array.from(document.querySelectorAll('pre'))

	if (!preList.length) return

	for (const pre of preList) {
		const parent = pre.parentNode as HTMLElement
		// 获取父节点的 data-language 属性值
		const lang = parent.getAttribute('data-language')
		const formatCode = await codeToHtml(pre.textContent!, {
			lang: lang || 'javascript',
			theme: 'night-owl'
		})
		parent.innerHTML = ''
		parent.innerHTML = formatCode
	}
}
</script>

<template>
	<div class="content-wrap">
		<div class="header"></div>
		<div
			class="main markdown-body"
			v-html="props.htmlContent"></div>
	</div>
</template>

<style scoped lang="less">
.content-wrap {
	padding: 20px;
	flex: 1;
	max-width: 720px;
	border: 1px solid var(--border-color);
	border-radius: var(--base-b-r);
	@media (max-width: @size-xs) {
		width: 100%;
		border: none;
		padding: 0;
		.markdown-body {
			font-size: 16px;
			line-height: 1.4;
		}
		.markdown-body pre {
			font-size: 12px !important;
		}
	}
}
</style>
