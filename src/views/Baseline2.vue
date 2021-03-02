<template>
  <div class="baseline2">
      <h1>Baseline Condition2</h1>
      <p>This Vega program creates a basic bar chart. Mousing over the bars shows a tooltip with the bar value. </p>
      
      <p>For this task you will be asked a series of questions about the behavior of the code.
           Please answer the questions as quickly and completely as possible. 
           Once you have submitted an answer, you will not be able to go back and change it; 
           if at some point you feel that one of your previous answers was wrong, 
           please provide your new answer along with an explanation in the text box for the current question 
           <span style="color:orange">*</span>in addition<span style="color:orange">*</span> to your answer for the current question. </p>

        <p>You are free to interact with the Vega visualization and code visualizations as much as you would like for each question, 
            but you cannot change the code itself. You may collapse parts of the code using the buttons in the margin. 
            You can reset the visualization to the initial state by clicking ‘Parse’. 
        </p>

        <p>
            You are welcome to ask any questions about the task or programming environment at this point.
             You may continue to ask questions during the training questions. However, we cannot answer any questions once the study task has begun. 
        </p>

        <p>
            Press ‘Start’ when you are ready to begin this task. 
        </p>

        <p>
            Please take this opportunity to thoroughly explore all possible states or settings of the visualization.
             When you feel you have sufficiently explored the visualization and are ready to continue to the next step, press ‘Submit’. 
        </p>

        <h3>1. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox" v-bind:disabled="!isStart" v-model="answers[0]" /> <br>

        <h3>2. What is the name of the primary dataset being visualized? <span style="color:orange">*</span></h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox" tag = "mustAns" v-bind:disabled="!isStart" v-model="answers[1]" @input="inputAns"/> <br>

        <h3>3. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox"  v-bind:disabled="!isStart" v-model="answers[2]"/> <br> <br>

        <el-row>
            <el-button round class="baseline2Btn" style="background-color:purple" @click="parsePage">Parse</el-button>
            <el-button round class="baseline2Btn" style="background-color:green" :disabled="!allowSubmit" @click="submit">Submit</el-button>
        </el-row>
  </div>
</template>

<script>
import {judgeAllowSubmit} from '@/assets/js/utils.js'
export default {
  name: 'Baseline2',
  data () {
    return {
      isStart:true,
      answers:Array.from(new Array(3+1),(v,k) => ''),
      startTime:0,
      allowSubmit:false
    }
  },
  methods:{
    parsePage(){
        this.$router.go(0)
    },
    inputAns(){
        this.allowSubmit = judgeAllowSubmit(this.answers)
    },
    submit(){
        this.answers[this.answers.length - 1] = new Date().getTime() - this.startTime
        this.$store.commit('setBaseline2',this.answers)
        if(this.$store.state.url === '/instructions1'){
            this.$router.push('/vis_training')
        }else{
            this.$router.push('/survey')
        }
    },
  },
  mounted(){
    this.startTime = new Date().getTime()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .baseline2{
    margin-left: 20%;
    margin-right: 20%;
  }
  .bold{
    border: 0;
    border-top: 5px solid purple;
    opacity: 0.7;
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
  .baseline2Btn{
    height: 2em;
    width: 4em;
    font-size: 1em;
    color: white;
    opacity: 0.7;
    border: 1px solid white;
  }
</style>
