import { useGlobalActions } from '@/store'
import { useChangeFont } from '../use-change-font'

export function useInit() {
	useChangeFont()

	const { setAuthorInfo } = useGlobalActions()

	// todo：发送请求获取作者信息
	// 见字如面，很高兴能与你在网络的星辰大海之中相遇。
	const authorInfo = {
		nickname: '劫辞',
		avatarUrl: 'https://cos.coderjc.cn/my-resource/avatar.webp',
		description: '前端领域的学习者，网络上的旅行者，生活中的自闭者！',
		sign: '山林不向四季起誓，荣枯随缘'
	}

	setAuthorInfo(authorInfo)
}
