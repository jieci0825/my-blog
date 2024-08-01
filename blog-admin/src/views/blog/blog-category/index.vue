<script setup lang="ts">
import categoryFormConfig from './config/tag-form.config'
import categoryTableConfig from './config/tag-table.config'

const handleCreateCategory = () => {}
const handleTableEdit = () => {}

const usePageContent = {
	// request:
}
</script>

<template>
	<div class="blog-category-container container">
		<PageContent
			@handleTableEdit="handleTableEdit"
			@actCreate="handleCreateCategory"
			:use-page-content="usePageContent"
			:tableConfig="categoryTableConfig"></PageContent>
	</div>
</template>

<style scoped lang="less"></style>
