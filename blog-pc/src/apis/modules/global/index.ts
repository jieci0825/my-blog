import request from '@/apis/request'
import type { AuthorInfo, GetCaptchaParams, LoginParams, LoginParamsResp, SiteHomeInfo } from './type.ts'
import type { IBaseType } from '../types'

/**
 * 登录
 */
export function reqLogin(data: LoginParams) {
	return request.post<IBaseType<LoginParamsResp>>({ url: '/token', data })
}

/**
 * 获取作者信息
 */
export function reqGetAuthorInfo() {
	return request.get<IBaseType<AuthorInfo>>({
		url: '/global/auhtor'
	})
}

/**
 * 获取验证码
 */
export function reqGetCaptcha(params: GetCaptchaParams) {
	return request.get<IBaseType<string>>({ url: '/token/captcha', params })
}

/**
 * 获取站点首页信息
 */
export function reqGetSiteHomeInfo() {
	return request.get<IBaseType<SiteHomeInfo>>({ url: '/global/site-home-info' })
}
