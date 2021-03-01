<template>
  <div class="questions">
    <h1>Post­Task Survey</h1>
    <p>You have now completed all the tasks for this study. Please complete the following survey about your experience with the programming environment and code visualizations. </p>
    <p style="color:orange">* Required</p>
    <h3 id="q1">1. How quickly were you able to answer the task questions? *</h3>
    <p>Mark only one oval.</p>
    <hr />
    <my-radio :choices="radio1" class="radios">
      <p slot="left">Quicker with unedited <br>code</p>
      <p slot="right">Quicker with unedited<br>code</p>
    </my-radio>
    <hr />

    <h3 id="q2">2. How quickly were you able to answer the task questions? *</h3>
    <p>Mark only one oval.</p>
    <hr />
    <my-radio :choices="radio1" class="radios">
      <p slot="left">Quicker with unedited <br>code</p>
      <p slot="right">Quicker with unedited<br>code</p>
    </my-radio>
    <hr />

    <h3>3. Please share any other thoughts about your experience with the programming environment and code visualizations. </h3>
    <textarea placeholder="please input" rows="5" cols="60" v-model="input1"></textarea><br>

    <h2>Code Visualizations</h2>
    <p>During this study you saw a couple different types of code visualizations: line, tick, and histogram. Please  describe your experience with the various code visualizations.</p>
    <img src="@/assets/images/logo.png" alt=""/>

    <h3>4. How helpful was each visualization type for completing the tasks? <span style="color:orange">*</span></h3>
    <p style="font-style:italic;color:gray">Mark only one oval per row.</p>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />

    <h3>5. How interpretable was each visualization type for completing the tasks? <span style="color:orange">*</span></h3>
    <p style="font-style:italic;color:gray">Mark only one oval per row.</p>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />

    <h3>6. How intrusive was each visualization type while completing the tasks? <span style="color:orange">*</span></h3>
    <p style="font-style:italic;color:gray">Mark only one oval per row.</p>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />
     <my-radio :choices="radio2" class="radios" style="height:20px;">
      <p slot="left">Quicker with unedited</p>
    </my-radio>
    <hr />

    <h3>7. Please share any other thoughts about your experience with the code visualizations.  </h3>
    <textarea placeholder="please input" rows="5" cols="60" v-model="input2"></textarea><br>
    
    <h2>Demographic Information</h2>
    <h3>8.Name<span style="color:orange">*</span></h3>
    <input type="text" class="inputBox" v-model="name"/> <br>

    <h3>9.Email<span style="color:orange">*</span></h3>
    <p style="color:gray">What email would you like your gift card sent to?</p>
    <input type="text" class="inputBox" v-model="email"/> <br>

    <h3>10.Age<span style="color:orange">*</span></h3>
    <input type="text" class="inputBox" v-model="age"/> <br>

    <h3>11.Gender<span style="color:orange">*</span></h3>
    <p style="font-style:italic;color:gray">Mark only one oval per row.</p>
    <!-- <el-radio-group v-model="radio" style="float:left">
        <el-radio v-for="(value,key) in gender"
                :key="key" :label="value">
            {{value}}
        </el-radio>
        <el-radio>Other:</el-radio>
    </el-radio-group> -->
    <my-radio :choices="gender" class="radios" style="float:left;">
      <input type="text" slot="right" style="
        dispaly:block
        border: #878787; 
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-bottom-width: 2px;
        border-style: solid;" v-model="other"/> 
    </my-radio> <br><br>

    <h3>12.Organizational Affiliation<span style="color:orange">*</span></h3>
    <p style="color:gray">If your answer is the UW, please include your departmental affiliation as well.</p>
    <input type="text" class="inputBox" v-model="org"/> <br>

    <h3>13. Position<span style="color:orange">*</span></h3>
    <p style="color:gray">school year and/or position (e.g. 2nd year PhD student, faculty, etc.)</p>
    <input type="text" class="inputBox" v-model="position"/> <br>
    
    <h3>3. Please share any other thoughts about your experience with the programming environment and code visualizations. </h3>
    <textarea placeholder="please input" rows="5" cols="60"  v-model="input3"></textarea><br>

     <el-row>
      <el-button round class="el-submit" @click="getChildren">submit</el-button>
    </el-row>
  </div>
</template>
<script>
import myRadio from '@/components/myRadio'
export default {
  data() {
    return {
      radio: [1,2,3,4,5,6,7],
      radio1: [1,2,3,4,5,6,7],
      radio2: ["1(Not Helpful)",2,3,4,"5(Extremely Helpful)","N/A"],
      // textarea: '',
      input1:'',
      input2:'',
      input3:'',
      name:'',
      email:'',
      age:'',
      gender:["Female","Male","Prefer not to say","Other:"],
      org:'',
      position:'',
      other:''
    };
  },
  methods: {
    getChildren(){
      let data = {}
      this.$children.forEach((val,idx) =>{
        //是否需要处理原始结果 if(idx !== 0 && idx !== 1 && )
        if(idx !== this.$children.length - 1){
          let obj = {}
          var x = idx
          obj[x] = val.radio
          data[x] = val.radio
        }
      })

      data['input1'] = this.input1
      data['input2'] = this.input2
      data['input3'] = this.input3
      data['name'] = this.name
      data['email'] = this.email
      data['age'] = this.age
      data['org'] = this.org
      data['position'] = this.position
      data['other'] = this.other
      // data.append({'input1':this.input1})
      // data.append({'input2':this.input2})
      // data.append({'input3':this.input3})
      // data.append({'name':this.name})
      // data.append({'email':this.email})
      // data.append({'age':this.age})
      // data.append({'org':this.org})
      // data.append({'position':this.position})
      // data.append({'other':this.other})

      this.$axios({
        headers:{
          "Content-Type":"application/x-www-form-urlencoded;charset-utf-8"
        },
        url:'http://localhost:80/api/getSurvey',
        method:'post',
        data:this.$qs.stringify(data)
      })
    }
  },
  components:{
    myRadio
  }
};
</script>

<style scoped>
  .questions{
    margin-left: 10%;
    margin-right: 10%;
  }
  h2,p,h3{
    text-align: left;
  }
  /* .elInput{
    margin: auto;
  } */
  .inputBox{
    width: 50%;
    float: left;
    border: #878787; 
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 2px;
    border-style: solid;
  }

  textarea{
    float: center;
  }

  .el-submit{
    height: 2em;
    width: 4em;
    font-size: 1em;
    color: white;
    background-color:green;
    opacity: 0.7;
    border: 1px solid white;
  }
</style>
