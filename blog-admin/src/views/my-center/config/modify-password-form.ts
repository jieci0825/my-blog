import type { JcFormProps } from '@/components/jc-form'

const modifyPasswordFormConfig: JcFormProps = {
	formItems: [
		{
			label: '旧密码',
			field: 'oldPassword',
			type: 'password',
			placeholder: '输入旧密码'
		},
		{
			label: '新密码',
			field: 'newPassword',
			type: 'password',
			placeholder: '输入新密码'
		}
	],
	rules: {
		oldPassword: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		newPassword: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	labelWidth: 100,
	colLayout: {
		xs: 24,
		sm: 24,
		md: 24,
		lg: 24,
		xl: 24
	}
}

export default modifyPasswordFormConfig
