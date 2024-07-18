import type { App } from 'vue'
import JcForm from '@/components/jc-form'
import JcTable from '@/components/jc-table'
import JcPaginator from '@/components/jc-paginator'
import JcUpload from '@/components/jc-upload'
import JcDrawer from '@/components/jc-drawer'
import PageContent from '@/components/page-content'

export default function (app: App): void {
	app.component('JcForm', JcForm)
	app.component('JcTable', JcTable)
	app.component('JcPaginator', JcPaginator)
	app.component('JcUpload', JcUpload)
	app.component('JcDrawer', JcDrawer)
	app.component('PageContent', PageContent)
}
