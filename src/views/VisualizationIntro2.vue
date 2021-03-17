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
    <h2>Demographic Information</h2>

    <p>姓名（Name）：</p><input type="text" class="inputBox" v-model="name"/><br><br>
    
    <p>性别（Gender）：</p>
      <el-radio v-model="gender" label="1">男</el-radio>
      <el-radio v-model="gender" label="2">女</el-radio><br><br>
    
    <p>年龄（Age）：</p><input type="text" class="inputBox" v-model="age"/><br><br>
    
    <p>邮箱（Email）：</p><input type="text" class="inputBox" v-model="Email"/><br><br>
    
    <p>职位（Position）：（例如 2nd year PhD student, faculty, analyst等）</p><input type="text" class="inputBox" v-model="Position"/><br><br>
    
    <p>编程经验（Programming Experience）：</p><input type="text" class="inputBox" v-model="Programming_Experience"/><br><br>
    
    <p>数据清洗经验（Experience in Data Wrangling）:</p><input type="text" class="inputBox" v-model="DW_Experience"/><br><br>
    
    <el-row>
      <el-button round class="el-next" type="success" @click="toTraining"><span style="color:black">Next</span></el-button>
    </el-row>
     <div style="margin-top:30px"><a href="https://pgdw.projects.zjvis.org/static/img/arrow.5def0e8d.png" target="_blank">get arrow</a></div>
    
  </div>
</template>

<script>
export default {
  name: 'VisualizationIntro',
  data(){
    return{
      name:'',
      gender:'',
      age:'',
      Email:'',
      Position:'',
      Programming_Experience:'',
      DW_Experience:'',
    }
  },
  methods:{
    toTraining(){
      // this.$router.push('/vis_sub1_training')
     
      this.$router.push('/vis_sub1_training')
      
    }
  },
  mounted(){
    // this.$store.commit('setUrl',this.$route.path)
    // if(this.$route.path === '/visualization_1'){
    //   this.$router.push('/vis_sub1_training')
    // }else{
    //   this.$router.push('/vis_sub2_training')
    // }
    let selfInf = {}
    selfInf['name'] = this.name
    selfInf['gender'] = this.gender
    selfInf['age'] = this.age
    selfInf['email'] = this.Email
    selfInf['position'] = this.Position
    selfInf['Programming_Experience'] = this.Programming_Experience
    selfInf['DW_Experience'] = this.DW_Experience
    this.$store.commit("setUserInf",selfInf)

    this.$store.commit('setUrl',this.$route.path)
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
