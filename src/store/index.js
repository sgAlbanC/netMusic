import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//创建Vuex实例对象
const store = new Vuex.Store({
    state:{
        // 用户信息
        loginUserInfo : null,
        // 板块信息
        boardList:[],
        // 当前一级板块
        activeBoardId:'',

    },
    getters:{
        getLoginUserInfo:(state)=>{
            return state.loginUserInfo
        },
        getBoardList:(state)=>{
            return state.boardList
        },
        getActiveBoardId:(state)=>{
            return state.activeBoardId
        },
    },
    // 向外暴露的方法
    mutations:{
        updateLoginUserInfo(state,value){ 
            state.loginUserInfo = value
        },
        saveBoardList(state,value){
            state.boardList = value
        },
        setActiveBoardId: (state, value) => {
            state.activeBoardId = value;
        },
    },

    actions:{},
    modules:{}

})

export default store
