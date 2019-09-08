let t = 30; //global time variable
const starttimer = function() { //calling starttimer() should give a timer
  t = 30;
  document.getElementById("timer").textContent = `Time remaining: ${t}`;
  let timer = setInterval(timeLeft, 1000);
    function timeLeft(){
      if (t !== 0) {
        t--;
      document.getElementById("timer").textContent = `Time remaining: ${t}`;
      } else {
      timeup();
      //Need to insert code to change HTML content to something from answers array
      }
      // console.log(t)
    }
    function timeup(){
      clearInterval(timer);
    }
}


const questions = [ //global array of questions and choices
  qI = { //master sword
    Question: `In Breath of the Wild, where is the Master Sword found?`,
    choiceA: `The Lost Woods`,
    choiceB: `The Korok Forest`, //correct
    choiceC: `Hyrule Castle`,
    choiceD: `The Temple of Time`
  },
  qII = { //leviathan
    Question: `Which of the following locations does NOT contain the remains of a leviathan?`,
    choiceA: `The Eldin region, near Death Mountain`,
    choiceB: `The Hebra Region, near the peaks`,
    choiceC: `The Gerudo Desert`,
    choiceD: `The Faron Region, near Lurelin Village` //correct
  },
  qIII = { //setting things on fire
    Question: `Which item is not capable of setting objects on fire?`,
    choiceA: `Arrows`,
    choiceB: `Bomb arrows`,
    choiceC: `Shock arrows`, //correct
    choiceD: `Fire arrows`
  },
  qIV = { //stealth items
    Question: `Which material, when cooked, creates items that increase stealth?`,
    choiceA: `Sunset Firefly`, //correct
    choiceB: `Armoranth`,
    choiceC: `Hyrule Bass`,
    choiceD: `Fleet Lotus Seed`
  },
  qV = { //korok seeds
    Question: `Which of the following cannot be expanded using korok seeds?`,
    choiceA: `Weapon stash`,
    choiceB: `Shield stash`,
    choiceC: `Bow stash`,
    choiceD: `Arrow stash`, //correct
  },
]
const answers = [ //global array of answers and result text
  aI = {
    Correct: `Correct! The sword is found in the Korok Forest near the Great Deku Tree.`,
    Incorrect: `Sorry! The Master Sword is actually in the Korok Forest.`,
    Timeout: `Out of time! The Master Sword is actually in the Korok Forest.`
  },
  aII = {
    Correct: `Correct! There's no skeleton to be found in the Faron Region.`,
    Incorrect: `Sorry! There's no skeleton to be found in the Faron Region.`,
    Timeout: `Out of time! There's no skeleton to be found in the Faron Region.`
  },
  aIII = {
    Correct: `Correct! Shock arrows can't be lit aflame nor can they start a fire.`,
    Incorrect: `Sorry! It was actually shock arrows that can't be lit aflame nor can they start a fire.`,
    Timeout: `Out of time! Shock arrows can't be lit aflame nor can they start a fire.`
  },
  aIV = {
    Correct: `Correct! The sunset firefly produces stealthy elixirs when cooked with monster parts.`,
    Incorrect: `Sorry! It was actually the sunset firefly that produces stealthy elixirs when cooked with monster parts.`,
    Timeout: `Out of time! The sunset firefly produces stealthy elixirs when cooked with monster parts.`
  },
  aV = {
    Correct: `Correct! The game allowed Link to carry 999 arrows of each type from the start of the game.`,
    Incorrect: `Sorry! The game allowed Link to carry 999 arrows of each type from the start of the game.`,
    Timeout: `Out of time! The game allowed Link to carry 999 arrows of each type from the start of the game.`
  },
]


let qIndex = 0 //global variable for questions
let aIndex = 0 //global variable for answers
const newQuestion = function(){ //adds 1 to qIndex whenever called.
  //Timer reset?
  qIndex++;
  document.getElementById('question').textContent =`${questions[qIndex - 1].Question}`;
  document.getElementById('choiceA').textContent =`${questions[qIndex - 1].choiceA}`;
  document.getElementById('choiceB').textContent =`${questions[qIndex - 1].choiceB}`;
  document.getElementById('choiceC').textContent =`${questions[qIndex - 1].choiceC}`;
  document.getElementById('choiceD').textContent =`${questions[qIndex - 1].choiceD}`;
  //LISTEN FOR CORRECT ANSWER
}
const newAnswer = function(){ //answer received function
  document.getElementById('choiceA').textContent =`` //clears out the answer choices
  document.getElementById('choiceB').textContent =``
  document.getElementById('choiceC').textContent =``
  document.getElementById('choiceD').textContent =``
  //if (out of time) {
  document.getElementById('question').textContent =`${answers[aIndex].Timeout}`
  //} else if (incorrect answer) {
  document.getElementById('question').textContent =`${answers[aIndex].Incorrect}`
  //} else if (correct answer) {
  document.getElementById('question').textContent =`${answers[aIndex].Correct}`
  //}
  aIndex++ 
}

//upon clicking START...
document.getElementById("start").addEventListener(`click`, function(){
  document.getElementById("container").removeChild(document.getElementById("start")) //kill start button
  newQuestion() //run new question
  starttimer() //start the timer
})


//Checking data type stuff; called whenever one of the choices is clicked
let check = function(choice){
  let correctness = choice.getAttribute("data-choice");
  console.log(correctness)
}