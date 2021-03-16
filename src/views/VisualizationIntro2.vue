<template>
  <div class="VisualizationIntro">
    <h2 align='center'>Introduction</h2>
    <hr class="bold"/>
    <div>
      <p>
        本次实验我们想分别对比 <b>文本</b> 和 <b>可视化</b> 对于描述代码的数据清洗过程能提供多大的帮助。
      </p>
      <p>
        为此，我们将为您提供两个study tasks，一个是用文本的方式来描述代码的数据清洗过程，另一个是用可视化的方式来描述。每个study task都包含两个子任务，分别是5个不同的函数及1段程序脚本，您可以根据我们提供的文本或可视化来辅助理解其中的数据清洗过程，然后尽可能地快速回答完我们提供的问题。在做每个study task之前，我们都会先为您提供一个training task，并给您介绍相应的背景知识，让您更熟悉task的流程。在training task的过程中，您可以问我任何问题，但是一旦当您开始做study task，我将不会回答您提的问题。
      </p>
      <p>
        在完成两个study tasks之后，我们将为您提供一份问卷调查，并收集您的一些基本信息。
      </p>
    </div>
    <!--
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
    -->

    <el-row>
      <el-button round class="el-next" type="success" @click="toTraining"><span style="color:black">Next</span></el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VisualizationIntro',
  methods:{
    toTraining(){
      // this.$router.push('/vis_sub1_training')
      if(this.$store.state.url === '/baseline_2' || this.$store.state.url === '/visualization_2'){
        this.$router.push('/vis_sub2_training')
      }
    }
  },
  mounted(){
    // this.$store.commit('setUrl',this.$route.path)
    // if(this.$route.path === '/visualization_1'){
    //   this.$router.push('/vis_sub1_training')
    // }else{
    //   this.$router.push('/vis_sub2_training')
    // }
    if(this.$store.state.url === ''){
      this.$store.commit('setUrl',this.$route.path)
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .VisualizationIntro{
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


</style>
