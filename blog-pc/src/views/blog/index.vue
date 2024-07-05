<script setup lang="ts">
import BlogSidebar from './components/blog-sidebar.vue'
import BlogContent from './components/blog-content.vue'
</script>

<template>
	<div class="blog-container">
		<div class="contianer">
			<BlogContent></BlogContent>
			<BlogSidebar></BlogSidebar>
		</div>
	</div>
</template>

<style scoped lang="less">
.blog-container {
	width: 100%;
	padding: 20px;

	.contianer {
		margin: 0 auto;
		max-width: var(--center-width);
		display: flex;
		gap: 20px;
	}

	@media (max-width: @size-xs) {
		padding: 10px 0;
		overflow: hidden auto;
	}
}
</style>
