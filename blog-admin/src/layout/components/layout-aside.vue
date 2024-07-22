<script setup lang="ts">
import JcMenu from '@/components/jc-menu'
import { useGlobalGetters, useUserGetters } from '@/store'
import LayoutLogo from './layout-logo.vue'
import { computed } from 'vue'

const { getUserMenuList } = useUserGetters()
const { getCollapse } = useGlobalGetters()

const showText = computed(() => !getCollapse.value)
</script>

<template>
	<div :class="['aside-top', getCollapse ? 'is-collapse' : '']">
		<LayoutLogo :show-text="showText" />
	</div>
	<div class="menu-box">
		<JcMenu
			:is-collapse="getCollapse"
			:menu-list="getUserMenuList"></JcMenu>
	</div>
</template>

<style scoped lang="less">
.aside-top {
	width: 100%;
	height: 60px;
	padding: 0 20px;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	&.is-collapse {
		justify-content: center;
		:deep(.logo-box) {
			width: 35px;
			height: 35px;
		}
	}
}

.menu-box {
	flex: 1;
	overflow: hidden auto;
	&::-webkit-scrollbar {
		width: 0;
	}
}
</style>
