import { IPageParams } from '../types'

export interface UserItem {
	id: number
	account: string
	nickname: string
	avatarUrl?: string
	description?: string
	sign?: string
	roleId?: number
	roleNickname?: string | undefined
	email?: string
}

export interface GetUserListParams extends IPageParams {
	nickname: string
}

export interface ModifyUserPasswordParams {
	email: string
	code: string
	account: string
	oldPassword: string
	newPassword: string
}
