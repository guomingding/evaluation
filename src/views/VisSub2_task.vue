<template>
  <div class="vis_sub2_task">
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
              
                <!-- <el-row style="background:white;margin-top:20px">{{rdesc}}</el-row> -->
                <div style="height:300">
                  <div v-html="svgToShow" id="mainsvg"></div>
                </div>
                <div style="background:white;margin-top:20px"  v-for="(v_q,k_q) in questions" :key="v_q">
                    <el-row style="margin-bottom:10px">{{v_q}}</el-row>
                    <el-checkbox-group v-model="checkList[k_q]">
                        <el-checkbox v-for="(v_opt,k_opt) in options[k_q]" :key="k_opt" :label="v_opt" border>{{v_opt}}</el-checkbox>
                    </el-checkbox-group>
                    <br>
                </div>

                <div v-for="(v_s,k_s) in tableData" :key="k_s" style="margin-top:20px">
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
                    <a v-for="(v_f,k_f) in rfuncs.name" :key="k_f" :href="rfuncs.refs[k_f]" style="margin-right:30px" @click="addCount" target="_blank">{{v_f}}</a>
                </el-row>
            </el-main>
      </el-container>
      <div style="margin-bottom:30px">
        <el-row>
          6. 您认为可视化对您完成这段程序对应的问题有多大帮助？
        </el-row>
        <el-radio-group v-model="surveys[0]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable1" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        
        <el-row>
          7. 您认为可视化对解释这段程序的精确性有多高？
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
import Panzoom from '@panzoom/panzoom'
import {sub2Svg} from '@/assets/js/vis_sub2_svg'
export default {
  name: 'BaseSub2_task',
  data () {
    return {
      rfuncs:{},
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
      surveys:new Array(2),
      svgToShow:''
    }
  },
  mounted(){
    this.svgToShow = sub2Svg[0]
    if(localStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
        this.startTime = this.$store.state.visualization2StartTime
        this.clickCount = this.$store.state.vis2Click
        localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setVisualization2StartTime",this.startTime)
    }

    this.rfuncs = rscripts[2].functions
  
    const elem = document.getElementById("mainsvg")
    const panzoom = Panzoom(elem, {
      maxScale: 10
    })
    // panzoom.pan(10, 10)
    // panzoom.zoom(1, { animate: true })
    elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)

    this.sevenTable1[0] = "1(没有用处)"
    this.sevenTable1[6] = "7(非常有用)"
    this.sevenTable2[0] = "1(精确性低)"
    this.sevenTable2[6] = "7(精确性高)"
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
        this.addCount()
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
        ans['visualization2_survey'] = this.surveys

        console.log("ans in vis_task2",ans)
        this.$store.commit("setVisualization2",ans)

      if(this.$store.state.url === '/baseline_2' || this.$store.state.url === '/visualization_2'){
        this.$router.push('/vis_sub1_task')
      }else if(this.$store.state.url === '/baseline_1'){
        this.$router.push('/survey')
      }else{
        this.$router.push('/base_sub1_training')
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
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
