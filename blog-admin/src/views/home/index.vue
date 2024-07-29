<script setup lang="ts">
import { useUserActions, useUserGetters } from '@/store'

const { getUserInfo } = useUserGetters()
const { setUserInfo } = useUserActions()

const handleClick = () => {
	const data = {
		id: 1,
		nickname: '劫辞1111',
		account: 'coderjc',
		description: '前端领域的学习者，网络上的旅行者，生活中的自闭者！',
		email: 'coderjc@qq.com',
		sign: '山林不像四季起誓，荣枯随缘',
		status: 1,
		avatarUrl: 'https://cos.coderjc.cn/my-resource/avatar.webp',
		roleId: 1
	}
	setUserInfo(data)
}
</script>

<template>
	<div class="home-contaianer container">
		<h1>home</h1>
		<pre>
			{{ JSON.stringify(getUserInfo, null, 2) }}
		</pre
		>
		<div>
			<el-button
				type="primary"
				@click="handleClick"
				>修改</el-button
			>
		</div>
	</div>
</template>

<style scoped></style>
