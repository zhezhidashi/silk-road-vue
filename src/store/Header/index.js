// Header 模块的小仓库
const state = {
    HeaderIndex: 0,
    LineIndex: 0,
};
const mutations = {
    GetHeaderIndex(state, HeaderIndex) {
        state.HeaderIndex = HeaderIndex;
    },
    GetLineIndex(state, LineIndex){
        state.LineIndex = LineIndex;
    }
};
const actions = {
    GetHeaderIndex({ commit }, HeaderIndex) {
        commit('GetHeaderIndex', HeaderIndex);
    },
    GetLineIndex({commit}, LineIndex){
        commit('GetLineIndex', LineIndex);
    }
};
// 计算属性
const getters = {
    HeaderIndex(state){
        return state.HeaderIndex;
    },
    LineIndex(state){
        return state.LineIndex;
    }
};
export default {
    state, mutations, actions, getters
}