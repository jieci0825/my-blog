export interface GetVerifyCodeProps {
	isClick: boolean
	countDown?: number
}

export interface GetVerifyCodeEmits {
	(e: 'click'): void
	(e: 'countDown'): void
}
