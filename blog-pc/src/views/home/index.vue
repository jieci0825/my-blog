<script setup lang="ts">
import HomeHero from './components/home-hero.vue'
import HomeFooter from './components/home-footer.vue'
import HomeRecommend from './components/home-recommend.vue'
</script>

<template>
	<div class="home-container">
		<HomeHero></HomeHero>
		<HomeRecommend></HomeRecommend>
		<HomeFooter></HomeFooter>
	</div>
</template>

<style scoped lang="less">
.home-container {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
	--home-padding: 64px;
	--home-sm-padding: 24px;
	--home-max-width: 1080px;
}
</style>
