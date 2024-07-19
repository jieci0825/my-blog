<script setup lang="ts">
import { userApi } from '@/apis'
import userTableConfig from './config/user-table.config'
import userSearchFormConfig from './config/user-search-form.config'
import userFormFn from './config/user-form.config'
import { Postcard, Edit, Aim } from '@element-plus/icons-vue'
import { h, ref } from 'vue'
import { UserItem } from '@/apis/modules/user/type'
import { UserFormTypes } from './types'
import { uploadFile } from '@/cos'
import { useRefs } from '@/hooks/use-refs'
import { previewImage } from '@/utils'

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
const handleTableLogoff = async (row: UserItem) => {
	try {
		await ElMessageBox({
			title: '删除用户',
			message: h('p', { style: { color: 'var(--el-color-danger)' } }, `你确认要注销 ${row.nickname} 用户吗？`),
			showCancelButton: true,
			confirmButtonText: '确认',
			cancelButtonText: '取消'
		})
		const resp = await userApi.reqLogoffUser(row.id)
		ElMessage.success(resp.msg)
		refs.pageContentRef?.search()
	} catch (error) {}
}

const modeTitleMap = {
	[UserFormTypes.CREATE]: '创建用户',
	[UserFormTypes.EDIT]: '编辑用户信息'
}
// 表单配置
let userFormConfig = userFormFn(UserFormTypes.CREATE)
function setInfo(row: UserItem | null, mode: UserFormTypes, isVisable: boolean = true) {
	userFormConfig = userFormFn(mode)
	curUserInfo.value = row ? { ...row } : ({} as UserItem)
	drawerMode.value = mode
	drawerTitle.value = modeTitleMap[mode]
	drawerVisable.value = isVisable
}

const { refs, setRef } = useRefs()

// 处理表单提交
const handleSubmit = async (data: UserItem) => {
	let resp: any = undefined
	// 处理文件
	if (data.avatarUrl && typeof data.avatarUrl !== 'string') {
		const result = await uploadFile(data.avatarUrl as unknown as File)
		data.avatarUrl = result.url
	}
	// 分发请求
	if (drawerMode.value === UserFormTypes.EDIT) {
		resp = await userApi.reqEditUserInfo(data)
	} else if (drawerMode.value === UserFormTypes.CREATE) {
		resp = await userApi.reqCreateUser(data)
		console.log('🚢 ~ 当前打印的内容 ~ resp:', resp)
	}
	ElMessage.success(resp.msg)
	drawerVisable.value = false
	refs.pageContentRef?.search()
}

// 创建用户
const handleCreateUser = () => {
	setInfo(null, UserFormTypes.CREATE)
}
</script>

<template>
	<PageContent
		@actCreate="handleCreateUser"
		:ref="setRef('pageContentRef')"
		:use-page-content="{ request: userApi.reqGetUserList }"
		:form-config="userSearchFormConfig"
		:tableConfig="userTableConfig"
		:paginator-config="{}">
		<template #avatarUrl="{ row }">
			<div
				class="img-box"
				@click="previewImage({ urlList: [row.avatarUrl] })">
				<el-image
					fit="cover"
					style="width: 100%; height: 100%"
					:src="row.avatarUrl" />
			</div>
		</template>
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
				@click="handleTableLogoff(row)"
				type="danger"
				:icon="Aim"
				plain
				size="small"
				>注销</el-button
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

<style scoped lang="less">
.img-box {
	margin: auto;
	width: 40px;
	height: 40px;
	border: 1px solid var(--border-color);
	border-radius: 50%;
	overflow: hidden;
}
</style>
