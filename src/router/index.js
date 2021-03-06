import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { routes } from "./routers";
import { Toast } from "vant";
Vue.use(Router);
const ROUTER = new Router({
    routes
});
//进入页面时候的登陆拦截
ROUTER.beforeEach((to, from, next) => {
    window.document.title = to.meta.title || 'TeamLink';
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token || localStorage.getItem('token')) {
            next();
        } else {
            Toast({
                message: "Please login first",
            });
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
})

export default ROUTER;