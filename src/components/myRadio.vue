<template>
  <!-- <div id="container"> -->
    <!-- <hr /> -->
      <div class="radio">
        <slot name="left" id="leftSlot"/>
        <el-radio-group v-model="radio" id="choices">
            <el-radio v-for="(value,key) in choices"
                    :key="key" :label="value" class="choice">
                {{value}}
            </el-radio>
        </el-radio-group>
        <slot name="right" id="rightSlot"/>
      </div>
    <!-- <hr /> -->
  <!-- </div> -->
</template>
<script>

export default {
  data() {
    return {
      radio : ''
    };
  },
  props:{
      choices:{
          type:Array
      }
  },
  // methods: {
  //   sendChoice(){
  //       this.$emit("getChoice",this.radio)
  //       console.log(this.radio)
  //   }
  // },
};
</script>

<style scoped>
  .radio{ 
    /* margin-right: 10% auto; */
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
    justify-content: center;    /* 水平居中 */
  } 
  #choices{ 
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
  }
  #leftSlot{
    position: relative;
  }
  #rightSlot{
    position: relative;
  }
  /* #container{
    margin-right: 10%;
  } */
</style>
