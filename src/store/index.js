import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import Header from './Header'

//对外暴露Store类的一个实例
export default new Vuex.Store({
    modules:{
        Header
    }
})