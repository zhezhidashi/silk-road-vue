// Header 模块的小仓库
const state = {
    HeaderIndex: 0,
};
const mutations = {
    GetHeaderIndex(state, HeaderIndex) {
        state.HeaderIndex = HeaderIndex;
    }
};
const actions = {
    GetHeaderIndex({ commit }, HeaderIndex) {
        commit('GetHeaderIndex', HeaderIndex);
    }
};
// 计算属性
const getters = {
    HeaderIndex(state){
        return state.HeaderIndex;
    }
};
export default {
    state, mutations, actions, getters
}