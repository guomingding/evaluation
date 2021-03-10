<template>
  <div class="vis_sub1_training">
      <el-container style="background:#DCDFE6;margin-bottom:50px" v-for="(v_q,k_q) in funcSelected" :key="k_q">
          <el-header height='25px'>
              <h2>{{k_q + 1}}</h2>
          </el-header>
          <el-main>
            <p>{{v_q.code}}</p>
                <el-button @click="getTableData(k_q)" size='mini'>show table</el-button>
                <el-table
                    :data="tableData[k_q]"
                    style="width: 100%" :border="true">
                    <el-table-column
                        v-for="(v_t,k_t) in tableHead[k_q]"
                        :key="k_t"
                        :label="v_t"
                        :prop="v_t"
                        >
                    </el-table-column>
                </el-table>
                <h3><a :href="v_q.ref" target="_blank">{{v_q.name}}</a></h3>
                <!-- <el-row style="background:white">{{v_q.desc}}</el-row> -->
                <img :src="picPaths[k_q]" alt=""/>
                <div style="background:white;margin-top:20px">
                    <el-row style="margin-bottom:10px">a question</el-row>
                    <el-checkbox-group v-model="checkList[k_q]" @change="showChoices">
                        <el-checkbox label="a" border>option1</el-checkbox>
                        <el-checkbox label="b" border>option2</el-checkbox>
                        <el-checkbox label="c" border>option3</el-checkbox>
                        <el-checkbox label="d" border style="margin-bottom:10px">option4</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-main>
      </el-container>
      <el-row style="text-align:center">
          <el-button round class="trainingBtn" style="background:yellow" @click="parsePage" border><span style="color:black">Parse</span></el-button>
          <el-button round class="trainingBtn" style="background:green" @click="next" border><span style="color:black">Next</span></el-button>
      </el-row>
  </div>
</template>

<script>
import {rfunctions} from '@/assets/js/rfunc'
import {randomlySelect} from '@/assets/js/utils'
import Papa from 'papaparse'
import {tables} from '@/assets/data/tableData'
export default {
  name: 'VisSub1_training',
  data () {
    return {
      picPaths:[],
      funcSelected:[],
      tableData:Array.from(new Array(5),()=>[]),
      tableHead:Array.from(new Array(5),()=>[]),
      isClicked: Array.from(new Array(5),()=>false),
      checkList: Array.from(new Array(5),()=>[])
    }
  },
  mounted(){
    let idxs = []
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      idxs = this.$store.state.funcsSelectedInTraining
      localStorage.removeItem("store")
    }else{
      if(this.$store.state.funcsSelectedInTraining.length !== 0){
        idxs = this.$store.state.funcsSelectedInTraining
      }else{
        let funcsInTraining = this.$store.state.funcsSelectedInTraining.length === 0 ? [] : this.$store.state.funcsSelectedInTraining
        idxs = randomlySelect(Array.from(new Array(rfunctions.length),(v,k) => k),funcsInTraining,5)
        this.$store.commit("setFuncsSelectedInTraining",idxs)
      }  
    }

    for(let idx = 0;idx < idxs.length; idx++){
        this.funcSelected.push(rfunctions[idxs[idx]])
        let path = rfunctions[idxs[idx]].glyph
        this.picPaths.push(require("../assets/images/" + path))
    }

  },
  methods:{
    getTableData(i){
        if(this.isClicked[i])return
        var data = Papa.parse(tables[i]).data;
        let objArr = []
    
        this.tableHead[i] = data[0]
        this.tableHead.sort(function(a,b){
          return true
        })
        for(let row = 1;row < data.length;row++){
            let tempObj = {}
            for(let col = 0;col < data[0].length;col++){
                tempObj[data[0][col]] = data[row][col]
            }
            console.log("tempObj: ",tempObj)
            objArr.push(tempObj)
        }
        this.tableData[i] = objArr
        this.tableData.sort(function(a,b){
          return true
        })
        this.isClicked[i] = true
    },
    showChoices(){
        console.log(this.checkList)
    },
    parsePage(){
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        this.$router.push('/vis_sub2_training')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vis_sub1_training{
    margin-left: 20%;
    margin-right: 20%;
    text-align: left;
  }

</style>
