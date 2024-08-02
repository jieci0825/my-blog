import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { CreateBlogParams } from './type.ts'

const PREFIX = '/blog'

/**
 * 创建博客
 */
export const reqCreateBlog = (data: CreateBlogParams) => {
	return request.post<IBaseType<string>>({ url: `${PREFIX}`, data })
}
