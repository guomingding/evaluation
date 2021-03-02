export function judgeAllowSubmit(answers){
    let flag = true
    let allAns = document.getElementsByTagName("input")
    console.log(answers.length)
    for(let i = 0;i < allAns.length;i++){
      if(allAns[i].getAttribute('tag') === "mustAns"){
        if(answers[i].trim() === ''){
          flag = false
          break
        }
      }
    }
    return flag
  }