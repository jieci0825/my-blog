<script setup lang="ts">
import tagTableConfig from './config/tag-table.config'
import tagSearchFormConfig from './config/tag-search-form.config'
import tagFormConfig from './config/tag-form.config'
import { tagApi } from '@/apis'
import { ActionType } from './types'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import type { CreateTagParams, TagItem } from '@/apis/modules/tag/type'

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const curTagInfo = ref<TagItem | CreateTagParams>()
const modeTitleMap = {
	[ActionType.CREATE]: '创建标签-多标签,隔开',
	[ActionType.EDIT]: '编辑标签信息'
}

function setInfo(row: TagItem | null, mode: ActionType, isVisable: boolean = true) {
	curTagInfo.value = row ? { ...row } : ({} as TagItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleCreateTag = () => {
	setInfo(null, ActionType.CREATE)
}

const handleTableEdit = (row: TagItem) => {
	setInfo(row, ActionType.EDIT)
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: TagItem) => {
	let resp: any = undefined
	if (curAction.value === ActionType.CREATE) {
		const tagNames = data.tagName.split(',')
		resp = await tagApi.reqCreateTag({ tagNames })
	} else {
		resp = await tagApi.reqEditTag(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refs.tagPageContentRef?.fetchData()
}

const usePageContent = {
	request: tagApi.reqGetTagList
}
</script>

<template>
	<div class="blog-tag-container container">
		<PageContent
			:ref="setRef('tagPageContentRef')"
			@handleTableEdit="handleTableEdit"
			@actCreate="handleCreateTag"
			:use-page-content="usePageContent"
			:form-config="tagSearchFormConfig"
			:tableConfig="tagTableConfig"
			:paginator-config="{}">
		</PageContent>

		<JcDialog
			v-model="dialogVisable"
			:title="diaglogTitle">
			<JcForm
				@submit="handleSubmit"
				v-model="curTagInfo"
				v-bind="tagFormConfig"></JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less"></style>
