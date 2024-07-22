<script setup lang="ts">
import { useTheme } from '@/hooks'
import { useGlobalActions } from '@/store'
import { RefreshRight, Sunny, Moon } from '@element-plus/icons-vue'

const size = 25
const { isDark, switchTheme } = useTheme()
const { handleRefresh } = useGlobalActions()
</script>

<template>
	<div class="layout-action-box">
		<div class="action-item">
			<el-icon
				:size="size"
				@click="handleRefresh">
				<RefreshRight />
			</el-icon>
		</div>
		<div class="action-item">
			<el-icon :size="size">
				<Sunny
					@click="switchTheme('dark', true)"
					v-if="!isDark" />
				<Moon
					@click="switchTheme('light', true)"
					v-else />
			</el-icon>
		</div>
	</div>
</template>

<style scoped lang="less">
.layout-action-box {
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 10px;
	height: 100%;
	.action-item {
		cursor: pointer;
	}
}
</style>
