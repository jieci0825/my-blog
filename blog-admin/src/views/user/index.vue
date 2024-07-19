<script setup lang="ts">
import { userApi } from '@/apis'
import userTableConfig from './config/user-table.config'
import userSearchFormConfig from './config/user-search-form.config'
import userFormConfig from './config/user-form.config'
import { Postcard, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { UserItem } from '@/apis/modules/user/type'
import { UserFormTypes } from './types'
import { uploadFile } from '@/cos'
import { useRefs } from '@/hooks/use-refs'

const drawerTitle = ref('')
const drawerMode = ref<UserFormTypes>(UserFormTypes.EDIT)
const drawerVisable = ref(false)
const curUserInfo = ref<UserItem>()

// 分配角色
const handleTableAssignRole = (row: UserItem) => {
	console.log(row)
}
// 编辑用户信息
const handleTableEdit = (row: UserItem) => {
	setInfo(row, UserFormTypes.EDIT)
}
// 删除用户
const handleTableDelete = (row: UserItem) => {
	console.log(row)
}

const modeTitleMap = {
	[UserFormTypes.CREATE]: '创建用户',
	[UserFormTypes.EDIT]: '编辑用户信息'
}
function setInfo(row: UserItem, mode: UserFormTypes, isVisable: boolean = true) {
	curUserInfo.value = { ...row }
	drawerMode.value = mode
	drawerTitle.value = modeTitleMap[mode]
	drawerVisable.value = isVisable
}

const { refs, setRef } = useRefs()

// 处理表单提交
const handleSubmit = async (data: UserItem) => {
	if (drawerMode.value === UserFormTypes.EDIT) {
		if (data.avatarUrl && typeof data.avatarUrl !== 'string') {
			const result = await uploadFile(data.avatarUrl as unknown as File)
			data.avatarUrl = result.url
		}
		const resp = await userApi.reqEditUserInfo(data)
		ElMessage.success(resp.msg)
		drawerVisable.value = false
		refs.pageContentRef?.search()
	}
}
</script>

<template>
	<PageContent
		:ref="setRef('pageContentRef')"
		@handleTableEdit="handleTableEdit"
		@handleTableDelete="handleTableDelete"
		:use-page-content="{ request: userApi.reqGetUserList }"
		:form-config="userSearchFormConfig"
		:tableConfig="userTableConfig"
		:paginator-config="{}">
		<template #roleNickname="{ row }">
			<el-tag v-if="row.roleNickname">{{ row.roleNickname }}</el-tag>
		</template>
		<template #operate="{ row }">
			<el-button
				@click="handleTableAssignRole(row)"
				type="primary"
				:icon="Postcard"
				plain
				size="small"
				>分配角色</el-button
			>
			<el-button
				@click="handleTableEdit(row)"
				type="primary"
				:icon="Edit"
				plain
				size="small"
				>编辑</el-button
			>
			<el-button
				@click="handleTableDelete(row)"
				type="danger"
				:icon="Delete"
				plain
				size="small"
				>删除</el-button
			>
		</template>
	</PageContent>

	<!-- 对话框 -->
	<JcDrawer
		v-model="drawerVisable"
		size="500px"
		:title="drawerTitle">
		<JcForm
			v-model="curUserInfo"
			v-bind="userFormConfig"
			@submit="handleSubmit"></JcForm>
	</JcDrawer>
</template>
