import type { JcFormProps } from '@/components/jc-form'

const modifyPasswordFormConfig: JcFormProps = {
	formItems: [
		{
			label: '邮箱',
			field: 'account',
			type: 'text',
			disabled: true
		},
		{
			label: '邮箱',
			field: 'email',
			type: 'text',
			placeholder: '输入接收验证码的邮箱'
		},
		{
			label: '邮箱',
			field: 'captcha',
			type: 'text',
			placeholder: '输入验证码，需要先写填写邮箱',
			appendSlot: 'codeAppend'
		},
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
		account: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		email: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		captcha: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
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
