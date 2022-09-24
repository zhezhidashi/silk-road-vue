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


//title修改
router.beforeEach((to,from,next)=>{
	if(to.meta.title){
		document.title=to.meta.title;
		next();
	}
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
