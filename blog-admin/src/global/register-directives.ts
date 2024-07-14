import type { App } from 'vue'
import { focus } from '@/directives'

export default function (app: App) {
	app.directive('focus', focus)
}
