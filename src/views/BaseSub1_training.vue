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
      <el-container style="background:#DCDFE6;margin-bottom:50px" v-for="(v_q,k_q) in funcSelected" :key="k_q">
          <el-header height='25px'>
              <h2>{{k_q + 1}}</h2>
          </el-header>
          <el-main>
            <p>{{v_q.code}}</p>
                <el-button @click="getTableData(k_q)" size='mini'>show table</el-button>
                <el-table
                    :data="tableData[k_q]"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                        v-for="(v_t,k_t) in tableHead[k_q]"
                        :key="k_t"
                        :label="v_t"
                        :prop="v_t"
                        >
                    </el-table-column>
                </el-table>
                <h3><a :href="v_q.ref" target="_blank">{{v_q.name}}</a></h3>
                <el-row style="background:white">{{v_q.desc}}</el-row>
                <div style="background:white;margin-top:20px">
                    <el-row style="margin-bottom:10px;">a question</el-row>
                    <el-checkbox-group v-model="checkList[k_q]" @change="showChoices">
                        <el-checkbox label="a" style="margin-bottom:10px; margin-left:5px">option1</el-checkbox><br>
                        <el-checkbox label="b" style="margin-bottom:10px; margin-left:5px">option2</el-checkbox><br>
                        <el-checkbox label="c" style="margin-bottom:10px; margin-left:5px">option3</el-checkbox><br>
                        <el-checkbox label="d" style="margin-bottom:10px; margin-left:5px">option4</el-checkbox>
                    </el-checkbox-group>
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
import {randomlySelect} from '@/assets/js/utils'
import Papa from 'papaparse'
import {tables} from '@/assets/data/tableData'
export default {
  name: 'BaseSub1_training',
  data () {
    return {
      funcSelected:[],
      tableData: Array.from(new Array(5),()=>[]),
      tableHead: Array.from(new Array(5),()=>[]),
      isClicked: Array.from(new Array(5),()=>false),
      checkList: Array.from(new Array(5),()=>[])
    }
  },

  mounted(){
    let idxs = []
    if(localStorage.getItem("store")){
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
      idxs = this.$store.state.funcsSelectedInTraining
      localStorage.removeItem("store")
    }else{
        let funcsInTraining = this.$store.state.funcsSelectedInTraining.length === 0 ? [] : this.$store.state.funcsSelectedInTraining
        console.log(funcsInTraining)
        if(this.$store.state.funcsSelectedInTraining.length !== 0){
          idxs = this.$store.state.funcsSelectedInTraining
        }else{
          idxs = randomlySelect(Array.from(new Array(rfunctions.length),(v,k) => k),funcsInTraining,5)
          this.$store.commit("setFuncsSelectedInTraining",idxs)
        }
    }
    console.log("idxs in training: ",idxs)
    for(let idx = 0;idx < idxs.length; idx++){
        this.funcSelected.push(rfunctions[idxs[idx]])
    }
  },
  methods:{
      getTableData(i){
        if(this.isClicked[i])return
        var data = Papa.parse(tables[i]).data;
        let objArr = []

        // this.tableHead[.push](data[0])
        this.tableHead[i] = data[0]
        this.tableHead.sort(function(a,b){
          return true
        })

        for(let row = 1;row < data.length;row++){
            let tempObj = {}
            for(let col = 0;col < data[0].length;col++){
                tempObj[data[0][col]] = data[row][col]
            }
            objArr.push(tempObj)
        }
        // this.tableData.push(objArr)
        this.tableData[i] = objArr
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
        this.$router.push('/base_sub2_training')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base_sub1_training{
    margin-left: 20%;
    margin-right: 20%;
    text-align: left;
  }
</style>
