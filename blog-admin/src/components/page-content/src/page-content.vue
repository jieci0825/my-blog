<script setup lang="ts">
import { ref } from 'vue'
import type { PageContentProps } from './page-content'
import { usePageContent } from '@/hooks'

const props = withDefaults(defineProps<PageContentProps>(), {})

const initFormData: { [key: string]: any } = {}
props.formConfig?.formItems.forEach(item => {
	initFormData[item.field] = item.defaultValue ?? ''
})
const formData = ref<{ [key: string]: any }>(initFormData)

const { onPageChange, onSizeChange, data, pagination, search } = usePageContent({
	request: props.usePageContent?.request,
	queryParams: formData
})

const onSubmit = () => {
	search()
}
</script>

<template>
	<div class="page-content">
		<!-- form -->
		<div class="form-wrapper">
			<JcForm
				v-if="props.formConfig"
				v-model="formData"
				@submit="onSubmit"
				v-bind="props.formConfig"></JcForm>
		</div>
		<!-- table -->
		<div class="table-wrapper">
			<JcTable
				v-bind="props.tableConfig"
				:table-data="data"></JcTable>
		</div>
		<!-- paginator -->
		<div class="paginator-wrapper">
			<JcPaginator
				v-if="props.paginatorConfig"
				@page-change="onPageChange"
				@size-change="onSizeChange"
				:total="pagination.total"></JcPaginator>
		</div>
	</div>
</template>

<style scoped lang="less">
.page-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.form-wrapper {
		width: 100%;
		margin-bottom: 20px;
		flex-shrink: 0;
	}
	.table-wrapper {
		flex: 1;
		width: 100%;
		overflow: hidden;
		:deep(.el-table__header-wrapper) {
			display: flex;
		}
		:deep(.el-table__body-wrapper) {
			display: flex;
		}
	}
	.paginator-wrapper {
		flex-shrink: 0;
		height: 50px;
		width: 100%;
		margin-top: 20px;
	}
}
</style>
