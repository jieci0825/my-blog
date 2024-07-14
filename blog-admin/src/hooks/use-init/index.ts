import { useGlobalActions } from '@/store'

export const useInit = async () => {
	const { loadLocal } = useGlobalActions()
	loadLocal()
}
