import type { App } from 'vue'
import JcLogo from '@/components/jc-logo'
import JcDrawer from '@/components/jc-drawer'
import JcDialog from '@/components/jc-dialog'

const comps = [JcLogo, JcDialog, JcDrawer]

export default function (app: App): void {
	comps.forEach(comp => app.component(comp.name as string, comp))
}
