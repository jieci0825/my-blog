import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'

import routes from './routes'
import setTitle from '@/utils/set-title'

// 关闭进度条加载器
nprogress.configure({ showSpinner: false })

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

// 全局前置守卫
router.beforeEach(() => {
	// 进度条加载器
	nprogress.start()
})

// 全局后置守卫
router.afterEach(to => {
	nprogress.done()
	if (to.meta.title) {
		setTitle.setRouteTitle(to.meta.title as string)
	}
})

export default router
