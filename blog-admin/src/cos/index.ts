import COS from 'cos-js-sdk-v5'
import type { IOptions } from './types'

// 初始化实例
function insCos(options: IOptions) {
	const cos = new COS({
		FileParallelLimit: 3, //同一个实例下上传的文件并发数，默认值3
		SecretId: options.TmpSecretId,
		SecretKey: options.TmpSecretKey,
		SecurityToken: options.Token
	})
	return cos
}

export { insCos }
