import { ref } from 'vue'

const loadingSkeleton = ref(true)

export default function closeSkeleton() {
	setTimeout(() => {
		loadingSkeleton.value = false
	}, 3000)
}
export function useSkeleton() {
	return { closeSkeleton, loadingSkeleton }
}
