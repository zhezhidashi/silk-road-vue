// HttpRequest 模块的小仓库
const state = {
    ExhibitionList: {},
    AlbumList: {},
};
const mutations = {
    GetExhibitionList(state, ExhibitionList) {
        state.ExhibitionList = ExhibitionList;
    },

    GetAlbumList(state, AlbumList){
        state.AlbumList = AlbumList;
    },
};
const actions = {
    GetExhibitionList({ commit }, ExhibitionList) {
        commit('GetExhibitionList', ExhibitionList);
    },

    GetAlbumList({commit}, AlbumList){
        commit('GetAlbumList', AlbumList);
    },
};
// 计算属性
const getters = {
    // 获得展览列表信息
    ExhibitionList(state){
        return state.ExhibitionList;
    },
    
    // 获得某一展览信息
    Exhibition(state){

    },

    // 获得相册列表信息
    AlbumList(state){
        return state.AlbumList;
    },

    // 获得某一相册信息
    Album(state){

    }
};
export default {
    state, mutations, actions, getters
}