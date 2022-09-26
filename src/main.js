import Vue from 'vue'
Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.css'

import App from './App.vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

import router from './router'

// 引入Swiper样式
import "swiper/dist/css/swiper.css";

// 引入 v-viewer 样式
import 'viewerjs/dist/viewer.css'

// 引入 vuescroll
import vuescroll from 'vuescroll';
Vue.use(vuescroll);

import Viewer from 'v-viewer'

Vue.use(Viewer)

//停止页面滚动、禁止鼠标点击
function stopMove() {
    let m = function (e) { e.preventDefault(); };
    document.body.style.overflow = 'hidden';
    // 禁止页面滑动
    document.addEventListener("touchmove", m, { passive: false });
    // 禁止鼠标点击
    // document.querySelector('class').style.cursor = "not-allowed";
}
//开启页面滚动
function Move() {
    let m = function (e) { e.preventDefault(); };
    document.body.style.overflow = '';//出现滚动条
    document.removeEventListener("touchmove", m, { passive: true });
}

//title修改
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    // 兼容firefox
    document.documentElement.scrollTop = 0
    // 兼容safari
    window.pageYOffset = 0
    // 禁止页面滚动
    // stopMove()
    if (to.meta.title) {
        document.title = to.meta.title;
        next()
    }
})


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')


