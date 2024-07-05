<script setup lang="ts">
import BlogContentItem from './blog-content-item.vue'
import BlogContentItemSkeleton from './blog-content-item-skeleton.vue'
import BlogContentItemXS from './blog-content-item-xs.vue'
import BlogContentItemXSSkeleton from './blog-content-item-xs-skeleton.vue'
import axios from 'axios'
import { usePage, useSkeleton } from '@/hooks'

// blog 列表
const { loadingSkeleton, closeSkeleton } = useSkeleton()

// test
const fetchData = async (params: any) => {
	return axios({
		method: 'POST',
		url: 'https://s.coder-helper.coderjc.cn/api/front/document',
		data: params
	})
}

const {
	data: blogList,
	pagination,
	onPage,
	onPageSize
} = usePage(
	fetchData,
	{
		limit: 10,
		page: 1,
		sort: 'lately',
		tagIds: [],
		title: '',
		type: 'article'
	},
	{
		respAfterCallback: closeSkeleton
	}
)
</script>

<template>
	<div class="content-wrap">
		<div class="content">
			<template v-if="!loadingSkeleton">
				<BlogContentItem
					v-for="(item, index) in blogList"
					:key="index"
					:item-data="item"></BlogContentItem>
			</template>
			<template v-else>
				<BlogContentItemSkeleton
					v-for="item in 5"
					:key="item"
					:loading="loadingSkeleton"></BlogContentItemSkeleton>
			</template>
		</div>
		<div class="content-xs">
			<template v-if="!loadingSkeleton">
				<BlogContentItemXS
					v-for="(item, index) in blogList"
					:key="index"
					:item-data="item"></BlogContentItemXS>
			</template>
			<template v-else>
				<BlogContentItemXSSkeleton
					v-for="item in 5"
					:key="item"
					:loading="loadingSkeleton"></BlogContentItemXSSkeleton>
			</template>
		</div>
		<div class="footer">
			<el-pagination
				style="width: 100%"
				size="small"
				background
				@current-change="onPage"
				@size-change="onPageSize"
				:page-sizes="[5, 10, 15, 20]"
				layout="total, sizes, ->, prev, pager, next, jumper"
				:total="pagination.total" />
		</div>
	</div>
</template>

<style scoped lang="less">
.content-wrap {
	align-self: flex-start;
	margin-left: auto;
	flex: 1;
	max-width: 720px;
	border-radius: var(--base-b-r);
	border: 1px solid var(--border-color);
	padding: 20px;
	padding-bottom: 10px;
	.content {
		width: 100%;
		@media (max-width: @size-xs) {
			display: none;
		}
	}
	@media (max-width: @size-md) {
		margin-right: auto;
	}
	@media (max-width: @size-xs) {
		padding: 0;
		border: none;
	}
	.footer {
		padding-top: 10px;
		width: 100%;
		display: flex;
		align-items: center;
	}
}

.content-xs {
	width: 100%;
	display: none;
	@media (max-width: @size-xs) {
		display: block;
	}
}
</style>
