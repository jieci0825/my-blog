import type { QueryBlogCondition } from '@/apis/modules/blog/type'
import { piniaBlogStore } from '../blog'
import { QueryBlogItem } from '../blog/type'
import { computed } from 'vue'

export const useBlogGetters = () => {
	const blogStore = piniaBlogStore()

	const queryBlogListState = computed(() => blogStore.queryBlogListState)

	return {
		queryBlogListState
	}
}

export const useBlogActions = () => {
	const { setQueryBlogListState } = piniaBlogStore()

	// 获取查询的博客列表
	const getQueryBlogList = (
		condition: QueryBlogCondition = {
			page: 1,
			pageSize: 20,
			keyword: ''
		}
	) => {
		// todo: 更换为真实的请求
		const data: QueryBlogItem[] = [
			{ id: 1, title: '如何提高编程效率-1' },
			{ id: 2, title: '掌握JavaScript技巧-1' },
			{ id: 3, title: '深入理解Node.js-1' },
			{ id: 4, title: '前端开发最佳实践-1' },
			{ id: 5, title: '学习TypeScript的好处-1' },
			{ id: 6, title: '快速入门React框架-1' },
			{ id: 7, title: 'Vue.js的核心概念-1' },
			{ id: 8, title: '现代Web开发工具-1' },
			{ id: 9, title: '打造高性能网站-1' },
			{ id: 10, title: 'CSS布局的深入探讨-1' },
			{ id: 11, title: '响应式设计的技巧-1' },
			{ id: 12, title: 'Webpack的优化策略-1' },
			{ id: 13, title: '利用Docker进行部署-1' },
			{ id: 14, title: 'MongoDB的使用心得-1' },
			{ id: 15, title: '掌握Git版本控制-1' },
			{ id: 16, title: 'API设计的最佳实践-1' },
			{ id: 17, title: '测试驱动开发的优势-1' },
			{ id: 18, title: '构建现代化Web应用-1' },
			{ id: 19, title: '提升用户体验的技巧-1' },
			{ id: 20, title: '安全性在Web开发中的重要性-1' },
			{ id: 21, title: '使用GraphQL的优势-1' },
			{ id: 22, title: '前端性能优化技巧-1' },
			{ id: 23, title: '学习正则表达式的技巧-1' },
			{ id: 24, title: '微服务架构的设计原则-1' },
			{ id: 25, title: '了解RESTful API设计-1' },
			{ id: 26, title: 'Node.js性能调优技巧-1' },
			{ id: 27, title: '掌握DevOps的核心概念-1' },
			{ id: 28, title: '代码质量和可维护性-1' },
			{ id: 29, title: 'Kubernetes的使用实例-1' },
			{ id: 30, title: '从零开始学前端开发-1' }
		]
		setTimeout(() => {
			if (condition.keyword === undefined || !condition.keyword.length) return setQueryBlogListState([])

			const result = data.filter(item => item.title.includes(condition.keyword!))
			setQueryBlogListState(result)
		}, 0)
	}

	// 清空搜索blog列表
	const clearQueryBlogList = () => setQueryBlogListState([])

	return {
		getQueryBlogList,
		clearQueryBlogList
	}
}
