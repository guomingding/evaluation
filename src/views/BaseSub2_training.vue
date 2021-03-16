<template>
  <div class="base_sub2_training">
      <el-container style="background:#DCDFE6;margin-bottom:50px">
          <el-header height='25px'>
              <h2>R script</h2>
          </el-header>
          <el-main>
            <p>
library(dplyr)<br>
<br>
warpbreaks = read.csv("warpbreaks.csv")<br>
warpbreaks = unique(warpbreaks)<br>
wb_tens = rename(warpbreaks, tens=tension)<br>
wb_tens = group_by(wb_tens, tens)<br>
wb_tens = mutate(wb_tens, count = n())<br>
wb_tens = ungroup(wb_tens)<br>
wb_tens_r = mutate(wb_tens, rate=breaks/count)<br>
wb_l = rbind(warpbreaks, list(70, 'A', 'L'))<br>
wb_sort = arrange(wb_l, -breaks)<br>
            </p>
                <div v-for="(v_s,k_s) in tableData" :key="k_s">
                    <el-button @click="getTableData(k_s)" size='mini'>show table</el-button>
                    <el-table
                        :data="tableData[k_s]"
                        style="width: 100%" :border="true"
                        max-height="500">
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
                    <a v-for="(v_f,k_f) in rfuncs.name" :key="k_f" :href="rfuncs.refs[k_f]" style="margin-right:30px" target="_blank">{{v_f}}</a>
                </el-row>
                <el-row style="background:white;margin-top:20px">warpbreaks(L3): Create table from "warpbreaks.csv"<br>
warpbreaks(L4): Remove duplicate rows in warpbreaks(L3)<br>
wb_tens(L5): Rename tension to "tens" in warpbreaks(L4)<br>
wb_tens(L6): Convert wb_tens(L5) into a grouped table by tens<br>
wb_tens(L7): Create count from n() in wb_tens(L6)<br>
wb_tens(L8): Remove group in wb_tens(L7)<br>
wb_tens_r(L9): Create rate from breaks/count in wb_tens(L8)<br>
wb_l(L10): Create a row (70, 'A', 'L') in warpbreaks(L4)<br>
wb_sort(L11): Sort rows by -breaks in wb_l(L10)<br>
                </el-row>

                <div style="background:white;margin-top:20px"  v-for="(v_q,k_q) in questions" :key="v_q">
                    <el-row style="margin-bottom:10px">{{v_q}}</el-row>
                    <el-checkbox-group v-model="checkList[k_q]">
                        <el-checkbox v-for="(v_opt,k_opt) in options[k_q]" :key="k_opt" :label="k_opt" border>{{v_opt}}</el-checkbox>
                    </el-checkbox-group>
                    <br>
                </div>
               
            </el-main>
      </el-container>
      <div style="background:#DCDFE6;margin-bottom:30px">
        <el-row>
          6. 您认为文本/可视化对您完成这段程序对应的问题有多大帮助？
        </el-row>
        <el-radio-group v-model="surveys[0]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable1" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        
        <el-row>
          7. 您认为文本/可视化对解释这段程序的程度有多大？
        </el-row>
        <el-radio-group v-model="surveys[1]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable2" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
      </div>
      <el-row style="text-align:center">
          <el-button round class="trainingBtn" style="background:yellow" @click="parsePage" border><span style="color:black">Parse</span></el-button>
          <el-button round class="trainingBtn" type="success" @click="next" border><span style="color:black">Next</span></el-button>
      </el-row>
  </div>
</template>

<script>
import {rscripts} from '@/assets/js/rscript'
import {warpbreaks} from '@/assets/data/warpbreaks'
export default {
  name: 'BaseSub1_training',
  data () {
    return {
      rfuncs:{},
      rdesc:"",
      allTableData: [warpbreaks],
      allTableHead: [Object.keys(warpbreaks[0])],
      tableData: [[]],
      tableHead: [[]],
      isClicked: [false],
      checkList: Array.from(new Array(5),()=>[]),
      questions:[
          "1. wb_l(L10) 是否是通过 wb_tens(L7)  做一步或多步操作得到的？",
          "2. 从warpbreaks(L4)到 wb_sort(L11)，共需经历多少步数据清洗操作？",
          "3. 从 wb_tens(L5) 到 wb_tens_r(L9)，新增了哪些列？",
          "4. 从程序执行开始，以下哪些表对生成 wb_l(L10) 做了贡献？",
          "5. 程序中哪些表多次（至少两次）作为数据清洗操作的输入表？"
      ],
      options:[
        ["a. 是","b. 否"],
        ["a. 2","b. 4","c. 5","d. 6","e. 7"],
        ["a. tension ","b. tens","c. count","d. breaks","e. rate"],
        ["a. warpbreaks(L4)","b. wb_tens(L5)","c. wb_tens(L6)","d. wb_tens(L7)","e. wb_tens_r(L9)"],
        ["a. warpbreaks(L3)","b. warpbreaks(L4)","c. wb_tens(L5)","d. wb_tens(L6)","e. wb_tens_r(L9)"],
      ],
      sevenTable1:Array.from(new Array(5),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(5),(v,k) => k + 1),
      surveys:new Array(2)
    }
  },
  mounted(){
    if(localStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
        localStorage.removeItem("store")
    }
    this.rfuncs = rscripts[0].functions
    this.rdesc =  rscripts[0].desc
    this.sevenTable1[0] = "1(没有用处)"
    this.sevenTable1[6] = "7(非常有用)"
    this.sevenTable2[0] = "1(没有解释清楚)"
    this.sevenTable2[6] = "7(解释得十分清楚)"
  },
  methods:{
    getTableData(i){
        //i是某一段脚本所涉及的所有tables中的第i个
        if(this.isClicked[i])return
        this.tableHead[i] = this.allTableHead[i]
        this.tableHead.sort(function(a,b){
          return true
        })

        this.tableData[i] = this.allTableData[i]
        this.tableData.sort(function(a,b){
          return true
        })
        this.isClicked[i] = true
    },

    parsePage(){
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        // this.$router.push('/base_sub1_task')
        if(this.$store.state.url === '/baseline_1' || this.$store.state.url === '/visualization_1'){
            this.$router.push('/base_sub1_task')
        }else{
            this.$router.push('/base_sub1_training')
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base_sub2_training{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
