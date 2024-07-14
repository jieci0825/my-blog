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
	menuList: () => []
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
		active-text-color="var(--primary-color)"
		background-color="var(--bg-color)"
		class="el-menu-vertical-demo"
		:default-active="`${route.meta.id}`"
		text-color="#6e6e6e">
		<JcMenuItem
			:menu-list="props.menuList"
			:ancestors="ancestors"
			:current-path="currentPath"></JcMenuItem>
	</el-menu>
</template>

<style scoped lang="less"></style>
