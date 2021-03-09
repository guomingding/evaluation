<template>
  <div class="base_sub1_task">
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
                <h3><a :href="v_q.ref" @click="addClick">{{v_q.name}}</a></h3>
                <el-row style="background:white">{{v_q.desc}}</el-row>
                <div style="background:white;margin-top:20px">
                    <el-row style="margin-bottom:10px">a question</el-row>
                    <el-checkbox-group v-model="checkList[k_q]">
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
  name: 'BaseSub1_task',
  data () {
    return {
      clickCount:0,
      startTime:'',
      funcSelected:[],
      tableData: [],
      tableHead: [],
      isClicked: Array.from(new Array(5),()=>false),
      checkList: Array.from(new Array(5),()=>[])
    }
  },
  mounted(){
    //要考虑到刷新页面的情况
    let idxs = []
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      this.startTime = this.$store.state.baseline1StartTime
      this.clickCount = this.$store.state.base1Click
      idxs = this.$store.state.funcsSelectedInBase1
      localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setBaseline1StartTime",this.startTime)

        let funcsInTraining = this.$store.state.funcsSelectedInTraining
        let funcsInVis1 = this.$store.state.funcsSelectedInVis1

        console.log(funcsInTraining)
        console.log(funcsInVis1)
        idxs = randomlySelect(Array.from(new Array(rfunctions.length),(v,k) => k),
            funcsInTraining.concat(funcsInVis1),5)
        this.$store.commit("setFuncsSelectedInBase1",idxs)
    }
    
    console.log(idxs)
    for(let idx = 0;idx < idxs.length; idx++){
        this.funcSelected.push(rfunctions[idxs[idx]])
    }
  },
  methods:{
    getTableData(i){
        if(this.isClicked[i])return
        var data = Papa.parse(tables[i]).data;
        let objArr = []
    
        this.tableHead.push(data[0])
 
        for(let row = 1;row < data.length;row++){
            let tempObj = {}
            for(let col = 0;col < data[0].length;col++){
                tempObj[data[0][col]] = data[row][col]
            }
            objArr.push(tempObj)
        }
        this.tableData.push(objArr)
        this.isClicked[i] = true
    },
    parsePage(){
      this.$store.commit("setBase1Click",this.clickCount)
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        let ans = {}
        ans['baseline1_answers'] = Array.from(this.checkList)
        ans['baseline1_duration'] = new Date().getTime() - this.$store.state.baseline1StartTime
        ans['baselin1_click'] = this.clickCount
        
        this.$store.commit("setBaseline1",ans)
        this.$router.push('/base_sub2_task')
    },
    addClick(){
      this.clickCount += 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base_sub1_task{
    margin-left: 20%;
    margin-right: 20%;
    text-align: left;
  }

</style>
