<script setup lang="ts">
import { computed, inject } from 'vue'
import type { TocItemWrapProps } from './toc.type'
import { TocKey } from './constants'

defineOptions({ name: 'TocItemWrap' })

const tocInject = inject(TocKey, undefined)
const props = defineProps<TocItemWrapProps>()

const currentRetract = computed(() => {
	return props.tocItem.level
})

const handleClick = (evt: MouseEvent) => {
	tocInject?.clickEvent(props.tocItem, evt)
}
</script>

<template>
	<div class="toc-item-wrap">
		<div
			@click="handleClick"
			class="toc-item"
			:style="{ paddingLeft: ` ${currentRetract}em` }">
			{{ props.tocItem.label }}
		</div>
		<template v-if="props.tocItem.children">
			<TocItemWrap
				:toc-item="toc"
				v-for="toc in props.tocItem.children"
				:key="toc.label"></TocItemWrap>
		</template>
	</div>
</template>

<style scoped lang="less">
.toc-item-wrap {
	width: 100%;
	.toc-item {
		line-height: 24px;
		font-size: 15px;
		width: 100%;
		color: var(--text-color-3);
		align-items: center;
		.one-omit();
		cursor: pointer;
		transition: color 0.25s;
		&:hover {
			color: var(--primary-color);
		}
	}
}
</style>
