<template>
  <div class="base_sub2_task">
      <el-container style="margin-bottom:50px">
          <el-header height='25px'>
              <h2>R script</h2>
          </el-header>
          <el-main>
            <p>1.  library(dplyr)<br>
2.  <br>
3.  bailey = read.csv("Energy-Poverty 32641 homes.csv")<br>
4.  landlords = dplyr::count(bailey, OWNERNME1, sort = TRUE)<br>
5.  landlords = subset(landlords, n>1)<br>
6.  by_owner = group_by(bailey, OWNERNME1)<br>
7.  utilities = dplyr::summarise(by_owner, cost = sum(Unit.Utilities.Cost))<br>
8.  ownercost = left_join(landlords, utilities, by = 'OWNERNME1')<br>
9.  ownercost = rename(ownercost, "num_properties"="n")<br>
10.  ownercost = mutate(ownercost, cost_per_property=cost / num_properties)<br>
            </p>
            <h2>文本</h2>
                <el-row style="background:white;margin-top:20px">bailey(L3): Create table from "Energy-Poverty 32641 homes.csv"<br>
landlords(L4_1): Create n from COUNT(OWNERNME1) in bailey(L3)<br>
landlords(L4_2): Sort rows by -n in landlords(L4_1)<br>
landlords(L5): Keep rows where n>1 in landlords(L4_2)<br>
by_owner(L6): Convert bailey(L3) into a grouped table by OWNERNME1<br>
utilities(L7): Create cost from sum(Unit.Utilities.Cost) in by_owner(L6)<br>
ownercost(L8): Left join with landlords(L5) and utilities(L7) on OWNERNME1==OWNERNME1<br>
ownercost(L9): Rename n to "num_properties" in ownercost(L8)<br>
ownercost(L10): Create cost_per_property from cost/num_properties in ownercost(L9)</el-row>

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
import {Energy_Poverty} from '@/assets/data/Energy_Poverty'
export default {
  name: 'BaseSub2_task',
  data () {
    return {
      clickCount:0,
      startTime:'',
      rfuncs:{},
      rdesc:"",
      allTableData: [Energy_Poverty],
      allTableHead: [Object.keys(Energy_Poverty[0])],
      tableData: [[]],
      tableHead: [[]],
      isClicked: [false],
      checkList: Array.from(new Array(5),()=>[]),
      questions:[
          "1. utilities(L7) 是否是通过 landlords(L5)  做一步或多步操作得到的？",
          "2. 从bailey(L3) 到 landlords(L5)，共经历多少步数据清洗操作？",
          "3. 从 ownercost(L8)  到 ownercost(L10)，新增了哪些列？",
          "4. 从程序执行开始，以下哪些表对生成 utilities(L7)  做了贡献？",
          "5. 程序中哪些表多次（至少两次）作为数据清洗操作的输入表？"
      ],
      options:[
        ["a. 是","b. 否"],
        ["a. 1","b. 2","c. 3","d. 4"],
        ["a. OWNERNME1","b. n","c. Unit.Utilities.Cost","d. num_properties","e. cost_per_property "],
        ["a. bailey(L3)","b. landlords(L4_1)","c. landlords(L4_2)","d. landlords(L5)","e. by_owner(L6)"],
        ["a. bailey(L3)","b. landlords(L5)","c. by_owner(L6)","d. utilities(L7)","e. ownercost(L8)"],
      ],
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1),
      surveys:new Array(2)
    }
  },
  mounted(){
    if(localStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
        this.startTime = this.$store.state.baseline2StartTime
        this.clickCount = this.$store.state.base2Click
        localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setBaseline2StartTime",this.startTime)
    }

    this.rfuncs = rscripts[1].functions
    this.rdesc =  rscripts[1].desc
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
        ans['baseline2_answers'] = Array.from(this.checkList)
        ans['baseline2_duration'] = new Date().getTime() - this.$store.state.baseline2StartTime
        ans['baseline2_click'] = this.clickCount
        ans['baseline2_survey'] = this.surveys
        this.$store.commit("setBaseline2",ans)
        // if(this.$store.state.url === '/baseline'){
        //     this.$router.push('/vis_sub1_training')
        // }else{
        //     this.$router.push('/survey')
        // }
        if(this.$store.state.url === '/baseline_1'){
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
