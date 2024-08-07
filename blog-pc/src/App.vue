<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useInit } from './hooks'
import { ElConfigProvider } from 'element-plus'
import { useGlobalActions, useGlobalGetters } from '@/store'

useInit()

const { getRouteAnimation } = useGlobalGetters()
const { reqGetSiteHomeInfo } = useGlobalActions()
reqGetSiteHomeInfo()
</script>

<template>
	<el-config-provider :locale="zhCn">
		<router-view v-slot="{ Component }">
			<Transition
				:name="getRouteAnimation"
				mode="out-in">
				<Component :is="Component" />
			</Transition>
		</router-view>
	</el-config-provider>
</template>
