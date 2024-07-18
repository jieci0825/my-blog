<script setup lang="ts">
const visable = defineModel({ type: Boolean, default: false })
</script>

<template>
	<div
		class="jc-drawer-contianer"
		v-if="visable">
		<el-drawer
			v-model="visable"
			v-bind="$attrs">
			<template
				v-for="(_, slot) in $slots"
				:key="slot"
				v-slot:[slot]="slotProps">
				<slot
					:name="slot"
					v-bind="slotProps"></slot>
			</template>
		</el-drawer>
	</div>
</template>

<style scoped lang="less"></style>
