<script setup lang="ts">
import { useGlobalGetters } from '@/store'
import LayoutVertical from './layout-mode/layout-vertical.vue'
import LayoutHorizontal from './layout-mode/layout-horizontal.vue'
import { LAYOUT_MODE } from '@/constants'
import { computed } from 'vue'

const { getLayoutMode, getRouteAnimation } = useGlobalGetters()

const compMap = {
	[LAYOUT_MODE.VERTICAL]: LayoutVertical,
	[LAYOUT_MODE.HORIZONTAL]: LayoutHorizontal
}
const comp = computed(() => compMap[getLayoutMode.value])
</script>

<template>
	<Transition
		:name="getRouteAnimation"
		mode="out-in">
		<Component :is="comp" />
	</Transition>
</template>

<style scoped lang="less"></style>
