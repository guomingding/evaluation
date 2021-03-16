import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        url:'',
        userInf:{},
        baseline1:[],
        baseline2:[],
        visualization1:[],
        visualization2:[],

        base1Click:0,
        base2Click:0,
        vis1Click:0,
        vis2Click:0,

        funcsSelectedInTraining:[],
        funcsSelectedInBase1:[],
        funcsSelectedInVis1:[],

        scriptSelectedInTraining:[],
        scriptSelectedInBase2:[],
        scriptSelectedInVis2:[],

        baseline1StartTime:0,
        baseline2StartTime:0,
        visualization1StartTime:0,
        visualization2StartTime:0,
    },
    mutations:{
        setUrl(state,url){
            state.url = url
        },
        setUserInf(state,inf){
            state.userInf = inf
        },
        setBaseline1(state,ans1){
            state.baseline1 = ans1
        },
        setBaseline2(state,ans2){ 
            state.baseline2 = ans2
        },
        setVisualization1(state,vis_ans1){
            state.visualization1 = vis_ans1
        },
        setVisualization2(state,vis_ans2){
            state.visualization2 = vis_ans2
        },

        setBase1Click(state,num){
            state.base1Click = num
        },
        setBase2Click(state,num){
            state.base2Click = num
        },
        setVis1Click(state,num){
            state.vis1Click = num
        },
        setVis2Click(state,num){
            state.vis2Click = num
        },

        setFuncsSelectedInTraining(state,funcs){
            state.funcsSelectedInTraining = funcs
        },
        setFuncsSelectedInBase1(state,funcs){
            state.funcsSelectedInBase1 = funcs
        },
        setFuncsSelectedInVis1(state,funcs){
            state.funcsSelectedInVis1 = funcs
        },

        setScriptSelectedInTraining(state,script){
            state.scriptSelectedInTraining = script
        },
        setScriptSelectedInBase2(state,script){
            state.scriptSelectedInBase2 = script
        },
        setScriptSelectedInVis2(state,script){
            state.scriptSelectedInVis2 = script
        },
        
        setBaseline1StartTime(state,time){
            state.baseline1StartTime = time
        },
        setBaseline2StartTime(state,time){
            state.baseline2StartTime = time
        },
        setVisualization1StartTime(state,time){
            state.visualization1StartTime = time
        },
        setVisualization2StartTime(state,time){
            state.visualization2StartTime = time
        },

    }
})

export default store