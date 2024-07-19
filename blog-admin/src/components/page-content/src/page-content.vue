<script setup lang="ts">
import { ref } from 'vue'
import type { PageConteEmits, PageContentProps } from './page-content'
import { usePageContent } from '@/hooks'
import JcTable from '@/components/jc-table'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<PageContentProps>(), {})
const emits = defineEmits<PageConteEmits>()

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
	emits('search')
}

const handleTableEdit = (scope: any) => {
	emits('handleTableEdit', scope)
}
const handleTableDelete = (scope: any) => {
	emits('handleTableDelete', scope)
}

defineExpose({
	search
})
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
		<!-- actions -->
		<div class="action-wrapper">
			<slot name="actions">
				<el-button
					@click="emits('actCreate')"
					type="primary"
					plain>
					<el-icon :size="14"> <Plus /> </el-icon>新增
				</el-button>
			</slot>
		</div>
		<!-- table -->
		<div class="table-wrapper">
			<!-- <Component :is="h(JcTable, { ...props.tableConfig, tableData: data }, $slots)">
			</Component> -->
			<JcTable
				v-bind="props.tableConfig"
				:table-data="data">
				<template
					v-for="(_, slot) in $slots"
					:key="slot"
					v-slot:[slot]="scope">
					<slot
						:name="slot"
						v-bind="scope"></slot>
				</template>
				<template #operate="scope">
					<slot
						name="operate"
						:row="scope">
						<el-button
							@click="handleTableEdit(scope)"
							type="primary"
							:icon="Edit"
							plain
							size="small"
							>编辑</el-button
						>
						<el-button
							@click="handleTableDelete(scope)"
							type="danger"
							:icon="Delete"
							plain
							size="small"
							>删除</el-button
						>
					</slot>
				</template>
			</JcTable>
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
		flex-shrink: 0;
	}
	.action-wrapper {
		width: 100%;
		flex-shrink: 0;
		margin-bottom: 20px;
		display: flex;
		:deep(.el-button) {
			.el-icon {
				margin-right: 5px;
			}
		}
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
