<script setup lang="ts"></script>

<template>
	<div class="sidebar"></div>
</template>

<style scoped lang="less">
.sidebar {
	flex-shrink: 0;
	width: 300px;
	margin-right: auto;
	@media (max-width: @size-md) {
		display: none;
	}
	.sticky {
		position: sticky;
		top: 20px;
	}
}
</style>
