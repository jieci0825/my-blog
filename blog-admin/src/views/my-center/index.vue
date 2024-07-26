<script setup lang="ts">
import BoxWrap from './components/box-wrap.vue'
import JcUpload from '@/components/jc-upload/src/jc-upload.vue'
import { useUserActions, useUserGetters } from '@/store'
import { ref } from 'vue'
import { userApi } from '@/apis'
import { uploadFile } from '@/cos'
import type { BoxItem } from './types'
import type { UserItem } from '@/apis/modules/user/type'

const { getUserInfo } = useUserGetters()
const { reqGetUserInfo } = useUserActions()

const avatarVisable = ref(false)
const avatarData = ref()
let curAvatarUrl = ''
const handleAvatar = (row: BoxItem) => {
	avatarVisable.value = true
	curAvatarUrl = row.content
}
const confirmUpdateAvatar = async () => {
	if (!avatarData.value) return
	const resp = await uploadFile(avatarData.value)
	const data = Object.assign({}, getUserInfo.value, { avatarUrl: resp.url })
	await reqEditUserInfo(data)
}

const handlePassword = (row: BoxItem) => {
	console.log(row)
}

const handleSave = async (content: string, row: BoxItem, done?: Function) => {
	const data = Object.assign({}, getUserInfo.value, { [row.key]: content })
	await reqEditUserInfo(data)
	done && done()
}

async function reqEditUserInfo(data: UserItem) {
	const resp = await userApi.reqEditUserInfo(data)
	ElMessage.success(resp.msg)
	reqGetUserInfo()
}

const myInfoList: BoxItem[] = [
	{
		label: '头像',
		key: 'avatarUrl',
		content: getUserInfo.value?.avatarUrl,
		slotOpt: { defalutSlot: 'avatar' },
		operateCallback: handleAvatar
	},
	{ label: '昵称', key: 'nickname', content: getUserInfo.value?.nickname },
	{ label: '个性签名', key: 'sign', content: getUserInfo.value?.sign },
	{ label: '个人简介', key: 'description', content: getUserInfo.value?.description }
]
const accountInfoList: BoxItem[] = [
	{ label: '账号', key: 'account', content: getUserInfo.value?.account },
	{ label: '邮箱', key: 'email', content: getUserInfo.value?.email },
	{
		label: '密码',
		key: 'password',
		content: '********',
		operateCallback: handlePassword,
		operateText: { editText: '修改密码' }
	}
]
</script>

<template>
	<div class="my-center-container container">
		<BoxWrap
			:list="myInfoList"
			@save="handleSave">
			<template #avatar="{ row }">
				<el-avatar
					:size="60"
					:src="row.content" />
			</template>
		</BoxWrap>
		<BoxWrap
			:list="accountInfoList"
			@save="handleSave">
			<template #avatar="{ row }">
				<el-avatar
					:size="60"
					:src="row.content" />
			</template>
		</BoxWrap>

		<!-- 更换头像 -->
		<JcDialog
			v-model="avatarVisable"
			width="400"
			title="更换头像">
			<div class="avatar-content">
				<JcUpload
					v-model="avatarData"
					:initPreviewImage="curAvatarUrl"
					model="one"></JcUpload>
				<el-button
					type="primary"
					@click="confirmUpdateAvatar"
					>确认</el-button
				>
			</div>
		</JcDialog>
		<!-- 修改密码 -->
	</div>
</template>

<style scoped lang="less">
.my-center-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	:deep(.box) {
		max-width: 800px;
	}
	.avatar-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
