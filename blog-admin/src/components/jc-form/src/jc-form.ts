export type FormItemType =
	| 'text'
	| 'textarea'
	| 'password'
	| 'button'
	| 'checkbox'
	| 'one-file'
	| 'more-file'
	| 'number'
	| 'radio'
	| 'search-select'

export interface JcFormItem {
	label: string
	field: string
	type: FormItemType
	multiple?: boolean
	disabled?: boolean
	placeholder?: string
	options?: any
	defaultValue?: any // 默认值
	col?: number // 占几列 - 最大为 24 列
	slotName?: string // 如果这个表单项内容需要使用插槽，则配置对应的插槽名
}

interface RowConfig {
	gutter?: number
	justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
	align?: 'top' | 'middle' | 'bottom'
}

interface ColLayout {
	xs: number // <768px 响应式栅格数或者栅格属性对象
	sm: number // ≥768px 响应式栅格数或者栅格属性对象
	md: number // ≥992px 响应式栅格数或者栅格属性对象
	lg: number // ≥1200px 响应式栅格数或者栅格属性对象
	xl: number // ≥1920px 响应式栅格数或者栅格属性对象
}

interface FooterConfig {
	submitText?: string
	resetText?: string
}

export interface JcFormProps {
	formData?: {}
	formItems: JcFormItem[]
	rules?: object
	labelWidth?: string | number
	colLayout?: ColLayout
	rowConfig?: RowConfig
	formItemStyle?: object // 应用给 formItem 组件的样式
	isFooter?: boolean
	footerConfig?: FooterConfig
	[key: string]: any
}

export interface JcFormEmits {
	(e: 'submit', data?: any): void
	(e: 'reset'): void
}
