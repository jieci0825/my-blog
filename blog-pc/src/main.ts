import { createApp } from 'vue'
import './styles/index.less'
import App from './App.vue'

import routers from './routers'
import { registerApp } from '@/global'

const app = createApp(App)

registerApp(app)

app.use(routers)
app.mount('#app')
