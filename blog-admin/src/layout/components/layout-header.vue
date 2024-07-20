<script setup lang="ts">
import LayoutFlex from './layout-flex.vue'
</script>

<template>
	<div class="layout-header-wrapper">
		<!-- top -->
		<div class="header-top">
			<LayoutFlex></LayoutFlex>
		</div>

		<!-- bottom -->
		<div class="header-bootom"></div>
	</div>
</template>

<style scoped lang="less">
.layout-header-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: var(--bg-color);
	padding: 0 20px;
	.header-top {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
	}
}
</style>
