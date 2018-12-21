import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

//vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
Locale.use('en-US', enUS);
//iView框架
/* import iView from 'iview';
Vue.use(iView)
 */
//iView国际化
import locale from 'iview/dist/locale/en-US';
Vue.use({ locale });
import 'iview/dist/styles/iview.css';
import { Button, Input } from 'iview';
Vue.component('Button', Button);
Vue.component('Input', Input);

// 解决移动端300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body);

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

//注册全局组件
import loading from '@/components/loading'
Vue.component('loading', loading)
import footerMenu from './components/footeMenu'
Vue.component('footer-menu', footerMenu);

/* import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css' */
import '@/theme.css'
import 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
//vue 实例化
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')