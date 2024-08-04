<script setup lang="ts">
import BlogDetailContent from './components/blog-detail-content.vue'
import BlogDetailSidebar from './components/blog-detail-sidebar.vue'
import { blogApi } from '@/apis'
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { codeToHtml } from 'shiki'

const $route = useRoute()

const blogInfo = ref({})
const titleList = ref<Element[]>([])

const getDetail = async () => {
	const resp = await blogApi.reqGetBlogDetail($route.params.id as string)
	blogInfo.value = resp.data

	nextTick(() => {
		highlight()
		titleList.value = getAllTitleDom()
		jumpTo()
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
	const container = document.querySelector('.markdown-body')
	if (!container) return []
	// 获取所有标题dom
	const headings = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6'))
	// 给所有标题添加 id
	headings.forEach((heading, index) => {
		heading.id = `anchor-heading-${index}`
	})
	return headings
}

// 跳转到页面指定位置
const jumpTo = (id?: string, e?: Event) => {
	let behavior: any = 'smooth'
	if (!id) {
		behavior = 'instant'
		id = window.location.hash.replace('#', '')
	}
	if (!id) return
	if (e) e.preventDefault()
	document.getElementById(id)?.scrollIntoView({ behavior })
}
</script>

<template>
	<div class="blog-detail-container">
		<div class="container">
			<BlogDetailContent :blog-info="blogInfo"></BlogDetailContent>
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
		@media (max-width: @size-md) {
			display: block;
		}
	}
}
</style>
