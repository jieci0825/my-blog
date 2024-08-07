export interface AuthorInfo {
	nickname: string
	avatarUrl: string
	description: string
	sign: string
}

export interface GetCaptchaParams {
	account: string
	email: string
}

export interface LoginParams {
	account: string
	password: string
}

export interface LoginParamsResp {
	accessToken: string
	refreshToken: string
}

export interface SiteHomeInfo {
	title: string
	slogan: string
	publish: string
	runDays: number
}
