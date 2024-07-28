export interface GetVerifyCodeProps {
	countDown?: number
}

export interface GetVerifyCodeEmits {
	(e: 'click'): void
	(e: 'countDown'): void
}
