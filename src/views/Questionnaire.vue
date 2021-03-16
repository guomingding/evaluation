<template>
  <div class="questionnaire">
      <h1>Post­-Task Survey</h1>
      <p>你已经完成了本次实验的所有任务。根据您在完成这两个study tasks的经历，请回答以下问题：</p>


        <!-- <h3>1. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox" v-bind:disabled="!isStart" v-model="answers[0]"/> <br>

        <h3>2. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox"  v-bind:disabled="!isStart" v-model="answers[1]"/> <br>

        <h3>3. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox"  v-bind:disabled="!isStart" v-model="answers[2]"/> <br> <br> -->

        <div class="answers">
          <el-row>
          1. 您觉得tasks中的文本和可视化相比，哪种方式对您完成这些task的帮助更大？
        </el-row>
        <el-radio-group v-model="answers[0]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable1" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        <br><br>

        <el-row>
          2. 您觉得tasks中的文本和可视化相比，哪种方式解释代码会更加清楚？
        </el-row>
        <el-radio-group v-model="answers[1]">
          <el-radio v-for="(seven_v1,seven_k1) in sevenTable2" :key="seven_k1" :label="seven_k1">{{seven_v1}}</el-radio>
        </el-radio-group>
        <br><br>

        <el-row>
          3. 请针对可视化描述代码的方式给出您的看法或建议
        </el-row>
         <input type="text" class="inputBox" v-model="suggestion"/> <br> <br>
        <br><br>
     
        </div>
        <el-row>
          <el-button round class="el-next" type="success" @click="submit"><span style="color:black">Next</span></el-button>
        </el-row>
  </div>
</template>

<script>
export default {
  name: 'Questionnaire',
  data () {
    return {
      isStart:true,
      answers:new Array(2),
      suggestion:'',
      
      submitTimes:0,
      sevenTable1:Array.from(new Array(7),(v,k) => k + 1),
      sevenTable2:Array.from(new Array(7),(v,k) => k + 1)
    }
  },
  beforeMount(){
    this.sevenTable1[0] = "1(文本更有帮助)"
    this.sevenTable1[6] = "7(可视化更有帮助)"
    this.sevenTable2[0] = "1(文本更加清楚)"
    this.sevenTable2[6] = "7(可视化更加清楚)"
  },
  methods:{
    // parsePage(){
    //     this.$router.go(0)
    // },
    submit(){
      //只能提交一次
      console.log("clicked")
      if(this.submitTimes !== 0){
        alert("already submitted!")
        return
      }

      let data = {}
      data['survey'] = this.answers
      data["suggestion"] = this.suggestion
    
      data['baseline1'] = this.$store.state.baseline1
      data['baseline2'] = this.$store.state.baseline2
      data['visualization1'] = this.$store.state.visualization1
      data['visualization2'] = this.$store.state.visualization2
      data['group'] = this.$store.state.url
      data['userInf'] = this.$store.state.userInf

      this.$axios({
        headers:{
          "Content-Type":"application/x-www-form-urlencoded;charset-utf-8"
        },
        url:'/api/getSurvey',
        method:'post',
        data:this.$qs.stringify(data)
      }).then(res => {
        if(res.data === 'True'){
          alert("submit success!")
          this.submitTimes += 1
        }else{
          alert("submit fail!")
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .questionnaire{
    margin-left: 10%;
    margin-right: 10%;
  }

  .answers{
    text-align: left;
  }
  h3,p{
    text-align: left;
  }
  .inputBox{
    width: 100%;
    float: left;
    border: #878787;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 2px;
    border-style: solid;
  }
</style>

