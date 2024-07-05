<script setup lang="ts">
import { useInit } from './hooks'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

useInit()
</script>

<template>
	<el-config-provider :locale="zhCn">
		<router-view></router-view>
	</el-config-provider>
</template>
