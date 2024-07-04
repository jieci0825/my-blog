<script setup lang="ts">
import { ref } from 'vue'
import BlogContentItem from './blog-content-item.vue'
import BlogContentItemSkeleton from './blog-content-item-skeleton.vue'
import axios from 'axios'
import { useSkeleton } from '@/hooks';

// blog 列表
const blogList = ref([])
const total = ref(0)

const { loadingSkeleton, closeSkeleton } = useSkeleton()

const getBlogList = async () => {
	// 获取博客列表
	const condition = {
		limit: 10,
		page: 1,
		sort: 'lately',
		tagIds: [],
		title: '',
		type: 'article'
	}
	const resp = await axios({
		method: 'POST',
		url: 'https://s.coder-helper.coderjc.cn/api/front/document',
		data: condition
	})
	const { list, total: count } = resp.data.data
	blogList.value = list
	total.value = count
	closeSkeleton()
}

getBlogList()

</script>

<template>
	<div class="content">
		<template v-if="!loadingSkeleton">
			<BlogContentItem v-for="(item,index) in blogList" :key="index" :item-data="item"</BlogContentItem>
		</template>
		<template v-else>
			<BlogContentItemSkeleton v-for="item in 5" :key="item" :loading="loadingSkeleton"></BlogContentItemSkeleton>
		</template>
	</div>
</template>

<style scoped lang="less">
.content {
	align-self: flex-start;
	margin-left: auto;
	flex: 1;
	max-width: 720px;
	border: 1px solid var(--border-color);
	border-radius: var(--base-b-r);
	padding: 20px;
	@media (max-width: @size-md) {
		margin-right: auto;
	}
}
</style>
