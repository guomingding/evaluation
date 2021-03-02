<template>
  <div class="questionnaire">
      <h1>Questionnaire</h1>
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
        <input type="text" class="inputBox" v-bind:disabled="!isStart" v-model="answers[0]"/> <br>

        <h3>2. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox"  v-bind:disabled="!isStart" v-model="answers[1]"/> <br>

        <h3>3. What is the name of the primary dataset being visualized? </h3>
            <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
        <input type="text" class="inputBox"  v-bind:disabled="!isStart" v-model="answers[2]"/> <br> <br>

        <el-row>
            <!-- <el-button round class="surveyBtn" style="background-color:purple" @click="parsePage">Parse</el-button> -->
            <el-button round class="surveyBtn" style="background-color:green" @click="submit">Submit</el-button>
        </el-row>
  </div>
</template>

<script>
export default {
  name: 'Questionnaire',
  data () {
    return {
      isStart:true,
      answers:new Array(3),
      submitTimes:0
    }
  },
  methods:{
    // parsePage(){
    //     this.$router.go(0)
    // },
    submit(){
      //只能提交一次
      if(this.submitTimes !== 0){
        alert("already submitted!")
        return
      }
      let data = {}
      data['survey'] = this.answers
      data['baseline1'] = this.$store.state.baseline1
      data['baseline2'] = this.$store.state.baseline2
      data['visualization'] = this.$store.state.visualization
      data['group'] = this.$store.state.url
      this.$axios({
        headers:{
          "Content-Type":"application/x-www-form-urlencoded;charset-utf-8"
        },
        url:'http://localhost:80/api/getSurvey',
        method:'post',
        data:this.$qs.stringify(data)
      }).then(res => {
        alert("submit success!")
        this.submitTimes += 1
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .questionnaire{
    margin-left: 20%;
    margin-right: 20%;
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
  .surveyBtn{
    height: 2em;
    width: 4em;
    font-size: 1em;
    color: white;
    opacity: 0.7;
    border: 1px solid white;
  }
</style>

