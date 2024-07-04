<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()

// const
</script>

<template>
	<div class="blog-detail-container">
		<div class="container">
			<div class="sidebar"></div>
		</div>
	</div>
</template>

<style scoped lang="less">
.blog-detail-container {
	width: 100%;
	padding: 20px;
	.container {
		max-width: var(--center-width);
		margin: 0 auto;
		display: flex;
	}
}
</style>
