<script setup lang="ts">
import { formatTime } from '@/utils'
import type { BlogDetailContentProps } from '../types'

const props = defineProps<BlogDetailContentProps>()
</script>

<template>
	<div class="content-wrap">
		<div class="header">
			<h1 class="title">{{ props.blogInfo.title }}</h1>
			<div class="info">
				<span class="author">劫辞</span>
				<div class="show-item">
					<span class="iconfont icon-time"></span>
					<span class="value">{{ formatTime(props.blogInfo.date) }}</span>
				</div>
				<div class="show-item">
					<span class="iconfont icon-view"></span>
					<span class="value">{{ props.blogInfo.lookNums }}</span>
				</div>
			</div>
		</div>
		<div
			class="main markdown-body"
			v-html="props.blogInfo.htmlContent"></div>
	</div>
</template>

<style scoped lang="less">
.content-wrap {
	padding: 20px;
	flex: 1;
	max-width: 720px;
	border: 1px solid var(--border-color);
	border-radius: var(--base-b-r);
	margin-left: auto;
	@media (max-width: @size-md) {
		margin-right: auto;
	}
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
	.header {
		margin-bottom: 30px;
		.title {
			margin-bottom: 10px;
		}
		.info {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			color: var(--text-color-5);
			gap: 10px;
			font-size: 16px;
			.show-item {
				font-size: 14px;
				display: flex;
				align-items: center;
				gap: 5px;
			}
		}
	}
}
</style>
