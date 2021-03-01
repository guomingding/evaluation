<template>
  <div class="instruction">
    <h2 align='center'>Training</h2>
    <hr class="bold"/>
    <div class="introduction">
      <h3>Introduction</h3>
      <hr/>
      <p>to fill</p>
      <img src="@/assets/images/logo.png" alt=""/>
    </div>
    <hr class="bold"/>
    <div class="env">
      <h3>Code Environment</h3>
      <hr/>
      <p>to fill</p>
    </div>
    <hr class="bold"/>
    <div class="kw">
      <h3>Keywords</h3>
      <hr/>
      <p>to fill</p>
    </div>

    <el-row>
      <el-button round class="el-next" @click="toTraining">next</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    toTraining(){
      this.$router.push('/survey')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .instruction{
    margin-left: 10%;
    margin-right: 10%;
  }
  .bold{
    border: 0;
    border-top: 5px solid purple;
    opacity: 0.7;
  }

  h3,p{
    text-align: left;
  }

  .el-next{
    height: 2em;
    width: 4em;
    font-size: 1em;
    color: white;
    background-color:green;
    opacity: 0.7;
    border: 1px solid white;
  }
</style>
