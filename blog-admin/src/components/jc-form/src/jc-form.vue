<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { JcFormEmits, JcFormProps } from './jc-form'
import type { FormInstance } from 'element-plus'

defineOptions({ name: 'JcForm' })

const $attrs = useAttrs()
const emits = defineEmits<JcFormEmits>()
const props = withDefaults(defineProps<JcFormProps>(), {
	rules: () => ({}),
	rowConfig: () => {
		return {
			gutter: 10
		}
	},
	colLayout: () => {
		return {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 8,
			xl: 6
		}
	},
	isFooter: true,
	labelWidth: 100,
	footerConfig: () => {
		return {
			resetText: '重置',
			submitText: '提交'
		}
	}
})

type ExtractFields<T extends JcFormProps['formItems']> = {
	[K in T[number]['field']]: any
}
type FormFields = ExtractFields<typeof props.formItems>

// 内部表单数据
const innerFormData = ref<FormFields>({})
// 外部传递的表单数据
const modelValue = defineModel({ type: Object })
// 使用内部表单数据
const isInnerFormData = computed(() => {
	return modelValue.value ? false : true
})
// 根据条件选择真正需要使用的表单数据
const formData = isInnerFormData.value ? innerFormData : modelValue

// 初始化表单数据
function initFormData() {
	// 当外界传递了表单数据的时候以外界的为准
	if (!isInnerFormData.value) return
	props.formItems.forEach(item => {
		formData.value[item.field] = item.defaultValue ?? ''
	})
}
initFormData()

const totalProps = computed(() => {
	return { ...$attrs, ...props }
})

// 组件实例
const jcFormRef = ref<FormInstance | undefined>(undefined)

// 提交
const handleSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	try {
		await formEl.validate()
		emits('submit', formData.value)
	} catch (error) {}
}
// 重置
const handleReset = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()

	emits('reset')
}
</script>

<template>
	<div class="jc-form-container">
		<el-form
			@submit.native.prevent="handleSubmit(jcFormRef)"
			v-bind="totalProps"
			ref="jcFormRef"
			:model="formData">
			<el-row
				:style="{ width: '100%' }"
				v-bind="props.rowConfig">
				<!-- 单独配置的 col 规则大于整体布局规则 -->
				<el-col
					v-for="(item, index) in props.formItems"
					:key="index"
					v-bind="item.col ? { span: item.col } : props.colLayout">
					<el-form-item
						:prop="item.field"
						:style="props.formItemStyle"
						:label="item.label">
						<!-- 文本框 | 密码框 -->
						<template v-if="item.type === 'text' || item.type === 'password'">
							<el-input
								:disabled="item.disabled"
								auto-complete="new-password"
								autocomplete="off"
								:type="item.type"
								:show-password="item.type === 'password'"
								v-model="formData[item.field]"
								:placeholder="item.placeholder">
							</el-input>
						</template>
						<!-- 文本域 -->
						<template v-else-if="item.type === 'textarea'">
							<el-input
								:placeholder="item.placeholder"
								v-model="formData[item.field]"
								v-bind="item.otherElConfig"
								type="textarea" />
						</template>
						<!-- 文件上传 -->
						<template v-else-if="item.type === 'file'">
							<JcUpload
								v-model="formData[item.field]"
								v-bind="item.fileConfig"
								:init-preview-image="formData[item.field]"
								:model="item.model"></JcUpload>
						</template>
					</el-form-item>
				</el-col>
				<el-col v-bind="props.colLayout">
					<el-form-item class="form-footer">
						<slot name="footer">
							<el-button @click="handleReset(jcFormRef)">{{ props.footerConfig.resetText }}</el-button>
							<el-button
								type="primary"
								@click="handleSubmit(jcFormRef)"
								>{{ props.footerConfig.submitText }}</el-button
							>
						</slot>
						<button
							type="submit"
							style="display: none"></button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.jc-form-container {
	width: 100%;
	.form-footer {
		display: flex;
		width: 100%;
	}
}
</style>
