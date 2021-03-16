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
                <h3><a :href="v_q.ref" @click="addClick" target="_blank">{{v_q.name}}</a></h3>
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

import {starwars} from '@/assets/data/starwars'
import {airquality} from '@/assets/data/airquality'
import {mtcars} from '@/assets/data/mtcars'
import {band_members} from '@/assets/data/band_members'
import {band_instruments} from '@/assets/data/band_instruments'
import {CO2} from '@/assets/data/CO2'
export default {
  name: 'BaseSub1_task',
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
          'name列为left_join的key列（连接列）',
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
      fiveTable:Array.from(new Array(5),(v,k) => k + 1),
      surveys:new Array(5)
    }
  },
  mounted(){
    //要考虑到刷新页面的情况
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      this.startTime = this.$store.state.baseline1StartTime
      this.clickCount = this.$store.state.base1Click
      localStorage.removeItem("store")
    }else{
        this.clickCount = 0
        this.startTime = new Date().getTime()
        this.$store.commit("setBaseline1StartTime",this.startTime)
    }
    for(let idx = 5;idx < 10;idx ++){
      this.funcSelected.push(rfunctions[idx])
    }

    this.fiveTable[0] = "1(没有用处)"
    this.fiveTable[4] = "5(非常有用)"
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
    parsePage(){
      this.$store.commit("setBase1Click",this.clickCount)
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        let ans = {}
        ans['baseline1_answers'] = Array.from(this.checkList)
        ans['baseline1_duration'] = new Date().getTime() - this.$store.state.baseline1StartTime
        ans['baseline1_click'] = this.clickCount
        ans['baseline1_survey'] = this.surveys

        this.$store.commit("setBaseline1",ans)
        // this.$router.push('/base_sub2_task')
        if(this.$store.state.url === '/baseline_1' || this.$store.state.url === '/visualization_1'){
          this.$router.push('/base_sub2_task')
        }else if(this.$store.state.url === '/baseline_2'){
          this.$router.push('/visualization_2')
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
  .base_sub1_task{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
