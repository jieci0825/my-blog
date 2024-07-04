import { onMounted, onBeforeUnmount, type Ref, isRef, watch, unref } from 'vue'

export function useEventListener(
	target: EventTarget | Ref<EventTarget | null>,
	eventName: string,
	listener: (e: any) => void,
	options?: boolean | AddEventListenerOptions
) {
	onMounted(() => {
		if (isRef(target)) {
			watch(
				() => target.value,
				(newValue, oldValue) => {
					oldValue?.removeEventListener(eventName, listener, options)
					newValue?.addEventListener(eventName, listener, options)
				},
				{
					immediate: true
				}
			)
		} else {
			target.addEventListener(eventName, listener, options)
		}
	})

	onBeforeUnmount(() => {
		unref(target)?.removeEventListener(eventName, listener, options)
	})
}
