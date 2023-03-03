import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from "./router/index";
import piniaPersist from 'pinia-plugin-persist'
import "@arco-design/web-vue/dist/arco.css";
import components from "./components";
import "@/utils/http"


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.use(pinia)
app.use(components)
app.mount('#app')