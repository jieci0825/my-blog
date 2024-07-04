export default [
	{
		path: '/',
		name: 'layout',
		component: () => import('@/views/layout/index.vue'),
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页'
				}
			},
			{
				path: 'blog',
				name: 'blog',
				component: () => import('@/views/blog/index.vue'),
				meta: {
					title: '网络日志'
				}
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/views/not-found/index.vue'),
		meta: {
			title: '404'
		}
	}
]
