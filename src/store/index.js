import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        url:'',
        baseline1:[],
        baseline2:[],
        visualization:[]
    },
    mutations:{
        setUrl(state,url){
            state.url = url
        },
        setBaseline1(state,ans1){
            state.baseline1 = ans1
        },
        setBaseline2(state,ans2){ 
            state.baseline2 = ans2
        },
        setVisualization(state,vis_ans){
            state.visualization = vis_ans
        },
    }
})

export default store