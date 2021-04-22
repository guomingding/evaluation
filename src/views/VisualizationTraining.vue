<template>
  <div class="visTraining">
        <h1>Code Visualizations: </h1>
        <p>Code visualizations appear for two types of Vega tokens (signals and data fields) while interacting with the Vega visualization. 
            Here is a brief description of the code visualizations you may see. 
            Mousing over the code visualization provides additional details such as the 
            value of the signal (line/tick) or the number of values for that range in the dataset (histogram). 
        </p>

        <img src="@/assets/images/logo.png" alt=""/>
        
        <br>
        <br>
        <el-row>
            <el-button round class="nextBtn" style="background-color:green" @click="next">Next</el-button>
        </el-row>
  </div>
</template>

<script>
export default {
  name: 'Baseline',
  data () {
    return {
      isStart:false,
      answers:new Array(3)
    }
  },
  methods:{
    next(){
        this.$router.push('/visualization') //to fill
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .visTraining{
    margin-left: 10%;
    margin-right: 10%;
  }
  
  img{
      width: 50%;
  }

  p{
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
  .nextBtn{
    height: 2em;
    width: 4em;
    font-size: 1em;
    color: white;
    opacity: 0.7;
    border: 1px solid white;
  }
</style>
