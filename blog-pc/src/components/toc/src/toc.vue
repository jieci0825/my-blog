<script setup lang="ts">
import { watch, ref, provide } from 'vue'
import type { TocItem, TocNode, TocProps, TocEmits } from './toc.type'
import TocItemWrap from './toc-item-wrap.vue'
import { TocKey } from './constants'

const props = withDefaults(defineProps<TocProps>(), {
	title: 'On this page',
	isMarker: true
})
const emits = defineEmits<TocEmits>()

const _tocList = ref<TocNode[]>([])
watch(
	() => props.tocList,
	() => {
		formatData(props.tocList, 0)
	},
	{
		deep: true,
		immediate: true
	}
)

// 格式化数据
function formatData(data: TocItem[], level: number) {
	function _deep(data: TocItem[], level: number) {
		const result = data.map(toc => {
			const tocNode: TocNode = {
				...toc,
				level,
				isLeaf: !toc.children?.length,
				raw: toc,
				children: null
			}
			if (toc.children?.length) {
				tocNode.children = _deep(toc.children, level + 1)
			}

			return tocNode
		})
		return result
	}
	_tocList.value = _deep(data, level)
}

const handleClick = (toc: TocNode, evt: MouseEvent) => {
	emits('click', toc.raw, evt)
}

provide(TocKey, {
	clickEvent: handleClick
})
</script>

<template>
	<div class="toc">
		<div class="toc-title">{{ props.title }}</div>
		<div class="toc-content">
			<TocItemWrap
				v-for="toc in _tocList"
				:toc-item="toc"
				:key="toc.label"></TocItemWrap>
		</div>
	</div>
</template>

<style scoped lang="less">
.toc {
	width: 100%;

	.toc-title {
		font-weight: 600;
		margin-bottom: 10px;
		color: var(--text-color-2);
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 5px;
		font-size: 18px;
	}

	.toc-content {
		width: 100%;
	}
}
</style>
