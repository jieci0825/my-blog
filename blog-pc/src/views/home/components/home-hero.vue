<script setup lang="ts">
const actionList = [
	{
		name: '快速开始',
		url: '/blog',
		isPlain: false
	},
	{
		name: '留下足迹',
		url: '/about',
		isPlain: true
	}
]
</script>

<template>
	<div class="home-hero">
		<div class="container">
			<div class="main">
				<h1 class="name">Coderjc Blog</h1>
				<p class="text">前端领域学习者，记录我的学习与日常</p>
				<p class="tagline">山林不向四季起誓，荣枯随缘</p>

				<div class="actions">
					<el-button
						v-for="item in actionList"
						:key="item.name"
						type="primary"
						size="large"
						:plain="item.isPlain"
						round>
						{{ item.name }}
					</el-button>
				</div>
			</div>
			<div class="image-wrap">
				<img src="/icon.svg" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-hero {
	padding: var(--home-padding);
	padding-bottom: 50px;
	@media (max-width: @size-xs) {
		padding-left: var(--home-sm-padding);
		padding-right: var(--home-sm-padding);
	}
	.container {
		margin: 0 auto;
		display: flex;
		max-width: var(--home-max-width);
		padding: 0 8px;
		@media (max-width: @size-sm) {
			padding: 0;
		}
		.main {
			padding-right: var(--home-padding);
			font-family: '阿里妈妈东方大楷 Regular';
			letter-spacing: -0.4px;
			.name {
				font-size: 50px;
				color: var(--primary-color);
			}
			.text {
				font-size: 42px;
				margin-top: 10px;
				color: var(--text-color-2);
			}
			.tagline {
				margin-top: 15px;
				font-size: 20px;
				color: var(--text-color-5);
			}
			.actions {
				margin-top: 30px;
				display: flex;
				flex-wrap: wrap;
				a {
					text-decoration: none;
				}
			}
		}
		.image-wrap {
			width: 240px;
			height: 240px;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		@media (max-width: @size-md) {
			position: relative;
			flex-direction: column;
			.main {
				padding-right: 0;
				margin-top: 250px;
				text-align: center;
				.actions {
					justify-content: center;
				}
			}
			.image-wrap {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		@media (max-width: @size-xs) {
			.main {
				margin-top: 180px;
				.name {
					font-size: 28px;
				}
				.text {
					font-size: 22px;
				}
				.tagline {
					font-size: 16px;
				}
				.actions {
					margin-top: 20px;
				}
			}
			.image-wrap {
				width: 160px;
				height: 160px;
			}
		}
	}
}
</style>
