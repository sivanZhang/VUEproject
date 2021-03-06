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
//iView
import locale from 'iview/dist/locale/en-US';
Vue.use({ locale });
import 'iview/dist/styles/iview.css';
import { Button, Input } from 'iview';
Vue.component('Button', Button);
Vue.component('Input', Input);

import '@/theme.css'
import 'animate.css'
import 'font-awesome/css/font-awesome.min.css'

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

//注册全局组件
import footerMenu from './components/footeMenu'
Vue.component('footer-menu', footerMenu);

/* import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css' */
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD5RwuVXVJPzWOXchbytXjKwUxnK34bDMw',
        libraries: 'places',
        language: 'en-US', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //If you want to set the version, you can do so:
        // v: '3.26',
    },

    // If you intend to programmatically custom event listener code
    // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    // you might need to turn this on.
    autobindAllEvents: false,
    // If you want to manually install components, e.g.
    // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    // Vue.component('GmapMarker', GmapMarker)
    // then disable the following:
    //installComponents: true,
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')