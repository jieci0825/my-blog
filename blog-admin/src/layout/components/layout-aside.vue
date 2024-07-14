<script setup lang="ts">
import JcMenu from '@/components/jc-menu'

import { useUserGetters } from '@/store'

const { getUserMenuList } = useUserGetters()
</script>

<template>
	<div class="aside-top">
		<div class="logo-box">
			<div class="logo">
				<img src="/logo.svg" />
			</div>
			<span class="text">劫辞の博客</span>
		</div>
	</div>
	<div class="menu-box">
		<JcMenu :menu-list="getUserMenuList"></JcMenu>
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
	.logo-box {
		user-select: none;
		width: 100%;
		height: 60%;
		border-radius: 4px;
		display: flex;
		align-items: center;
		font-size: 24px;
		cursor: pointer;
		.logo {
			width: 1.4em;
			height: 1.4em;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.text {
			font-family: 'hanyiqingzhouxing';
			font-weight: 500;
			margin-left: 10px;
			color: var(--el-color-primary);
		}
	}
}

.menu-box {
	flex: 1;
	overflow: hidden auto;
	&::-webkit-scrollbar {
		width: 0;
	}
	:deep(.el-menu) {
		border-right: none;
		user-select: none;
		--el-menu-text-color: var(--text-color-3) !important;
		.el-sub-menu,
		.el-menu-item {
			margin-bottom: 5px;
			border-radius: 4px;
			overflow: hidden;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.el-menu-item {
			&:hover {
				background-color: var(--el-color-primary-light-8);
				color: var(--el-color-primary);
			}
			&.is-active {
				background-color: var(--el-color-primary-light-8);
			}
		}
		.el-sub-menu {
			&.is-active {
				.el-sub-menu__title {
					color: var(--el-color-primary) !important;
				}
			}
			.el-sub-menu__title {
				margin-bottom: 0;
				&:hover {
					background-color: var(--el-color-primary-light-8);
					color: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
