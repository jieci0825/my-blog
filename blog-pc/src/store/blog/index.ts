import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { QueryBlogItem } from './type'

export const piniaBlogStore = defineStore('blog', () => {
	const queryBlogListState = ref<QueryBlogItem[]>([])

	const setQueryBlogListState = (data: QueryBlogItem[]) => {
		queryBlogListState.value = data
	}

	return {
		queryBlogListState,
		setQueryBlogListState
	}
})
