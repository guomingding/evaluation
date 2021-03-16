<template>
  <div class="base_sub1_training">
      <h2 align='center'>Training Task for Text</h2>
      <hr class="bold"/>
      <div>
        <p>
          该training task使用 <b>文本</b> 的方式来描述代码的数据清洗过程。
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
      <el-container style="margin-bottom:50px" v-for="(v_q,k_q) in funcSelected" :key="k_q">
          <el-header height='25px'>
              <h2>{{k_q + 1}}</h2>
          </el-header>
          <el-main>
            <p>{{v_q.code}}</p>
               
            <el-row style="background:white">{{v_q.desc}}</el-row>
            <div style="background:white;margin-top:20px">
                <el-row style="margin-bottom:10px;">{{k_q + 1}}. 对于该函数所做的操作，以下说法正确的是：</el-row>
                <el-checkbox-group v-model="checkList[k_q]" @change="showChoices">
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
                :data="tableData[k_q]"
                style="width: 100%"
                border
                max-height="500">
                <el-table-column
                    v-for="(v_t,k_t) in tableHead[k_q]"
                    :key="k_t"
                    :label="v_t"
                    :prop="v_t"
                    >
                </el-table-column>
              </el-table>
            </div>
           
            <h3><a :href="v_q.ref" target="_blank">{{v_q.name}}</a></h3>
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
import {rfunctions} from '@/assets/js/rfunc'

import {longley} from '@/assets/data/longley'
import {women} from '@/assets/data/women'
import {iris} from '@/assets/data/iris'
import {trees} from '@/assets/data/trees'
import {InsectSprays} from '@/assets/data/InsectSprays'
export default { 
  name: 'BaseSub1_training',
  data () {
    return {
      funcSelected:[],
      allTableData: [longley,women,iris,trees,InsectSprays],
      allTableHead: [Object.keys(longley[0]),Object.keys(women[0]),Object.keys(iris[0]),Object.keys(trees[0]),Object.keys(InsectSprays[0])],
      isClicked: Array.from(new Array(5),()=>false),
      checkList: Array.from(new Array(5),()=>[]),
      tableData: Array.from(new Array(5),()=>[]),
      tableHead: Array.from(new Array(5),()=>[]),
      options:[
        [
          "该操作不会使得输入表与输出表的行数发生变化",
          "该操作不会使得输入表与输出表的列数发生变化",
          "该操作将Unemployed列与Employed列相加，得到longley_mutate表中的people列",
          "该操作将Unemployed列与Employed列做字符串拼接，得到longley_mutate表中的people列",
          "以上说法都不对"
        ],
        [
          "该操作不会使得输入表与输出表的行数发生变化",
          "该操作不会使得输入表与输出表的列数发生变化",
          "该操作选取women表中的第62, 130行",
          "该操作在women表的基础上，创建一列，其内容为：62，130",
          "该操作在women表的基础上，创建一行，其内容为：62，130",
        ],
        [
          "将表中所有值为 'Petal.Length' 的单元格替换成 'petal_length'",
          "筛选出Petal.Length列和petal_length列相等的行",
          "将petal_length列重命名为Petal.Length",
          "新建一列petal_length，其内容和Petal.Length列一致",
          "以上说法都不对"
        ],
        [
          "该操作不会使得输入表与输出表的列数发生变化",
          "该操作删除Girth列",
          "该操作只保留Girth列",
          "trees_arrange表中Girth列可能存在值为8的单元格排在10的前面",
          "以上说法都不对"
        ],
        [
          "该操作不会使得输入表与输出表的行数发生变化",
          "该操作不会使得输入表与输出表的列数发生变化",
          "InsectSprays_unique表中一定没有重复的行",
          "以上说法都不对"
        ]
      ],
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1),
      surveys:new Array(2)
    }
  },

  mounted(){
    this.sevenTable1[0] = "1(没有用处)"
    this.sevenTable1[6] = "7(非常有用)"
    this.sevenTable2[0] = "1(精确性低)"
    this.sevenTable2[6] = "7(精确性高)"
    for(let idx = 0;idx < 5;idx ++){
      this.funcSelected.push(rfunctions[idx])
    }
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
    },
    showChoices(){
        console.log(this.checkList)
    },
    parsePage(){
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
        // this.$router.push('/base_sub2_training')
        if(this.$store.state.url === '/baseline_1' || this.$store.state.url === '/visualization_1'){
            this.$router.push('/base_sub2_training')
        }else{
            this.$router.push('/base_sub2_task')
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base_sub1_training{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }
</style>
