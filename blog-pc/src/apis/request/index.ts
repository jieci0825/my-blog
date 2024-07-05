import JcRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const jcRequest: JcRequest = new JcRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	showLoading: false,
	interceptors: {
		responseInterceptor(res) {
			return res.data
		},
		async responseInterceptorsCatch(error) {
			const errInfo = error.response?.data
			console.log('🚢 ~ 当前打印的内容 ~ errInfo:', errInfo)
			// TODO: 统一处理错误
			return
		}
	}
})

export default jcRequest
