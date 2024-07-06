<script setup lang="ts">
import axios from 'axios'
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import BlogDetailContent from './components/blog-detail-content.vue'
import BlogDetailSidebar from './components/blog-detail-sidebar.vue'
import { codeToHtml } from 'shiki'

const $route = useRoute()

const htmlContent = ref('')
const titleList = ref<Element[]>([])

const getDetail = async () => {
	const { data } = await axios({
		method: 'GET',
		url: `https://s.coder-helper.coderjc.cn/api/front/document/detail/${$route.params.id}`
	})
	htmlContent.value = data.data.htmlContent

	nextTick(() => {
		highlight()
		titleList.value = getAllTitleDom()
	})
}
getDetail()

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

// 获取所有标题dom
function getAllTitleDom() {
	return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
}
</script>

<template>
	<div class="blog-detail-container">
		<div class="container">
			<BlogDetailContent :html-content="htmlContent"></BlogDetailContent>
			<BlogDetailSidebar :title-list="titleList"></BlogDetailSidebar>
		</div>
	</div>
</template>

<style scoped lang="less">
.blog-detail-container {
	width: 100%;
	padding: 20px;
	.container {
		max-width: var(--center-width);
		margin: 0 auto;
		display: flex;
	}
}
</style>
