<script setup lang="ts">
import { ref } from 'vue'
import roleTableConfig from './config/role-table.config'
import { useRoleActions, useRoleGetters } from '@/store'

const { reqGetRoleList } = useRoleActions()
const { getRoleList } = useRoleGetters()
reqGetRoleList()
</script>

<template>
	<div class="role-container"></div>
</template>

<style scoped lang="less">
.role-container {
	width: 100%;
}
</style>
