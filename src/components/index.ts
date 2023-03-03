import { DefineComponent } from 'vue'
import Button from './button/index.vue'
import Header from './header/index.vue'

export default {
    install(app:any) {
        app.component('x-button',Button)
        app.component('x-header',Header)
    }
}