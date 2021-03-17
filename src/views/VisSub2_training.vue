<template>
  <div class="vis_sub2_training">
      <el-container style="margin-bottom:50px">
          <el-header height='25px'>
              <h2>R script</h2>
          </el-header>
          <el-main>
            <p>ibrary(dplyr)<br>
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
               

                <div style="height:300;display:flex;justify-content:center"> 
                  <div v-html="svgToShow" id="mainsvg" ></div>
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
                    <a v-for="(v_f,k_f) in rfuncs.name" :key="k_f" :href="rfuncs.refs[k_f]" style="margin-right:30px" target="_blank">{{v_f}}</a>
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
import {warpbreaks} from '@/assets/data/warpbreaks'
import Panzoom from '@panzoom/panzoom'
import {traingSvg} from '@/assets/js/vis_training2_svg'
export default {
  name: 'VisSub2_training',
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
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1),
      surveys:new Array(2),
      svgToShow:''
    }
  },
  mounted(){
    let idxs = []
    if(localStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
        localStorage.removeItem("store")
    }
    this.rfuncs = rscripts[0].functions
    this.rdesc =  rscripts[0].desc
    // let path = rscripts[0].glyph
    // this.picPath = require("../assets/images/" + path)
    // this.picPath = "@/assets/images/" + path
    this.svgToShow = traingSvg[0]

    const elem = document.getElementById("mainsvg")
    const panzoom = Panzoom(elem, {
      maxScale: 5
    })
    panzoom.pan(10, 10)
    panzoom.zoom(1, { animate: true })
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
    },
    parsePage(){
      localStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.go(0)
    },
    next(){
      // this.$router.push('/vis_sub1_task')
      if(this.$store.state.url === '/baseline_1' || this.$store.state.url === '/visualization_1'){
        this.$router.push('/vis_sub1_task')
      }else{
        this.$router.push('/vis_sub1_task_task1')
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vis_sub2_training{
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

</style>
