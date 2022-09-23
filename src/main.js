import { createApp } from 'vue'
import './assets/css/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/element/theme.scss'
import reg from './components/global/reg'
import App from './App.vue'
import store from './store'
import router from './router/index.js';
createApp(App).use(ElementPlus).use(reg).use(store).use(router).mount('#app')
