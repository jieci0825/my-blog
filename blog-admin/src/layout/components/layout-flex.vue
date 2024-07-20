<script setup lang="ts">
import { useGlobalActions, useGlobalGetters } from '@/store'
import { Expand, Fold } from '@element-plus/icons-vue'

const { getCollapse } = useGlobalGetters()
const { toggleCollapse } = useGlobalActions()
</script>

<template>
	<div class="layout-flex">
		<el-icon
			:size="24"
			@click="toggleCollapse"
			class="layout-flex-icon">
			<component :is="getCollapse ? Expand : Fold"></component>
		</el-icon>
	</div>
</template>

<style scoped lang="less"></style>
