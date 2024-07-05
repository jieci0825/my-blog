<script setup lang="ts">
import { useEventListener } from '@/hooks'
import { ref } from 'vue'

const anaInfo = ref({
	content: '你无法靠逃避生活来获得真正的平静。',
	from: '---《时时刻刻》'
})

const anaRef = ref<HTMLDivElement | null>(null)

useEventListener(anaRef, 'contextmenu', (event: MouseEvent) => {
	event.preventDefault()
	const target = anaRef.value!
	navigator.clipboard
		.writeText(target.textContent!)
		.then(() => {
			ElMessage.success('复制成功')
		})
		.catch(() => {
			ElMessage.success('复制失败')
		})
})

useEventListener(anaRef, 'click', () => {
	// todo: 请求下一句每日一言
})
</script>

<template>
	<div class="home-footer">
		<div
			class="ana"
			ref="anaRef">
			<div
				class="ana-text"
				title="点击左键切换，右键复制">
				「 {{ anaInfo.content }} 」
			</div>
			<div class="ana-from">
				{{ anaInfo.from }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-footer {
	margin-top: auto;
	border-top: 1px solid var(--border-color);
	flex-shrink: 0;
	padding: 20px 0;
	text-align: center;
	color: var(--text-color-5);
	line-height: 20px;
	font-size: 14px;
}
</style>
