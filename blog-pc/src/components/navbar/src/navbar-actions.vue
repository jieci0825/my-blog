<script setup lang="ts">
import { useChangeFont } from '@/hooks'

const { isFontBeautify } = useChangeFont()
</script>

<template>
	<div class="actions">
		<div class="action-item">
			<el-switch
				v-model="isFontBeautify"
				inline-prompt
				active-text="Font"
				inactive-text="Font" />
			<el-tooltip>
				<template #content>
					如果您的设备使用美化字体导致不清晰或者不喜欢当前字体，您可以关闭它，使用系统默认字体</template
				>
				<span class="iconfont icon-help"></span>
			</el-tooltip>
		</div>
	</div>
</template>

<style scoped lang="less">
.actions {
	margin-left: 10px;
	padding-left: 20px;
	border-left: 2px solid var(--border-color);
	height: 40%;
	display: flex;
	align-items: center;
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
