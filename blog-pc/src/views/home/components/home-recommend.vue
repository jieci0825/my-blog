<script setup lang="ts">
import { ref } from 'vue'

const recommendList = ref([1, 2, 3, 4, 5])
</script>

<template>
	<div class="home-recommend">
		<div class="container">
			<div
				class="item-wrap"
				v-for="(item, index) in recommendList"
				:key="index">
				<a href="#">
					<div class="box">
						<h2 class="title">我是-- {{ item }} --号</h2>
						<p class="details">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, adipisci!</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-recommend {
	width: 100%;
	padding: 0 var(--home-padding);
	display: flex;
	@media (max-width: @size-sm) {
		padding: var(--home-sm-padding);
	}
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		max-width: var(--home-max-width);
		margin: 0 auto;
		.item-wrap {
			padding: 8px;
			width: calc(100% / 3);
			@media (max-width: @size-sm) {
				width: 100%;
				padding: 8px 0;
			}
			a {
				touch-action: manipulation;
				width: 100%;
				height: 100%;
				display: block;
				border: 1px solid transparent;
				transition: border-color 0.25s, background-color 0.25s;
				border-radius: 6px;
				background-color: var(--bg-color-1);
				text-decoration: none;
				&:hover {
					border-color: var(--primary-color);
				}
				.box {
					display: flex;
					flex-direction: column;
					padding: 24px;
					height: 100%;
					color: var(--text-color-2);
					.title {
						line-height: 24px;
						font-size: 16px;
						font-weight: 600;
					}
					.details {
						flex-grow: 1;
						padding-top: 8px;
						line-height: 24px;
						font-size: 14px;
						font-weight: 500;
						color: var(--text-color-3);
					}
				}
			}
		}
	}
}
</style>
