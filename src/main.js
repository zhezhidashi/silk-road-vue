import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.css'

import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI);


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
