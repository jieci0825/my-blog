<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener, useTheme } from '@/hooks'
import { useGlobalActions } from '@/store'
import { RefreshRight, Sunny, Moon, FullScreen, Setting, Close } from '@element-plus/icons-vue'

const size = 22
const { isDark, switchTheme } = useTheme()
const { handleRefresh } = useGlobalActions()

const isFullScreen = ref(false)
const switchFullScreen = () => {
	if (isFullScreen.value) {
		document.exitFullscreen()
	} else {
		document.documentElement.requestFullscreen()
	}
	isFullScreen.value = !isFullScreen.value
}

useEventListener(document, 'fullscreenchange', () => {
	isFullScreen.value = !!document.fullscreenElement
})
</script>

<template>
	<div class="layout-action-box">
		<!-- refresh -->
		<div class="action-item">
			<el-icon
				:size="size"
				@click="handleRefresh">
				<RefreshRight />
			</el-icon>
		</div>
		<!-- theme -->
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
		<!-- full screen -->
		<div class="action-item">
			<el-icon
				:size="size"
				@click="switchFullScreen">
				<FullScreen v-if="!isFullScreen" />
				<Close v-else />
			</el-icon>
		</div>
		<!-- setting -->
		<div class="action-item">
			<el-icon :size="size">
				<Setting />
			</el-icon>
		</div>
	</div>
</template>

<style scoped lang="less">
.layout-action-box {
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 20px;
	height: 100%;
	.action-item {
		cursor: pointer;
	}
}
</style>
