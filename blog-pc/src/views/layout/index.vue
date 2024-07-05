<script setup lang="ts">
import { ref } from 'vue'
import Dosearch from '@/components/dosearch'
import Navbar from '@/components/navbar'
import { useEventListener } from '@/hooks'

const visibleDosearch = ref(false)

useEventListener(document, 'keydown', (evt: KeyboardEvent) => {
	if (evt.ctrlKey && evt.key === 'k') {
		evt.preventDefault()
		visibleDosearch.value = true
	}
})
</script>

<template>
	<div class="layout-container">
		<div class="header-area">
			<Navbar @open-dosearch="visibleDosearch = true"></Navbar>
		</div>
		<div class="main-area">
			<router-view></router-view>
		</div>
	</div>

	<!-- dosearch -->
	<Dosearch v-model:visible="visibleDosearch"></Dosearch>

	<el-backtop
		target=".main-area"
		:right="30"
		:bottom="30" />
</template>

<style scoped lang="less">
.layout-container {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.header-area {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		width: 100%;
		overflow: hidden;
		height: var(--header-height);
		box-shadow: var(--base-box-shadow);
	}
	.main-area {
		width: 100%;
		margin-top: var(--header-height);
		height: calc(100vh - var(--header-height));
		overflow: auto;
	}
}
</style>
