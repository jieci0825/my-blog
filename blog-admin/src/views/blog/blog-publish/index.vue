<script setup lang="ts">
import Editor from '@/components/editor'
import publishFormFn from './config/publish-form'
import { reactive, ref } from 'vue'
import { FullScreen, Close, MessageBox, Position } from '@element-plus/icons-vue'
import { useEventListener } from '@/hooks'
import { blogApi, blogCategoryApi } from '@/apis'
import { useRefs } from '@/hooks/use-refs'
import type { CreateBlogParams } from '@/apis/modules/blog/type'
import type { BlogCategoryItem } from '@/apis/modules/blog-category/type'
import { uploadFile } from '@/cos'

defineOptions({ name: 'BlogPublish' })

const blogData: CreateBlogParams = reactive({
	title: '',
	description: '',
	htmlContent: '',
	status: 1,
	tagIds: [],
	categoryId: 0
})

const size = 'large'
const isFull = ref(false)

const { refs, setRef } = useRefs()

useEventListener(window, 'keydown', e => {
	if (e.key === 'Escape') {
		isFull.value = false
	}
})

const handleDraft = async () => {
	await submitIntercept()
	blogData.status = 2
	submitBlog(blogData, '已保存至草稿箱')
}

function reset() {
	blogData.title = ''
	blogData.htmlContent = ''
	blogData.status = 1
	blogData.tagIds = []
	blogData.categoryId = 0
	refs.editorRef.setHtml('')
}

// 分类列表
const categoryList = ref<BlogCategoryItem[]>([])
const getCategoryList = async () => {
	const resp = await blogCategoryApi.reqGetBlogCategoryList()
	categoryList.value = resp.data
}
getCategoryList()

const visible = ref(false)
const publishFormConfig = ref({})
const openPublishDrawer = () => {
	publishFormConfig.value = publishFormFn(categoryList.value)
	visible.value = true
}

const handlePublish = async (data: CreateBlogParams) => {
	await submitIntercept()
	// 处理文件
	if (data.previewUrl && typeof data.previewUrl !== 'string') {
		const result = await uploadFile(data.previewUrl as unknown as File)
		data.previewUrl = result.url
	}
	const _blogData = Object.assign({}, blogData, data)
	await submitBlog(_blogData, '成功发布博客')
	visible.value = false
}

async function submitBlog(blogData: CreateBlogParams, message: string) {
	await blogApi.reqCreateBlog(blogData)
	ElMessage.success(message)
	reset()
}

function submitIntercept() {
	return new Promise<void>(resolve => {
		if (!blogData.title) {
			return ElMessage.warning('请输入博客标题')
		}
		if (!blogData.htmlContent) {
			return ElMessage.warning('请输入博客内容')
		}
		resolve()
	})
}
</script>

<template>
	<div :class="['blog-publish-container', 'container', isFull ? 'full' : '']">
		<div class="header">
			<el-input
				:size="size"
				v-model="blogData.title"
				placeholder="请输入博客标题..."></el-input>
			<el-icon
				@click="isFull = !isFull"
				class="icon"
				:size="30">
				<FullScreen v-if="!isFull" />
				<Close v-else />
			</el-icon>
			<el-button
				@click="handleDraft"
				style="margin-left: 20px"
				:size="size">
				<el-icon
					style="margin-right: 5px"
					:size="20">
					<MessageBox />
				</el-icon>
				草稿箱</el-button
			>
			<el-button
				@click="openPublishDrawer"
				:size="size"
				type="primary">
				<el-icon
					style="margin-right: 5px"
					:size="20">
					<Position />
				</el-icon>
				发布</el-button
			>
		</div>
		<div class="content">
			<Editor
				:ref="setRef('editorRef')"
				v-model:data="blogData.htmlContent" />
		</div>

		<JcDrawer
			title="发布博客"
			v-model="visible">
			<JcForm
				v-bind="publishFormConfig"
				@submit="handlePublish">
				<template #tagHeader>
					<div style="font-size: 14px">搜索并选择需要添加的标签</div>
				</template>
			</JcForm>
		</JcDrawer>
	</div>
</template>

<style scoped lang="less">
.blog-publish-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
	&.full {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
	}
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		.icon {
			cursor: pointer;
			&:hover {
				color: var(--el-color-primary);
			}
		}
		:deep(.el-input__inner) {
			font-size: 30px;
			font-weight: 600;
			color: var(--el-text-color-primary);
		}
		:deep(.el-input__wrapper) {
			box-shadow: none;
		}
	}
	.content {
		border-radius: 4px;
		flex: 1;
		border: 1px solid var(--border-color);
		width: 100%;
	}
}
</style>
