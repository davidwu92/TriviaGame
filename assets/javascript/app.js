const questions = [ //global array of questions and choices
  qI = { //master sword
    Question: `Where is the Master Sword found?`,
    choiceA: `A. The Lost Woods`,
    choiceB: `B. The Korok Forest`, //correct
    choiceC: `C. Hyrule Castle`,
    choiceD: `D. The Temple of Time`
  },
  qII = { //leviathan
    Question: `Which of the following locations does NOT contain the remains of a leviathan?`,
    choiceA: `A. The Eldin region, near Death Mountain`,
    choiceB: `B. The Hebra Region, near the peaks`,
    choiceC: `C. The Gerudo Desert`,
    choiceD: `D. The Faron Region, near Lurelin Village` //correct
  },
  qIII = { //setting things on fire
    Question: `Which item is not capable of setting objects on fire?`,
    choiceA: `A. Arrows`,
    choiceB: `B. Bomb arrows`,
    choiceC: `C. Shock arrows`, //correct
    choiceD: `D. Fire arrows`
  },
  qIV = { //stealth items
    Question: `Which material, when cooked, can create items that increase stealth?`,
    choiceA: `A. Sunset Firefly`, //correct
    choiceB: `B. Armoranth`,
    choiceC: `C. Hyrule Bass`,
    choiceD: `D. Fleet Lotus Seed`
  },
  qV = { //korok seeds
    Question: `Which of the following cannot be expanded using korok seeds?`,
    choiceA: `A. Weapon stash`,
    choiceB: `B. Shield stash`,
    choiceC: `C. Bow stash`,
    choiceD: `D. Arrow stash`, //correct
  },
]
const answers = [ //global array of answers and result text
  aI = {
    Correct: `Correct! The sword is found in the Korok Forest near the Great Deku Tree.`,
    Incorrect: `Sorry! The Master Sword is actually in the Korok Forest.`,
    Timeout: `Out of time! The Master Sword is actually in the Korok Forest.`
  },
  aII = {
    Correct: `Correct! There's no leviathan skeleton to be found in the Faron Region.`,
    Incorrect: `Sorry! There's no leviathan skeleton to be found in the Faron Region.`,
    Timeout: `Out of time! There's no leviathan skeleton to be found in the Faron Region.`
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
let t = 10;
let qIndex = 0; //global variable for questions array
let aIndex = 0; //global variable for answers array
let listening = false; //false if we're not listening for an answer choice, true if LISTENING
let yourChoice = false; //turns true when the selected choice is correct
let score = 0;

//timer defined (displays when listening)
const starttimer = function() { //calling starttimer() should give a timer
  t = 10;
  document.getElementById("timer").textContent = `Time remaining: ${t}`;
  let timer = setInterval(timeLeft, 1000);
    function timeLeft(){
      if (listening === false) { //not listening for an answer
        document.getElementById("timer").textContent = ``
        timeup();
      }
      else { //listening for an answer
        if (t !== 0) { //still have time left
          t--;
        document.getElementById("timer").textContent = `Time remaining: ${t}`;
        } else { //ran out of time
        document.getElementById("timer").textContent = ``
        newAnswer();
        timeup();
        }
      } 
        
    }
    function timeup(){
      clearInterval(timer);
    }
}

//newQuestion (listening for answer choice) 
const newQuestion = function(){
  listening = true;
  qIndex++;
  if (qIndex < 6) {
    starttimer();
    dataChanger(); //changes the data-choice to correct or incorrect on each choice
    document.getElementById('question').textContent =`${questions[qIndex - 1].Question}`;
    document.getElementById('choiceA').textContent =`${questions[qIndex - 1].choiceA}`;
    document.getElementById('choiceB').textContent =`${questions[qIndex - 1].choiceB}`;
    document.getElementById('choiceC').textContent =`${questions[qIndex - 1].choiceC}`;
    document.getElementById('choiceD').textContent =`${questions[qIndex - 1].choiceD}`;
  } else if (qIndex === 6) {
    results()
  }
}

//newAnswer (stops "listening")
const newAnswer = function(){
  listening = false;
  aIndex++;
  document.getElementById('choiceA').textContent =``; //clears out the answer choices
  document.getElementById('choiceB').textContent =``;
  document.getElementById('choiceC').textContent =``;
  document.getElementById('choiceD').textContent =``;
  if (t===0) { //ran outta time
    document.getElementById('question').textContent =`${answers[aIndex -1].Timeout}`;
  }
  else if (yourChoice === false) { //selected wrong answer
    document.getElementById('question').textContent =`${answers[aIndex -1].Incorrect}`;
  } else if (yourChoice === true) { //selected correct answer
    document.getElementById('question').textContent =`${answers[aIndex -1].Correct}`;
    score++; //score increased here
  }
  setTimeout(newQuestion, 5000)
}

//trivia end results function
const results = function() {
  listening = false
  document.getElementById('question').textContent =`You've completed the quiz!`;
  document.getElementById('choiceA').textContent =`Correct answers: ${score}`; //clears out the answer choices
  document.getElementById('choiceB').textContent =`Missed questions: ${questions.length - score}`;
  document.getElementById('choiceC').textContent =`Score: ${score / questions.length * 100}%`;
  document.getElementById('choiceD').textContent = 'Click HERE to try again';
}

//START BUTTON LISTENER
document.getElementById("start").addEventListener(`click`, function(){
  //kill start button
  document.getElementById("container").removeChild(document.getElementById("start"))
  newQuestion() //run new question for the first time
})

//LISTENING FOR CLICKS (works only if listening = true)
document.addEventListener(`click`, event => {
  if (listening) { //checking if we're listening for an answer choice 
    if (event.target.className === `content choice`){ //make sure something happens only if clicking on an answer choice
      if (event.target.getAttribute("data-choice") === "correct") {
        alert("correct");
        yourChoice = true;
        newAnswer();
      } else if (event.target.getAttribute("data-choice") === "incorrect") {
        alert("incorrect");
        yourChoice = false;
        newAnswer();
      }
    }
  }
})

//CHANGES DATA ON ANSWER CHOICES BASED ON QUESTION # (qIndex)
let dataChanger = function(){
  if (qIndex === 1) {
    document.getElementById('choiceA').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceB').setAttribute("data-choice", "correct")
    document.getElementById('choiceC').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceD').setAttribute("data-choice", "incorrect")
  }
  else if (qIndex === 2) {
    document.getElementById('choiceA').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceB').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceC').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceD').setAttribute("data-choice", "correct")
  }
  else if (qIndex === 3) {
    document.getElementById('choiceA').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceB').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceC').setAttribute("data-choice", "correct")
    document.getElementById('choiceD').setAttribute("data-choice", "incorrect")
  }
  else if (qIndex === 4) {
    document.getElementById('choiceA').setAttribute("data-choice", "correct")
    document.getElementById('choiceB').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceC').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceD').setAttribute("data-choice", "incorrect")
  }
  else if (qIndex === 5) {
    document.getElementById('choiceA').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceB').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceC').setAttribute("data-choice", "incorrect")
    document.getElementById('choiceD').setAttribute("data-choice", "correct")
  }
}