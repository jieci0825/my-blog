export interface IBaseType<T = any> {
	errorCode: number | string
	msg: string
	data: T
}
