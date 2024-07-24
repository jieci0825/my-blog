import { DEFAULT_INDEX_ROUTE_NAME } from '@/constants'
import type { RouteRecordRaw } from 'vue-router'

const routeDynamic: RouteRecordRaw[] = [
	{
		path: '/home',
		name: DEFAULT_INDEX_ROUTE_NAME,
		meta: {
			closable: false
		},
		component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
	},
	{
		path: '/role',
		name: 'role',
		component: () => import(/* webpackChunkName: "role" */ '@/views/role/index.vue')
	},
	{
		path: '/user',
		name: 'user',
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/index.vue')
	},
	{
		path: '/tag',
		name: 'tag',
		component: () => import(/* webpackChunkName: "tag" */ '@/views/tag/index.vue')
	},
	{
		path: '/blog',
		name: 'blog',
		redirect: '/blog/list'
	},
	{
		path: '/blog/list',
		name: 'blog-list',
		component: () => import(/* webpackChunkName: "blog-list" */ '@/views/blog/blog-list/index.vue')
	},
	{
		path: '/blog/category',
		name: 'blog-category',
		component: () => import(/* webpackChunkName: "blog-category" */ '@/views/blog/blog-category/index.vue')
	},
	{
		path: '/blog/publish',
		name: 'blog-publish',
		component: () => import(/* webpackChunkName: "blog-publish" */ '@/views/blog/blog-publish/index.vue')
	},
	{
		path: '/friend-chain',
		name: 'friend-chain',
		component: () => import(/* webpackChunkName: "friend-chain" */ '@/views/friend-chain/index.vue')
	},
	{
		path: '/about',
		name: 'about',
		component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
	},
	{
		path: '/my-center',
		name: 'my-center',
		component: () => import(/* webpackChunkName: "my-center" */ '@/views/my-center/index.vue')
	}
]

export default routeDynamic
