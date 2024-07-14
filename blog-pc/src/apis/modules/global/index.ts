import request from '@/apis/request'
import type { AuthorInfo } from './type.ts'
import type { IBaseType } from '../types'

/**
 * 获取作者信息
 */
export function reqGetAuthorInfo() {
	return request.get<IBaseType<AuthorInfo>>({
		url: '/global/auhtor'
	})
}
