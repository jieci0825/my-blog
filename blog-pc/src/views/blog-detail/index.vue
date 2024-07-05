<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BlogDetailContent from './components/blog-detail-content.vue'

const $route = useRoute()

const htmlContent = ref('')

const getDetail = async () => {
	const { data } = await axios({
		method: 'GET',
		url: `https://s.coder-helper.coderjc.cn/api/front/document/detail/${$route.params.id}`
	})
	htmlContent.value = data.data.htmlContent
}
getDetail()
</script>

<template>
	<div class="blog-detail-container">
		<div class="container">
			<BlogDetailContent :html-content="htmlContent"></BlogDetailContent>
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
