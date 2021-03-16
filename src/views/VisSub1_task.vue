<template>
  <div class="vis_sub1_task">
      <h2 align='center'>Task for Visualization</h2>
      <hr class="bold"/>
      <el-container style="background:#DCDFE6;margin-bottom:50px" v-for="(v_q,k_q) in funcSelected" :key="k_q">
          <el-header height='25px'>
              <h2>{{k_q + 1}}</h2>
          </el-header>
          <el-main>
            <p>{{v_q.code}}</p>
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

                    <el-row>2. 您认为该文本/可视化(glyph)对辅助您理解该行代码有多大用处？</el-row>
                    <el-radio-group v-model="surveys[k_q]">
                      <el-radio v-for="(seven_v1,seven_k1) in fiveTable" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
                    </el-radio-group>
                </div>
            </el-main>
      </el-container>
      <el-row style="text-align:center">
          <el-button round class="trainingBtn" style="background:yellow" @click="parsePage" border><span style="color:black">Parse</span></el-button>
          <el-button round class="trainingBtn" type="success" @click="next" border><span style="color:black">Next</span></el-button>
      </el-row>
  </div>
</template>

<script>
import {rfunctions} from '@/assets/js/rfunc'
import {beaver1} from '@/assets/data/beaver1'
import {fish_encounters} from '@/assets/data/fish_encounters'
import {USArrests} from '@/assets/data/USArrests'
import {t1} from '@/assets/data/t1'
import {t2} from '@/assets/data/t2'
import {sleep} from '@/assets/data/sleep'
import {sub1Svgs} from '@/assets/js/vis_sub1_svgs'

export default {
  name: 'VisSub1_task',
  data () {
    return {
      clickCount:0,
      startTime:'',
      funcSelected:[],
      allTableData: [[beaver1],[fish_encounters],[USArrests],[t1,t2],[sleep]],
      allTableHead: [[Object.keys(beaver1[0])],[Object.keys(fish_encounters[0])],[Object.keys(USArrests[0])],
        [Object.keys(t1[0]),Object.keys(t2[0])],[Object.keys(sleep[0])]],
      tableData: Array.from(new Array(5),()=>[]),
      tableHead: Array.from(new Array(5),()=>[]),
      isClicked: Array.from(new Array(5),()=>false),
      checkList: Array.from(new Array(5),()=>[]),

      options:[
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          '该操作不会使得输入表与输出表的列数发生变化',
          'beaver1_distinct表中的day列不存在相同内容的单元格',
          'beaver1_distinct表中的activ列可能存在相同内容的单元格',
          '以上说法都不对',
        ],
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          '该操作不会使得输入表与输出表的列数发生变化',
          'fish_encounters_filter表中的fish列的单元格内容全部大于4850',
          '该行代码表示筛选出符合条件的行，筛选时函数中的两个条件任意满足一个即可',
          '以上说法都不对',
        ],
        [
          '保留了第2到4列',
          '删除了第2到4列',
          '删除了第2、第4行',
          '删除了第2、第4列',
          '以上说法都不对',
        ],
        [
          'table_merge 中的行数等于 table1的行数与table2的行数之和',
          'table_merge 中的列数等于 table1的列数与table2的列数之和',
          'table_merge 中的country列中的任何一个单元格内容，都能在table1及table2中的country列找得到相同内容的单元格',
          '以上说法都不对',
        ],
        [
          '该操作不会使得输入表与输出表的行数发生变化',
          'sleep_gather表中的列数比sleep表中的列数多2列',
          `sleep_gather表中name列里的单元格内容要么是'extra'，要么是'group'`,
          'sleep表中的extra, group两列里的单元格内容作为了sleep_gather表中的num列里的单元格内容',
          '以上说法都不对'
        ]
      ],
      fiveTable:Array.from(new Array(5),(v,k) => k + 1),
      surveys:new Array(5),
      svgsToShow:[]
    }
  },
  mounted(){
    //要考虑到刷新页面的情况
    this.svgsToShow = sub1Svgs
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      this.startTime = this.$store.state.visualization1StartTime
      this.clickCount = this.$store.state.vis1Click
      localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setVisualization1StartTime",this.startTime)
    }

    for(let idx = 10;idx < 15;idx ++){
      this.funcSelected.push(rfunctions[idx])
    }

    this.fiveTable[0] = "1(没有用处)"
    this.fiveTable[4] = "5(非常有用)"
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
      this.addClick()
      // SVGZoomAndPan()
    },
    parsePage(){
      this.$store.commit("setVis1Click",this.clickCount)
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
      let ans = {}
      ans['visualization1_answers'] = Array.from(this.checkList)
      ans['visualization1_duration'] = new Date().getTime() - this.$store.state.visualization1StartTime
      ans['visualization1_click'] = this.clickCount
      ans['visualization1_survey'] = this.surveys
      this.$store.commit("setVisualization1",ans)
      // this.$router.push('/vis_sub2_task')
      if(this.$store.state.url === '/baseline_1' || this.$store.state.url === '/visualization_1'){
      this.$router.push('/vis_sub2_task')
      }else if(this.$store.state.url === '/baseline_2'){
        this.$router.push('/survey')
      }else{
        this.$router.push('/baseline_2')
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
  .vis_sub1_task{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
