<script setup lang="ts">
import Toc, { type TocItem } from '@/components/toc'
import BlogSidebarItemSkeleton from './blog-sidebar-item-skeleton.vue'
import { ref } from 'vue'
import { useSkeleton } from '@/hooks'
import { useGlobalGetters } from '@/store'
import { blogApi } from '@/apis'
import { EBlogRank } from '@/typings'
import { BlogItem } from '@/apis/modules/blog/type'

const { loadingSkeleton, closeSkeleton } = useSkeleton()

const { getAuthorInfoState } = useGlobalGetters()

// 分类列表
const categoryList = ref<TocItem[]>([])
const getCategoryList = async () => {
	const resp = await blogApi.reqGetBlogCategoryList()
	categoryList.value = resp.data.map(item => {
		return { id: item.id, label: item.categoryName, count: item.blogNums }
	})
	closeSkeleton()
}
getCategoryList()

// toc 点击事件
const tocClick = (item: TocItem, evt: MouseEvent) => {
	console.log(item, evt)
}

// 热门 blog
const hotBlogList = ref<BlogItem[]>([])
const getHotBlogList = async () => {
	const resp = await blogApi.reqGetBlogRank({ type: EBlogRank.HOT })
	hotBlogList.value = resp.data
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
						<p class="nickname">{{ getAuthorInfoState?.nickname }}</p>
						<p class="sign">
							<span>
								{{ getAuthorInfoState?.sign }}
							</span>
						</p>
						<p class="description">
							<span>
								{{ getAuthorInfoState?.description }}
							</span>
						</p>
					</div>
					<div class="avatar">
						<img :src="getAuthorInfoState?.avatarUrl" />
					</div>
				</div>
			</div>

			<!-- toc 分类 -->
			<div class="sticky">
				<div class="item-wrap">
					<Toc
						@click="tocClick"
						title="分类列表"
						iconfont-name="icon-folderOpened"
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
								<div class="text">
									<span>{{ item.title }}</span>
								</div>
								<span class="look">{{ item.lookNums }}</span>
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
					font-size: 18px;
					font-weight: bold;
					color: var(--primary-color);
				}
				.sign {
					font-size: 16px;
					color: var(--el-text-color-regular);
				}
				.description {
					font-size: 14px;
					color: var(--el-text-color-placeholder);
					span {
						background: linear-gradient(
							to right,
							var(--el-color-primary-light-8),
							var(--el-color-primary-light-7),
							var(--el-color-primary-light-5)
						);
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
				font-size: 18px;
				font-weight: bold;
				color: var(--el-text-color-primary);
				border-bottom: 1px solid var(--border-color);
				padding-bottom: 5px;
			}
			.content {
				width: 100%;
				margin-top: 10px;
				.item {
					display: flex;
					font-size: 15px;
					line-height: 24px;
					color: var(--el-text-color-regular);
					&:hover {
						cursor: pointer;
						color: var(--primary-color);
					}
					.text {
						flex: 1;
						margin-right: 10px;
						.one-omit();
					}
					.look {
						flex-shrink: 0;
						margin-left: auto;
						font-size: 13px;
						color: var(--el-text-color-placeholder);
					}
				}
			}
		}
	}
}
</style>
