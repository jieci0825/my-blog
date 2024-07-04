import axios from 'axios'
import { ElMessageBox } from 'element-plus'

import JcRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { local } from '@/utils'
import { constants } from '@/config'
import { useLoginStore } from '@/store'
import router from '@/router'

const refreshIns = axios.create()

const jcRequest: JcRequest = new JcRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	showLoading: false,
	interceptors: {
		requestInterceptor: config => {
			// 携带 token
			const token = local.getItem(constants.ACCESS_TOKEN)
			if (token) {
				config.headers && (config.headers.Authorization = token)
			}
			return config
		},
		responseInterceptor(res) {
			return res.data
		},
		async responseInterceptorsCatch(error) {
			// 保存原始请求
			const originRequest = error.config

			const errInfo = error.response?.data

			if (errInfo) {
				// 如果自定义错误码为 9999 则表示 token 令牌过期重新获取 token 令牌
				if (!originRequest._retry && errInfo.errorCode === 9999) {
					try {
						// 给原始请求添加重新请求标记-保证不会反复获取令牌
						originRequest._retry = true

						// 使用新的实例发送请求获取令牌
						const _response = await refreshIns.post(`${BASE_URL}/token/refresh`, {
							grantType: 'refresh_token', // 表示是刷新 token
							refreshToken: local.getItem(constants.REFRESH_TOKEN) || '' // refresh 令牌
						})
						console.log('⭐ ~ 输出 ~ _response:', _response)

						const { accessToken, refreshToken } = _response.data.data

						// 重新本地存储的令牌
						local.setItem(constants.ACCESS_TOKEN, accessToken)
						local.setItem(constants.REFRESH_TOKEN, refreshToken)

						// 恢复其他登录数据
						// loginAction()

						// 获取到新的访问令牌之后重新发送上一次的请求
						return jcRequest.instance(originRequest)
					} catch (error) {
						const { logout } = useLoginStore()
						logout()
						ElMessageBox.confirm('登录过期，是否需要重新登录？', '提示', {
							confirmButtonText: '登录',
							cancelButtonText: '暂不登录',
							type: 'warning'
						})
							.then(() => {
								router.push(`/login?from=${router.currentRoute.value.fullPath}`)
							})
							.catch()
					}
				} else {
					ElMessage.error(errInfo.msg)
				}
			}
			return Promise.reject(error)
		}
	}
})

export default jcRequest
