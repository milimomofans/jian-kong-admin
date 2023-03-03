import { createRouter, createWebHashHistory } from 'vue-router'
import { authentication } from './authentication'
import PIndex from "../views/index/index.vue"
import PLogin from '../views/login/index.vue'
import PAdmin from '../views/admin/index.vue'
import PJkym from '../views/adminViews/jkym.vue'

const routes = [
    {
        path:'/',
        name:'home',
        component:PIndex,
        meta:{ name:'首页'}
    },
    {
        path:'/login',
        name:'login',
        component:PLogin,
        meta:{ name:'登录' }
    },
    {
        path:'/admin',
        name:'admin',
        component:PAdmin,
        meta:{ name: 'home', requiresAuth:true },
        children:[
            {
                path:'/admin',
                name:'jkym',
                component:PJkym,
                meta: { name: '监控页面', requiresAuth:true }
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

authentication(router)

export default router