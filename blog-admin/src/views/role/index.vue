<script setup lang="ts">
import { ref } from 'vue'
import roleTableConfig from './config/role-table.config'
import { useRoleActions, useRoleGetters } from '@/store'

const { reqGetRoleList } = useRoleActions()
const { getRoleList } = useRoleGetters()
reqGetRoleList()
const pageInfo = ref({
	currentPage: 1,
	pageSize: 10
})

const onPageChange = (page: number) => {
	console.log(page, '---')
}
const onSizeChange = (size: number) => {
	console.log(size, '---')
}
</script>

<template>
	<div class="role-container">
		<JcTable
			v-bind="roleTableConfig"
			:table-data="getRoleList"></JcTable>
		<JcPaginator
			@page-change="onPageChange"
			@size-change="onSizeChange"
			:total="100"></JcPaginator>
	</div>
</template>

<style scoped lang="less">
.role-container {
	width: 100%;
}
</style>
