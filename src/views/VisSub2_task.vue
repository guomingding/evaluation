<template>
  <div class="vis_sub2_task">
      <el-container style="background:#DCDFE6;margin-bottom:50px">
          <el-header height='25px'>
              <h2>R script</h2>
          </el-header>
          <el-main>
            <p>{{rscript}}</p>
                <div v-for="(v_s,k_s) in tableData" :key="k_s">
                    <el-button @click="getTableData(k_s)" size='mini'>show table</el-button>
                    <el-table
                        :data="tableData[k_s]"
                        style="width: 100%" :border="true">
                        <el-table-column
                            v-for="(v_t,k_t) in tableHead[k_s]"
                            :key="k_t"
                            :label="v_t"
                            :prop="v_t"
                            >
                        </el-table-column>
                    </el-table>
                </div>
                <br>
                <el-row>
                    <a v-for="(v_f,k_f) in rfuncs.name" :key="k_f" :href="rfuncs.refs[k_f]" style="margin-right:30px" @click="addCount" target="_blank">{{v_f}}</a>
                </el-row>
                <!-- <el-row style="background:white;margin-top:20px">{{rdesc}}</el-row> -->
                <img :src="picPath" />
                <div style="background:white;margin-top:20px"  v-for="(v_q,k_q) in questions" :key="v_q">
                    <el-row style="margin-bottom:10px">{{v_q}}</el-row>
                    <el-checkbox-group v-model="checkList[k_q]">
                        <el-checkbox v-for="(v_opt,k_opt) in options[k_q]" :key="k_opt" :label="v_opt" border>{{v_opt}}</el-checkbox>
                    </el-checkbox-group>
                    <br>
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
import {rscripts} from '@/assets/js/rscript'
import {randomlySelect} from '@/assets/js/utils'
import Papa from 'papaparse'
import {tables} from '@/assets/data/scriptTables'
export default {
  name: 'BaseSub2_task',
  data () {
    return {
      clickCount:0,
      startTime:'',
      scriptSelected:'',
      rscript:'',
      rfuncs:{},
      picPath:"",
      tableData: [],
      tableHead: [],
      isClicked: [],
      checkList: Array.from(new Array(4),()=>[]),
      questions:[
          "q1","q2","q3","q4"
      ],
      options:[
        ["opt1_1","opt1_2","opt1_3","opt1_4"],
        ["opt2_1","opt2_2","opt2_3","opt2_4"],
        ["opt3_1","opt3_2","opt3_3","opt3_4"],
        ["opt4_1","opt4_2","opt4_3","opt4_4"]
      ]
    }
  },
  mounted(){
    let idxs = []
    if(localStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
        this.startTime = this.$store.state.visualization2StartTime
        this.clickCount = this.$store.state.vis2Click
        idxs =  this.$store.state.scriptSelectedInVis2
        localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setVisualization2StartTime",this.startTime)
      
        if(this.$store.state.scriptSelectedInVis2.length !== 0){
          idxs = this.$store.state.scriptSelectedInVis2
        }else{
          let scriptSelectedInTraining = this.$store.state.scriptSelectedInTraining
          let scriptSelectedInBase2 = this.$store.state.scriptSelectedInBase2
          idxs = randomlySelect(Array.from(new Array(rscripts.length),(v,k) => k),scriptSelectedInTraining.concat(scriptSelectedInBase2),1)
          this.$store.commit("setScriptSelectedInVis2",idxs)
        } 
    }
  
    this.scriptSelected = idxs[0]
    this.rscript = rscripts[idxs[0]].rscript
    this.tableData = Array.from(new Array(tables[idxs[0]].length),()=>[])
    this.rfuncs = rscripts[idxs[0]].functions
    let path = rscripts[idxs[0]].glyph
    this.picPath = require("../assets/images/" + path)
  },
  methods:{
    getTableData(i){
        //i是某一段脚本所涉及的所有tables中的第i个
        if(this.isClicked.length === 0){
            this.isClicked = Array.from(new Array(tables[this.scriptSelected].length),()=>false)
        }else if(this.isClicked[i] === true)return
        
        var data = Papa.parse(tables[this.scriptSelected][i]).data;

        console.log("Data: ",data)

        let objArr = []
    
        this.tableHead.push(data[0])
 
        for(let row = 1;row < data.length;row++){
            let tempObj = {}
            for(let col = 0;col < data[0].length;col++){
                tempObj[data[0][col]] = data[row][col]
            }
            objArr.push(tempObj)
        }
        this.tableData[i] = objArr
        this.isClicked[i] = true
    },

    parsePage(){
      this.$store.commit("setVis2Click",this.clickCount)
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        let ans = {}
        ans['visualization2_answers'] = Array.from(this.checkList)
        ans['visualization2_duration'] = new Date().getTime() - this.$store.state.visualization2StartTime
        ans['visualization2_click'] = this.clickCount
        this.$store.commit("setVisualization2",ans)

        console.log(this.$store.state.url)
        if(this.$store.state.url === '/visualization'){
            this.$router.push('/base_sub1_training') 
        }else{
            this.$router.push('/survey') 
        }
    },
    addCount(){
      this.clickCount += 1 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vis_sub2_task{
    margin-left: 20%;
    margin-right: 20%;
    text-align: left;
  }

</style>
