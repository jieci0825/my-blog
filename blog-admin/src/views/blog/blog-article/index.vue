<script setup lang="ts">
import blogTableConfig from './config/blog-table.config'
import blogSearchFormConfig from './config/blog-search-form.config'
import blogFormConfig from './config/blog-form'
import { blogApi } from '@/apis'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import { EBlogStatus, type BlogStatus } from '@/typings'
import type { BlogItem } from '@/apis/modules/blog/type'

const dialogVisable = ref(false)
const curBlogInfo = ref<BlogItem>()

const handleTableEdit = (row: BlogItem) => {
	curBlogInfo.value = row
	dialogVisable.value = true
}

const handleTableDelete = async (row: BlogItem) => {
	await openDeleteMessageBox()
	const resp = await blogApi.reqDeleteBlog(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: BlogItem) => {
	const resp = await blogApi.reqEditBlog(data)
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.blogPageContentRef?.fetchData()
}

const BlogStatusMap = {
	[EBlogStatus.DRAFT]: { label: '草稿', type: 'info' },
	[EBlogStatus.PUBLISH]: { label: '发布', type: 'success' },
	[EBlogStatus.HIDE]: { label: '隐藏', type: 'danger' }
}

const usePageContent = {
	request: blogApi.reqGetBlogList
}
</script>

<template>
	<div class="blog-article-contaianer container">
		<PageContent
			@handleTableEdit="handleTableEdit"
			@handleTableDelete="handleTableDelete"
			:ref="setRef('blogPageContentRef')"
			:use-page-content="usePageContent"
			:form-config="blogSearchFormConfig"
			:tableConfig="blogTableConfig"
			:paginator-config="{}">
			<template #preview="{ row }">
				<JcImage
					:width="100"
					:height="70"
					:src="row.previewUrl" />
			</template>
			<template #status="{ row }">
				<el-tag :type="BlogStatusMap[row.status as BlogStatus].type">
					{{ BlogStatusMap[row.status as BlogStatus].label }}
				</el-tag>
			</template>
		</PageContent>

		<JcDialog
			v-model="dialogVisable"
			title="编辑博客">
			<JcForm
				@submit="handleSubmit"
				v-model="curBlogInfo"
				v-bind="blogFormConfig"></JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less"></style>
