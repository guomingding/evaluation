<template>
  <div class="base_sub2_task">
      <el-container style="margin-bottom:50px">
          <el-header height='25px'>
              <h2>R script</h2>
          </el-header>
          <el-main>
            <p>library(dplyr)<br>
<br>
fy2018 &lt;- read.csv('fy2018.csv')<br>
fy_overtime = arrange(fy2018, desc(date))<br>
fy_overtime = distinct(fy_overtime, emplid, name)<br>
fy_overtime = group_by(fy_overtime, emplid)<br>
fy_overtime = mutate(fy_overtime, n = row_number())<br>
overtime.names.2018 = filter(fy_overtime, n == 1)<br>
overtime.names.2018 = select(overtime.names.2018, emplid, name.standardized = name)<br>
fy2018 = merge(fy2018, overtime.names.2018, by = 'emplid', all = T)<br>
          </p>
               
                <el-row style="background:white;margin-top:20px">fy2018(L3): Create table from "fy2018.csv"<br>
fy_overtime(L4): Sort rows by -date in fy2018(L3)<br>
fy_overtime(L5): Remove duplicate rows on emplid and name in fy_overtime(L4)<br>
fy_overtime(L6): Convert fy_overtime(L5) into a grouped table by emplid<br>
fy_overtime(L7): Create n from row_number() in fy_overtime(L6)<br>
overtime.names.2018(L8): Keep rows where n is 1 in fy_overtime(L7)<br> 
overtime.names.2018(L9_1): Keep emplid and name in overtime.names.2018(L8)<br>
overtime.names.2018(L9_2): Rename name to "name.standardized" in overtime.names.2018(L9_1)<br>
fy2018(L10): Merge fy2018(L3) and overtime.names.2018(L9_2) on emplid==emplid
</el-row>

                <div style="background:white;margin-top:20px"  v-for="(v_q,k_q) in questions" :key="v_q">
                    <el-row style="margin-bottom:10px">{{v_q}}</el-row>
                    <el-checkbox-group v-model="checkList[k_q]">
                        <el-checkbox v-for="(v_opt,k_opt) in options[k_q]" :key="k_opt" :label="v_opt" border>{{v_opt}}</el-checkbox>
                    </el-checkbox-group>
                </div>

                 <div v-for="(v_s,k_s) in tableData" :key="k_s" style="margin-top:20px">
                    <el-button @click="getTableData(k_s)" size='mini'>show table</el-button>
                    <el-table
                        :data="tableData[k_s]"
                        style="width: 100%" :border="true"
                        max-height='500'>
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
                    <a v-for="(v_f,k_f) in rfuncs.name" :key="k_f" :href="rfuncs.refs[k_f]" style="margin-right:30px" @click="addClick" target="_blank">{{v_f}}</a>
                </el-row>
            </el-main>
      </el-container>
      <div style="margin-bottom:30px">
        <el-row>
          6. 您认为文本对您完成这段程序对应的问题有多大帮助？
        </el-row>
        <el-radio-group v-model="surveys[0]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable1" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        
        <el-row>
          7. 您认为文本对解释这段程序的精确性有多高？
        </el-row>
        <el-radio-group v-model="surveys[1]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable2" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
      </div>
      <el-row style="text-align:center">
          <el-button round class="trainingBtn" type="success" @click="next" border><span style="color:black">Next</span></el-button>
      </el-row>
  </div>
</template>

<script>
import {rscripts} from '@/assets/js/rscript'
import {fy2018} from '@/assets/data/fy2018'
export default {
  name: 'BaseSub2_task',
  data () {
    return {
      clickCount:0,
      startTime:'',
      rfuncs:{},
      rdesc:"",
      allTableData: [fy2018],
      allTableHead: [Object.keys(fy2018[0])],
      tableData: [[]],
      tableHead: [[]],
      isClicked: [false],
      checkList: Array.from(new Array(5),()=>[]),
      questions:[
        "1. overtime.names.2018(L9_1) 是否是通过 fy_overtime(L5) 做一步或多步操作得到的？",
        "2. 从 fy_overtime(L6) 到 overtime.names.2018(L9_2)，共经历多少步数据清洗操作？",
        "3. 从 fy_overtime(L4)  到 overtime.names.2018(L8)，新增了哪些列？",
        "4. 从程序执行开始，以下哪些表对生成 overtime.names.2018(L8)  做了贡献？",
        "5. 程序中哪些表多次（至少两次）作为数据清洗操作的输入表？"
      ],
      options:[
        ["a. 是","b. 否"],
        ["a. 2","b. 3","c. 4","d. 5"],
        ["a. date","b. emplid","c. name","d. n","e. name.standardized"],
        ["a. fy_overtime(L4)","b. fy_overtime(L5)","c. fy_overtime(L6)","d. fy_overtime(L7)","e. overtime.names.2018(L9_2)"],
        ["a. fy2018(L3)","b. fy_overtime(L4)","c. fy_overtime(L6)","d. overtime.names.2018(L8)","e. overtime.names.2018(L9_1)"],
      ],
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1),
      surveys:new Array(2)
    }
  },
  mounted(){
    if(localStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
        this.startTime = this.$store.state.baseline2StartTime_task2
        this.clickCount = this.$store.state.base2Click
        localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setBaseline2StartTime_task2",this.startTime)
    }

    this.rfuncs = rscripts[2].functions
    this.rdesc =  rscripts[2].desc
    this.sevenTable1[0] = "1(没有用处)"
    this.sevenTable1[6] = "7(非常有用)"
    this.sevenTable2[0] = "1(精确性低)"
    this.sevenTable2[6] = "7(精确性高)"
  },
  methods:{
    getTableData(i){
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
        this.addClick()
    },

    parsePage(){
      this.$store.commit("setBase2Click",this.clickCount)
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        let ans = {}
        ans['baseline2_answers_task2'] = Array.from(this.checkList)
        ans['baseline2_duration_task2'] = new Date().getTime() - this.$store.state.baseline2StartTime_task2
        ans['baseline2_click_task2'] = this.clickCount
        ans['baseline2_survey_task2'] = this.surveys
        this.$store.commit("setBaseline2_task2",ans)
        // if(this.$store.state.url === '/baseline'){
        //     this.$router.push('/vis_sub1_training')
        // }else{
        //     this.$router.push('/survey')
        // }
         if(this.$store.state.url === '/baseline_2'){
          this.$router.push('/vis_sub1_training')
        }else{
          this.$router.push('/survey')
        }
    },
    addClick(){
      this.clickCount += 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base_sub2_task{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
