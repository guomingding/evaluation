function judgeAllowSubmit(answers){
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

function randomlySelect(allChoices,hasSelected,num){
  console.log(allChoices)
  console.log(hasSelected)
  let count = 0
  let selections = []
  if(allChoices.length - hasSelected.length === num){
    console.log("111")
    for(let idx = 0;idx < allChoices.length;idx++){
      if(hasSelected.indexOf(allChoices[idx]) === -1){
        selections.push(allChoices[idx])
      }
    }
    return selections
  }
  while(count < num){
    let tempOption = Math.floor(Math.random() * allChoices.length)
    if(selections.indexOf(allChoices[tempOption]) === -1 && hasSelected.indexOf(allChoices[tempOption]) === -1){
      count += 1
      console.log("222")
      selections.push(allChoices[tempOption])
    }
  }
  return selections
}



export {judgeAllowSubmit,randomlySelect}