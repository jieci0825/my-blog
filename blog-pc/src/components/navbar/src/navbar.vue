<script setup lang="ts">
import NavScreen from './nav-screen.vue'
import NavbarActions from './navbar-actions.vue'
import { useRouter, useRoute } from 'vue-router'
import type { NavbarEmits, NavbarMenuItem } from './navbar.type'
import { computed, ref } from 'vue'
import { useEventListener } from '@/hooks'
import { debounce } from '@/utils'

const navbarMenu: NavbarMenuItem[] = [
	{
		label: '首页',
		path: '/home'
	},
	{
		label: '网络日志',
		path: '/blog'
	},
	{
		label: '友人链',
		path: '/message'
	},
	{
		label: '关于我',
		path: '/about'
	}
]

const emits = defineEmits<NavbarEmits>()

const $router = useRouter()
const $route = useRoute()
const currentPath = computed(() => {
	return $route.path
})

const isCloesd = ref(false)

const jumpPage = (path: string) => {
	$router.push(path)
	if (isCloesd.value) {
		isCloesd.value = false
	}
}

const toggleMenuStatus = () => {
	isCloesd.value = !isCloesd.value
}

const onSize = debounce((e: any) => {
	const target = e.target!
	if (target.innerWidth >= 768) {
		isCloesd.value = false
	}
}, 100)

useEventListener(window, 'resize', onSize)
</script>

<template>
	<div class="navbar">
		<div class="wrapper">
			<div class="container">
				<!-- title -->
				<div
					class="title"
					@click="jumpPage('/home')">
					<JcLogo />
					<span>劫辞</span>
				</div>
				<!-- search -->
				<div
					class="search"
					@click="emits('openDosearch')">
					<span class="iconfont icon-search"></span>
					<span class="dosearch-btn-keys"> <kbd>Ctrl</kbd> + <kbd>K</kbd> </span>
				</div>
				<!-- menu -->
				<div class="content">
					<div class="navbar-menu">
						<div
							:class="['menu-item', { active: item.path === currentPath }]"
							v-for="item in navbarMenu"
							:key="item.path">
							<a
								href="javascript:void(0);"
								@click="jumpPage(item.path)"
								>{{ item.label }}</a
							>
						</div>
					</div>
				</div>
				<div class="hamburger-wrap">
					<div
						:class="['hamburger-btn', { closed: isCloesd }]"
						@click="toggleMenuStatus">
						<div class="line"></div>
						<div class="line"></div>
						<div class="line"></div>
					</div>
				</div>
				<NavbarActions></NavbarActions>
			</div>
		</div>
		<NavScreen
			@jumpPage="jumpPage"
			:visible="isCloesd"
			:navMenuList="navbarMenu"></NavScreen>
	</div>
</template>

<style scoped lang="less">
.navbar {
	width: 100%;
	height: 100%;
	background-color: var(--bg-color);
	.wrapper {
		padding: 0 30px;
		width: 100%;
		height: 100%;
		@media (max-width: @size-sm) {
			padding: 0 8px 0 24px;
		}
		.container {
			margin: 0 auto;
			max-width: var(--center-width);
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			@media (max-width: @size-sm) {
				:deep(.el-dialog) {
					width: 90vw !important;
				}
			}
			.title {
				user-select: none;
				height: 100%;
				width: fit-content;
				display: flex;
				align-items: center;
				font-size: 22px;
				@media (max-width: @size-xs) {
					font-size: 18px;
				}
				svg {
					width: 1.2em;
					height: 1.2em;
					fill: var(--primary-color);
				}
				span {
					color: var(--primary-color);
					margin-left: 10px;
					font-family: '阿里妈妈东方大楷 Regular';
				}
			}
			.search {
				cursor: pointer;
				margin: 0 20px;
				color: var(--text-color-5);
				display: flex;
				align-items: center;
				gap: 10px;
				transition: color 0.25s ease-in;
				&:hover {
					color: var(--primary-color);
					.dosearch-btn-keys {
						border-color: var(--primary-color);
					}
				}
				.iconfont {
					font-size: 20px;
					font-weight: bold;
				}
				.dosearch-btn-keys {
					font-weight: bold;
					transition: border 0.25s ease-in, color 0.25s ease-in;
					border-radius: var(--base-b-r);
					border: 1px solid var(--border-color);
					padding: 3px 8px;
					@media (max-width: @size-sm) {
						display: none;
					}
				}
				@media (max-width: @size-sm) {
					margin: 0 10px 0 auto;
				}
			}
			.hamburger-wrap {
				display: none;
				@media (max-width: @size-sm) {
					display: block;
				}
				.hamburger-btn {
					width: 50px;
					height: 50px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.line {
						width: 25px;
						height: 3px;
						background-color: var(--text-color-5);
						border-radius: 6px;
						margin: 3px 0;
						transition: all 0.25s ease-in-out;
					}
					&.closed {
						.line {
							&:nth-child(1) {
								transform: translateY(10px) rotate(45deg);
							}
							&:nth-child(2) {
								opacity: 0;
							}
							&:nth-child(3) {
								transform: translateY(-8px) rotate(-45deg);
							}
						}
					}
				}
			}
			.content {
				height: 100%;
				flex: 1;
				display: flex;
				align-items: center;
				@media (max-width: @size-sm) {
					display: none;
				}
				.navbar-menu {
					height: 100%;
					margin-left: auto;
					display: flex;
					align-items: center;
					.menu-item {
						padding: 0 12px;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-weight: 600;
						position: relative;
						color: var(--text-color-2);
						font-size: 16px;
						&.active {
							color: var(--primary-color);
							&::before {
								display: block;
							}
						}
						&::before {
							content: '';
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 2px;
							background-color: var(--primary-color);
							display: none;
						}
						&:hover {
							color: var(--primary-color);
						}
						a {
							text-decoration: none;
						}
					}
				}
			}
		}
	}
}
</style>
