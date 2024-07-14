<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { JcTableProps } from './jc-table'

const props = withDefaults(defineProps<JcTableProps>(), {
	tableData: () => []
})

const attrs = useAttrs()

const containerStyle = computed(() => {
	return {
		width: props.width || '100%'
	}
})
</script>

<template>
	<el-table
		v-bind="attrs"
		:style="containerStyle"
		:data="props.tableData">
		<!-- <el-table-column type="selection" width="55" /> -->
		<template
			v-for="item in props.columns"
			:key="item.property">
			<el-table-column
				v-bind="item"
				:align="props.align">
				<template #default="scope">
					<template v-if="item.slotName">
						<slot
							:name="item.slotName"
							:row="scope.row">
							{{ scope.row[item.property] }}
						</slot>
					</template>
					<template v-else>
						{{ scope.row[item.property] }}
					</template>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<style scoped lang="less"></style>
