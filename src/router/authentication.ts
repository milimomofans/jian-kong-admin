import { Router } from 'vue-router'
import { userStore } from '@/stores/user-store'

export const authentication = (router:Router) => {
    router.beforeEach((to,from,next) => {
        const store = userStore()

        if (true !== to.meta.requiresAuth) {
            // return true;
            next()
        }

        if (store.authToken && store.userName) {
            // return true;
            next()
        }

        return next({ path: "/login" });
    })
}