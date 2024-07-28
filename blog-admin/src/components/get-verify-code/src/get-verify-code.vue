<script setup lang="ts">
import { ref } from 'vue'
import { getLocalCache, isEmpty, removeLocalCache, setLocalCache } from '@/utils'
import type { GetVerifyCodeProps, GetVerifyCodeEmits } from './get-verify-code'

defineOptions({ name: 'GetVerifyCode' })

const props = withDefaults(defineProps<GetVerifyCodeProps>(), {
	countDown: 10
})
const emits = defineEmits<GetVerifyCodeEmits>()

const BLOG_ADMIN_COUNT_DOWN = 'BLOG_ADMIN_COUNT_DOWN'

function getInitState(): boolean {
	return isEmpty(getLocalCache(BLOG_ADMIN_COUNT_DOWN)) ? true : false
}

function getCountDown(): number {
	console.log(isEmpty(getLocalCache(BLOG_ADMIN_COUNT_DOWN)))
	return isEmpty(getLocalCache(BLOG_ADMIN_COUNT_DOWN)) ? props.countDown : getLocalCache(BLOG_ADMIN_COUNT_DOWN)
}

const isClick = ref(getInitState())
const count = ref(getCountDown())
console.log('🚢 ~ 当前打印的内容 ~ count:', count.value)

const handleClick = () => {
	isClick.value = false
	startCountDown()
	emits('click')
}

let timer: any = undefined
// 设置倒计时
function startCountDown() {
	timer = setInterval(() => {
		count.value--
		if (count.value <= 0) {
			isClick.value = true
			count.value = props.countDown
			clearInterval(timer)
			removeLocalCache(BLOG_ADMIN_COUNT_DOWN)
			return
		}
		emits('countDown')
		setLocalCache(BLOG_ADMIN_COUNT_DOWN, `${count.value}`)
	}, 1000)
}
if (!isClick.value) {
	startCountDown()
}
</script>

<template>
	<el-button
		v-bind="$attrs"
		@click="handleClick"
		>{{ isClick ? '获取验证码' : `${count} s` }}</el-button
	>
</template>

<style scoped lang="less"></style>
