<script setup lang="ts">
import { userApi } from '@/apis'
import userTableConfig from './config/user-table.config'
import userFormConfig from './config/user-form.config'
</script>

<template>
	<PageContent
		:use-page-content="{ request: userApi.reqGetUserList }"
		:form-config="userFormConfig"
		:tableConfig="userTableConfig"
		:paginator-config="{}"></PageContent>
</template>
