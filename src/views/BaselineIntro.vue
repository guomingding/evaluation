<template>
  <div class="BaseInstroduction">
    <h2 align='center'>Instructions</h2>
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
       <el-button round class="el-next" style="background:green" @click="toTraining"><span style="color:black">Next</span></el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BaseInstroduction',

  methods:{
    toTraining(){
      this.$router.push('/base_sub1_training')
    }
  },
  mounted(){
    this.$store.commit('setUrl',this.$route.path)
    // this.$store.commit('setFuncsSelectedInTraining',[])
    // this.$store.commit('setScriptSelectedInTraining',[])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .BaseInstroduction{
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
</style>
