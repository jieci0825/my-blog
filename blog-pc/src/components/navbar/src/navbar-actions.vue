<script setup lang="ts">
import GlobalSetting from '@/components/global-setting'
import { ref } from 'vue'
import { Setting, Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '@/hooks/use-theme'
import { useGlobalActions } from '@/store'

const size = 22
const settingVisible = ref(false)

const { isDark, switchTheme } = useTheme()
const { toggleTheme } = useGlobalActions()

const handleTheme = () => {
	const _theme = isDark.value ? 'light' : 'dark'
	switchTheme(_theme, true)
	toggleTheme(_theme)
}
</script>

<template>
	<div class="actions">
		<!-- theme -->
		<div class="action-item">
			<el-icon :size="size">
				<Sunny
					@click="handleTheme"
					v-if="!isDark" />
				<Moon
					@click="handleTheme"
					v-else />
			</el-icon>
		</div>

		<!-- setting -->
		<div class="action-item">
			<el-icon
				:size="size"
				@click="settingVisible = true">
				<Setting />
			</el-icon>
		</div>
	</div>

	<!-- 设置面板 -->
	<JcDialog
		v-model="settingVisible"
		width="640px"
		title="全局设置">
		<GlobalSetting></GlobalSetting>
	</JcDialog>
</template>

<style scoped lang="less">
.actions {
	margin-left: 10px;
	padding-left: 20px;
	border-left: 2px solid var(--border-color);
	height: 40%;
	display: flex;
	align-items: center;
	gap: 20px;
	@media (max-width: @size-sm) {
		margin-left: 0;
		padding-left: 10px;
	}
	.action-item {
		display: flex;
		align-items: center;
		.iconfont {
			margin-left: 5px;
			font-size: 20px;
			color: var(--text-color-5);
			@media (max-width: @size-xs) {
				display: none;
			}
		}
	}
}
</style>
