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
}

export interface GetUserListParams extends IPageParams {
	nickname: string
}
