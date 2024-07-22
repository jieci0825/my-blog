<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import LayoutHeader from './components/layout-header.vue'
import LayoutAside from './components/layout-aside.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useGlobalGetters } from '@/store'

const { getCollapse, getRefresh } = useGlobalGetters()

const asideWidth = computed(() => {
	return getCollapse.value ? '84px' : '240px'
})

const refresh = ref(true)
watch(
	() => getRefresh.value,
	() => {
		refresh.value = false
		nextTick(() => {
			refresh.value = true
		})
	}
)
</script>

<template>
	<el-container class="layout-container">
		<el-aside
			:width="asideWidth"
			class="layout-aside">
			<LayoutAside></LayoutAside>
		</el-aside>
		<el-container>
			<el-header class="layout-header">
				<LayoutHeader></LayoutHeader>
			</el-header>
			<el-main class="layout-main">
				<el-config-provider :locale="zhCn">
					<!-- <router-view
						v-if="true"
						v-slot="{ Component }">
						<keep-alive include="PublishDucument">
							<Component :is="Component" />
						</keep-alive>
					</router-view> -->

					<router-view v-if="refresh"></router-view>
				</el-config-provider>
			</el-main>
		</el-container>
	</el-container>
</template>

<style scoped lang="less">
.layout-container {
	height: 100vh;
	background-color: var(--bg-color-1);
	position: relative;
	.layout-aside {
		padding: 10px;
		padding-top: 0;
		display: flex;
		flex-direction: column;
		height: 100vh;
		box-shadow: 2px 0 12px #1d23290d;
		border-right: none;
		z-index: 1;
		transition: width 0.3s;
		background-color: var(--aside-bg-color);
	}

	.layout-header {
		padding: 0;
		height: 100px;
		border-bottom: 1px solid var(--border-color);
	}

	.layout-main {
		margin: 10px;
		border-radius: var(--base-b-r);
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		overflow: hidden;
	}
}
</style>
