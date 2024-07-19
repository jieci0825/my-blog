import request from '@/apis/request'
import type { IBaseType } from '../types'
import { createFileRecordParams, GetCredentialResp } from './types'

/**
 * 获取上传的临时凭证
 */
export function reqGetUploadCredential(duration: number = 20) {
	return request.post<IBaseType<GetCredentialResp>>({
		url: '/file/credential',
		data: {
			type: 'UPLOAD',
			duration
		}
	})
}

/**
 * 创建文件记录
 */
export function reqCreateFileRecord(data: createFileRecordParams) {
	return request.post<IBaseType>({ url: '/file/record', data })
}
