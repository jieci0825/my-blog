import type { App } from 'vue'
import JcForm from '@/components/jc-form'
import JcTable from '@/components/jc-table'
import JcPaginator from '@/components/jc-paginator'
import PageContent from '@/components/page-content'

export default function (app: App): void {
	app.component('JcForm', JcForm)
	app.component('JcTable', JcTable)
	app.component('JcPaginator', JcPaginator)
	app.component('PageContent', PageContent)
}
