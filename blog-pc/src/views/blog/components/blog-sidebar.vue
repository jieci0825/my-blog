<script setup lang="ts">
import { ref } from 'vue'
import { AuthorInfo } from '../types'
import Toc, { type TocItem } from '@/components/toc'
import axios from 'axios'
import BlogSidebarItemSkeleton from './blog-sidebar-item-skeleton.vue'
import { useSkeleton } from '@/hooks'

const { loadingSkeleton, closeSkeleton } = useSkeleton()

// 作者信息
const authorInfo = ref<AuthorInfo>()
const getAuthorInfo = () => {
	authorInfo.value = {
		nickname: '劫辞',
		avatarUrl: 'https://cos.coderjc.cn/my-resource/avatar.webp',
		description: '前端领域的学习者，网络上的旅行者，生活中的自闭者，见字如面，很高兴能与你在网络的星辰大海之中相遇',
		sign: '山林不向四季起誓，荣枯随缘'
	}
}
getAuthorInfo()

// 分类列表
const categoryList = ref<TocItem[]>([])
const getCategoryList = () => {
	categoryList.value = [
		{
			label: '第一章',
			children: [
				{
					label: '第一节',
					children: [
						{
							label: '第一小节'
						},
						{
							label: '第二小节'
						}
					]
				},
				{
					label: '第二节',
					children: [
						{
							label: '第一小节'
						}
					]
				}
			]
		},
		{
			label: '第二章',
			children: [
				{
					label: '第一节',
					children: [
						{
							label: '第一小节'
						},
						{
							label: '第二小节',
							children: [
								{
									label: '第一小小节'
								}
							]
						}
					]
				}
			]
		},
		{
			label: '第三章',
			children: [
				{
					label: '第一节',
					children: [
						{
							label: '第一小节'
						}
					]
				}
			]
		}
	]

	// todo: 关闭骨架屏
	closeSkeleton()
}
getCategoryList()

// toc 点击事件
const tocClick = (item: TocItem, evt: MouseEvent) => {
	console.log(item, evt)
}

// 热门 blog
const hotBlogList = ref<any[]>([])
const getHotBlogList = async () => {
	const resp = await axios({
		method: 'GET',
		url: 'https://s.coder-helper.coderjc.cn/api/front/document/rank/hot'
	})
	hotBlogList.value = resp.data.data
	// todo: 关闭骨架屏
	closeSkeleton()
}
getHotBlogList()
</script>

<template>
	<div class="sidebar">
		<template v-if="!loadingSkeleton">
			<!-- author -->
			<div class="item-wrap">
				<div class="author-item">
					<div class="info">
						<p class="nickname">{{ authorInfo?.nickname }}</p>
						<p class="sign">
							<span>
								{{ authorInfo?.sign }}
							</span>
						</p>
						<p class="description">
							<span>
								{{ authorInfo?.description }}
							</span>
						</p>
					</div>
					<div class="avatar">
						<img :src="authorInfo?.avatarUrl" />
					</div>
				</div>
			</div>

			<!-- toc 分类 -->
			<div class="sticky">
				<div class="item-wrap">
					<Toc
						@click="tocClick"
						title="分类列表"
						:toc-list="categoryList"
						:is-marker="false"></Toc>
				</div>

				<!-- hot 文章 -->
				<div class="item-wrap">
					<div class="hot-article">
						<div class="title">热门文章</div>
						<div class="content">
							<div
								class="item"
								v-for="item in hotBlogList"
								:key="item.id">
								{{ item.title }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!-- 骨架屏 -->
		<template v-else>
			<BlogSidebarItemSkeleton :loading="loadingSkeleton"></BlogSidebarItemSkeleton>
		</template>
	</div>
</template>

<style scoped lang="less">
.sidebar {
	flex-shrink: 0;
	width: 300px;
	margin-right: auto;
	@media (max-width: @size-md) {
		display: none;
	}
	.sticky {
		position: sticky;
		top: 20px;
	}
	.item-wrap {
		padding: 15px;
		height: auto;
		border-radius: var(--base-b-r);
		border: 1px solid var(--border-color);
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
		.author-item {
			display: flex;
			.avatar {
				margin-left: 5px;
				--size: 50px;
				width: var(--size);
				height: var(--size);
				border-radius: 50%;
				overflow: hidden;
				flex-shrink: 0;
				border: 1px solid var(--border-color);
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 5px;
				.nickname {
					font-size: 15px;
					font-size: 18px;
					font-weight: bold;
					color: var(--primary-color);
				}
				.sign {
					color: var(--text-color-3);
				}
				.description {
					font-size: 12px;
					// text-indent: 2em;
					color: var(--text-color-5);
					span {
						background: linear-gradient(to right, #f2fbfa, #d5f2ef, #aae5df);
						background-size: 0 1px;
						background-repeat: no-repeat;
						// 设置默认为右，退出的时候位置就会靠右
						background-position: right bottom;
						// 只针对背景图的位置进行过渡
						transition: background-size 0.5s linear;
					}
					&:hover span {
						// 进入的时候位置为左
						background-position: left bottom;
						background-size: 100% 3px;
					}
				}
			}
		}
		.hot-article {
			width: 100%;
			.title {
				font-weight: bold;
				color: var(--text-color-2);
				border-bottom: 1px solid var(--border-color);
				padding-bottom: 5px;
			}
			.content {
				width: 100%;
				margin-top: 10px;
				.item {
					line-height: 24px;
					.one-omit();
					color: var(--text-color-3);
					&:hover {
						cursor: pointer;
						color: var(--primary-color);
					}
				}
			}
		}
	}
}
</style>
