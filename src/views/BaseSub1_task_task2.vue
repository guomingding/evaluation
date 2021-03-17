<template>
  <div class="base_sub1_task">
      <h2 align='center'>Task for Text</h2>
      <hr class="bold"/>
      <!--
      <div>
        <p>
          该study task使用文本的方式来描述代码的数据清洗过程。
        </p>
        <p>
          在此task中，我们为您提供两个子任务（5个不同的函数和1段程序脚本），分别位于两个页面中。
        </p>
        <p>
          为了辅助您理解下面的函数及程序，然后完成相应的问题，我们还额外为您提供了数据清洗操作的输入表，以及函数的官方文档链接，在您需要时可以点击查阅。
        </p>
        <p>
          任务中所有的问题都是多选题，您需要从中挑选出您认为一定正确的选项，如果不确定某个选项是否正确，则不选择它；如果任何选项都不确定，那此题可以一个都不选。
        </p>
        <p>
          在您完成所有问题并确定不需要修改后，点击 <b>Next</b> 按钮以进入下一页。
        </p>
      </div>
      <hr class="bold"/>
      -->
      <el-container style="bmargin-bottom:50px" v-for="(v_q,k_q) in funcSelected" :key="k_q">
          <el-header height='25px'>
              <h2>{{k_q + 1}}</h2>
          </el-header>
          <el-main>
            <p>{{v_q.code}}</p>
                
            <el-row style="background:white">{{v_q.desc}}</el-row>
            <div style="background:white;margin-top:20px">
                <el-row style="margin-bottom:10px">1. 对于该函数所做的操作，以下说法正确的是：</el-row>
                <el-checkbox-group v-model="checkList[k_q]">
                    <el-checkbox style="margin-bottom:10px; margin-left:5px;display:block" 
                      v-for="(options_v,options_k) in options[k_q]"
                      :key="options_k"
                      :label="options_k"
                    >{{options_v}}</el-checkbox><br>
                </el-checkbox-group>
            </div>
            <div style="margin-top:20px;">
              <el-button @click="getTableData(k_q)" size='mini'>show table</el-button>
                <el-table
                    v-for="(table_val,table_idx) in tableHead[k_q]"
                    :key="table_idx"
                    :data="tableData[k_q][table_idx]"
                    :border="true"
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
                <h3><a :href="v_q.ref" @click="addClick" target="_blank">{{v_q.name}}</a></h3>
            </div>
          </el-main>
      </el-container>
      <div style="margin-bottom:30px">
        <el-row>
          6. 您认为文本对您完成这些函数对应的问题有多大帮助？
        </el-row>
        <el-radio-group v-model="surveys[0]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable1" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        
        <el-row>
          7. 您认为文本对解释这些函数的精确性有多高？
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

import {beaver1} from '@/assets/data/beaver1'
import {fish_encounters} from '@/assets/data/fish_encounters'
import {USArrests} from '@/assets/data/USArrests'
import {t1} from '@/assets/data/t1'
import {t2} from '@/assets/data/t2'
import {sleep} from '@/assets/data/sleep'

export default {
  name: 'BaseSub1_task',
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
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1),
      surveys:new Array(2)
    }
  },
  mounted(){

    //要考虑到刷新页面的情况
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      this.startTime = this.$store.state.baseline1StartTime_task2
      this.clickCount = this.$store.state.base1Click
      localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setBaseline1StartTime_task2",this.startTime)
    }
    for(let idx = 10;idx < 15;idx ++){
      this.funcSelected.push(rfunctions[idx])
    }

    this.sevenTable1[0] = "1(没有用处)"
    this.sevenTable1[6] = "7(非常有用)"
    this.sevenTable2[0] = "1(精确性低)"
    this.sevenTable2[6] = "7(精确性高)"
  },
  methods:{
    getTableData(i){
      console.log(this.allTableData[i])
      if(this.isClicked[i])return

      for(let idx = 0;idx < this.allTableHead[i].length;idx++){
        this.tableHead[i].push(this.allTableHead[i][idx])
      }

      for(let idx = 0;idx < this.allTableData[i].length;idx++){
        this.tableData[i].push(this.allTableData[i][idx])
      }

      this.isClicked[i] = true
      this.addClick()
    },
    // parsePage(){
    //   this.$store.commit("setBase1Click",this.clickCount)
    //   localStorage.setItem("store",JSON.stringify(this.$store.state))
    //   this.$router.go(0)
    // },
    next(){
        let ans = {}
        ans['baseline1_answers_task2'] = Array.from(this.checkList)
        ans['baseline1_duration_task2'] = new Date().getTime() - this.$store.state.baseline1StartTime_task2
        ans['baseline1_click_task2'] = this.clickCount
        ans['baseline1_survey_task2'] = this.surveys

        this.$store.commit("setBaseline1_task2",ans)
        // this.$router.push('/base_sub2_task')
        
        this.$router.push('/base_sub2_task_task2')
        
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
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
