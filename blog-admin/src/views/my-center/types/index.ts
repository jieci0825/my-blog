export interface BoxItem {
	label: string
	content: any
	key: string
	slotOpt?: {
		defalutSlot?: string
		operateSlot?: string
	}
	isOperate?: boolean
	operateText?: {
		editText?: string
		saveText?: string
		cancelText?: string
	}
	operateCallback?: Function
}

export interface BoxItemNode extends BoxItem {
	raw: BoxItem
	isEdit: boolean
}

export interface BoxWrapProps {
	list: BoxItem[]
}

export interface BoxWrapEmits {
	(e: 'edit', data: any): void
	(e: 'save', content: any, data: any, done: Function): void
	(e: 'cancel', data: any): void
}

export interface ModifyPassword {
	oldPassword: string
	newPassword: string
}
