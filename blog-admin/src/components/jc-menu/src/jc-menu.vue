<script setup lang="ts">
import { JcMenuProps } from './jc-menu'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import JcMenuItem from './jc-menu-item.vue'
import { getAncestorNodes } from '@/utils'
import { useUserGetters } from '@/store'

defineOptions({ name: 'JcMenu' })
const route = useRoute()
const props = withDefaults(defineProps<JcMenuProps>(), {
	menuList: () => [],
	isCollapse: false
})

const currentPath = computed(() => route.path)

const { getUserMenuList } = useUserGetters()

const ancestors = computed(() => {
	const result = getAncestorNodes(getUserMenuList.value, route.meta.name, 'menuName')
	return result ? result : []
})
</script>

<template>
	<el-menu
		:unique-opened="true"
		:collapse="props.isCollapse"
		active-text-color="var(--primary-color)"
		background-color="var(--aside-bg-color)"
		class="el-menu-vertical-demo"
		:default-active="`${route.meta.id}`">
		<JcMenuItem
			:menu-list="props.menuList"
			:ancestors="ancestors"
			:current-path="currentPath"></JcMenuItem>
	</el-menu>
</template>

<style scoped lang="less"></style>
