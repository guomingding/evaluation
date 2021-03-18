<template>
  <div class="vis_sub1_task">
      <h2 align='center'>Task for Visualization</h2>
      <hr class="bold"/>
      <el-container style="margin-bottom:50px" v-for="(v_q,k_q) in funcSelected" :key="k_q">
          <el-header height='25px'>
              <h2>{{k_q + 1}}</h2>
          </el-header>
          <el-main>
            <p>{{v_q.code}}</p>
                <!-- <el-row style="background:white">{{v_q.desc}}</el-row> -->
                <!-- <img :src="picPaths[k_q]" alt=""/> -->
                <div v-html="svgsToShow[k_q]"></div>
                <div style="background:white;margin-top:20px">
                    <el-row style="margin-bottom:10px;">1. 对于该函数所做的操作，以下说法正确的是：</el-row>
                    <el-checkbox-group v-model="checkList[k_q]">
                        <el-checkbox style="margin-bottom:10px; margin-left:5px;display:block" 
                          v-for="(options_v,options_k) in options[k_q]"
                          :key="options_k"
                          :label="options_k"
                        >{{options_v}}</el-checkbox><br>
                    </el-checkbox-group>
                </div>

                <div style="margin-top:20px">
                   <el-button @click="getTableData(k_q)" size='mini'>show table</el-button>
                <el-table
                  v-for="(table_val,table_idx) in tableHead[k_q]"
                  :key="table_idx"
                  :data="tableData[k_q][table_idx]"
                  style="width: 100%;margin-bottom:10px" :border="true"
                  max-height="500"
                  >
                  <el-table-column
                      v-for="(v_t,k_t) in table_val"
                      :key="k_t"
                      :label="v_t"
                      :prop="v_t"
                      >
                  </el-table-column>
                </el-table>
                <h3><a :href="v_q.ref" @click="addCount" target="_blank">{{v_q.name}}</a></h3>
                </div>
            </el-main>
      </el-container>
       <div style="margin-bottom:30px">
        <el-row>
          6. 您认为可视化对您完成这些函数对应的问题有多大帮助？
        </el-row>
        <el-radio-group v-model="surveys[0]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable1" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        
        <el-row>
          7. 您认为可视化对解释这些函数的精确性有多高？
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
import {rfunctions} from '@/assets/js/rfunc'
import {starwars} from '@/assets/data/starwars'
import {airquality} from '@/assets/data/airquality'
import {mtcars} from '@/assets/data/mtcars'
import {band_members} from '@/assets/data/band_members'
import {band_instruments} from '@/assets/data/band_instruments'
import {CO2} from '@/assets/data/CO2'
import {sub1Svgs} from '@/assets/js/vis_sub1_svgs_task1'

export default {
  name: 'VisSub1_task',
  data () {
    return {
      clickCount:0,
      startTime:'',
      funcSelected:[],
        allTableData: [[starwars],[airquality],[mtcars],[band_members,band_instruments],[CO2]],
      allTableHead: [[Object.keys(starwars[0])],[Object.keys(airquality[0])],[Object.keys(mtcars[0])],
        [Object.keys(band_members[0]),Object.keys(band_instruments[0])],[Object.keys(CO2[0])]],
      tableData: Array.from(new Array(5),()=>[]),
      tableHead: Array.from(new Array(5),()=>[]),
      isClicked: Array.from(new Array(5),()=>false),
      checkList: Array.from(new Array(5),()=>[]),

           options:[
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          '该操作不会使得输入表与输出表的列数发生变化',
          'starwars_count表中存在eye_color列，且eye_color列可能存在重复的值',
          'starwars_count表中不存在eye_color列',
          '以上说法都不对',
        ],
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          '该操作不会使得输入表与输出表的列数发生变化',
          'airquality_subset 表中的Temp列的单元格内容全部大于90',
          '该行代码表示筛选出符合条件的行，筛选时函数中的两个条件任意满足一个即可',
          '以上说法都不对',
        ],
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          '该操作不会使得输入表与输出表的列数发生变化',
          'mtcars_summarise表仅含有一列mean，该列中仅有一个单元格，其内容为mtcars表中disp列的均值',
          'mtcars_summarise表相比mtcars表新增了一列mean，该列全部的单元格内容都一样，为mtcars表中disp列的均值',
          '以上说法都不对',
        ],
        [
          'name列为inner_join的key列（连接列）',
          'band_members和band_instruments中的列在 band_join表中都存在',
          'band_members的name列下的所有单元格在 band_join中都存在',
          'band_instruments的name列下的所有单元格在band_join中都存在',
          '以上说法都不对',
        ],
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          '该操作不会使得输入表与输出表的列数发生变化',
          `该操作将CO2表中的uptake列按照 '.' 分隔符拆分成了int和decimal两列，且删除了uptake列`,
          'CO2_separate表存在uptake列',
          '以上说法都不对',
        ]
      ],
      svgsToShow:[],
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1),
      surveys:new Array(2)
    }
  },
  mounted(){
    //要考虑到刷新页面的情况
    this.svgsToShow = sub1Svgs
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      this.startTime = this.$store.state.visualization1StartTime_task1
      this.clickCount = this.$store.state.vis1Click
      localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setVisualization1StartTime_task1",this.startTime)
    }

    for(let idx = 5;idx < 10;idx ++){
      this.funcSelected.push(rfunctions[idx])
    }

    this.sevenTable1[0] = "1(没有用处)"
    this.sevenTable1[6] = "7(非常有用)"
    this.sevenTable2[0] = "1(精确性低)"
    this.sevenTable2[6] = "7(精确性高)"
  },
  methods:{
    getTableData(i){
      if(this.isClicked[i])return

      for(let idx = 0;idx < this.allTableHead[i].length;idx++){
        this.tableHead[i].push(this.allTableHead[i][idx])
      }

      for(let idx = 0;idx < this.allTableData[i].length;idx++){
        this.tableData[i].push(this.allTableData[i][idx])
      }
      this.isClicked[i] = true
      this.addCount()
      // SVGZoomAndPan()
    },
    parsePage(){
      this.$store.commit("setVis1Click",this.clickCount)
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
      let ans = {}
      ans['visualization1_answers_task1'] = Array.from(this.checkList)
      ans['visualization1_duration_task1'] = new Date().getTime() - this.$store.state.visualization1StartTime_task1
      ans['visualization1_click_task1'] = this.clickCount
      ans['visualization1_survey_task1'] = this.surveys
      this.$store.commit("setVisualization1_task1",ans)
      // this.$router.push('/vis_sub2_task')
      
      this.$router.push('/vis_sub2_task_task1')
  
    },
    addCount(){
      this.clickCount += 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vis_sub1_task{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
