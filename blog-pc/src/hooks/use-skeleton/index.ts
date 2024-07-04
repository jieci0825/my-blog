import { ref } from 'vue'

const loadingSkeleton = ref(true)

export default function closeSkeleton() {
	loadingSkeleton.value = false
}
export function useSkeleton() {
	return { closeSkeleton, loadingSkeleton }
}
