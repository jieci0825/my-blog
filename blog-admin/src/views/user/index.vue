<script setup lang="ts">
import { userApi } from '@/apis'
import userTableConfig from './config/user-table.config'
import userSearchFormConfig from './config/user-search-form.config'
import userFormFn from './config/user-form.config'
import { Postcard, Edit, Aim } from '@element-plus/icons-vue'
import { h, ref } from 'vue'
import { UserItem } from '@/apis/modules/user/type'
import { ActionType } from './types'
import { uploadFile } from '@/cos'
import { useRefs } from '@/hooks/use-refs'
import { previewImage } from '@/utils'
import { useRoleActions, useRoleGetters } from '@/store'

const drawerTitle = ref('')
const curAction = ref<ActionType>(ActionType.EDIT)
const drawerVisable = ref(false)
const curUserInfo = ref<UserItem>()

// 编辑用户信息
const handleTableEdit = (row: UserItem) => {
	setInfo(row, ActionType.EDIT)
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
	[ActionType.CREATE]: '创建用户',
	[ActionType.EDIT]: '编辑用户信息'
}
// 表单配置
let userFormConfig = userFormFn(ActionType.CREATE)
function setInfo(row: UserItem | null, mode: ActionType, isVisable: boolean = true) {
	userFormConfig = userFormFn(mode)
	curUserInfo.value = row ? { ...row } : ({} as UserItem)
	curAction.value = mode
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
	if (curAction.value === ActionType.EDIT) {
		resp = await userApi.reqEditUserInfo(data)
	} else if (curAction.value === ActionType.CREATE) {
		resp = await userApi.reqCreateUser(data)
	}
	ElMessage.success(resp.msg)
	drawerVisable.value = false
	refs.pageContentRef?.search()
}

// 创建用户
const handleCreateUser = () => {
	setInfo(null, ActionType.CREATE)
}

const dialogVisable = ref(false)
const selectRole = ref('')
const { getRoleList } = useRoleGetters()
const { reqGetRoleList } = useRoleActions()
reqGetRoleList()
// 打开分配角色面板
const openRoleAssignPanel = (row: UserItem) => {
	curUserInfo.value = { ...row }
	selectRole.value = row.roleId as unknown as string
	dialogVisable.value = true
}
// 分配角色
const handleAssignRole = async () => {
	if (selectRole.value) {
		const resp = await userApi.reqAssignRole({
			userId: curUserInfo.value?.id!,
			roleId: selectRole.value
		})
		ElMessage.success(resp.msg)
	}
	refs.pageContentRef?.fetchData()
	dialogVisable.value = false
}
</script>

<template>
	<div class="user-contaier container">
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
					@click="openRoleAssignPanel(row)"
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

		<!-- 抽屉 -->
		<JcDrawer
			v-model="drawerVisable"
			size="500px"
			:title="drawerTitle">
			<JcForm
				v-model="curUserInfo"
				v-bind="userFormConfig"
				@submit="handleSubmit"></JcForm>
		</JcDrawer>

		<JcDialog
			v-model="dialogVisable"
			title="分配角色">
			<el-radio-group v-model="selectRole">
				<el-radio
					:value="role.id"
					v-for="role in getRoleList"
					:key="role.id"
					>{{ role.roleNickname }}</el-radio
				>
			</el-radio-group>
			<template #footer>
				<el-button @click="dialogVisable = false">取消</el-button>
				<el-button
					@click="handleAssignRole"
					type="primary"
					>确定</el-button
				>
			</template>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.user-container {
	width: 100%;
}
.img-box {
	margin: auto;
	width: 40px;
	height: 40px;
	border: 1px solid var(--border-color);
	border-radius: 50%;
	overflow: hidden;
}
</style>
