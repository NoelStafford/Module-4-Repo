// variables to keep track of quiz state
var currentQuestion = 0;
var time = 60;
var timer;
    

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
/// FUNCTION TO START THE QUIZ
function startQuiz(event) {
  event.stopPropagation();
  // hide start screen // un-hide questions section
  document.getElementById('start-screen').className ="hide";
  document.getElementById('questions').className ="show";
  // start timer
  // show starting time
  clockTick();
  getQuestion();
}

/// FUNCTION TO GET/SHOW EACH QUESTION ///
function getQuestion() {
var questionValue = questions[currentQuestion];
// new question
document.getElementById('question-title').textContent = questionValue.title;
// get rid of past question
document.getElementById('choices').innerHTML =''
// loop the choices
for(var i=0;i<questionValue.choices.length;i++) {
  // buttons for the answers
  var btn = document.createElement("button");
  btn.textContent = i+1 + "," +questionValue.choices[i];
  btn.setAttribute("data-index", i);
  document.querySelector("#choices").appendChild(btn);
  }
}
/// FUNCTION FOR CLICKING A QUESTION ///
function questionClick(event) {
    var element = event.target;
  // if the clicked element is not a choice button, do nothing.
  if (element.matches("button") !== true) {
  }
  else{
    var questionValue = questions[currentQuestion];
    // check if user guessed wrong
    if(questionValue.answer !== questionValue.choices[element.getAttribute("data-index")]){
        // penalize time
        if(time>10){
            time -= 10;
            // display new time on page
            document.getElementById("timeText").textContent = "Time: " + time;
        }
        else{
            time-=time;
            // display new time on page
            document.getElementById("timeText").textContent = "Time: " + time;
            quizEnd();
        }
        document.getElementById("feedback").textContent = "Wrong!";
            document.getElementById("feedback").className = "show";
      }
      else{
        console.log("Correct Answer");
        document.getElementById("feedback").textContent = "Correct";
        document.getElementById("feedback").className = "show";
        currentQuestion++;
        if(currentQuestion>3){
          quizEnd()
        }
        else{
          getQuestion();
        }
      }
    }
}

/// FUNCTION TO END THE QUIZ ///
function quizEnd() {
  // stop timer
  clearInterval(timer);
  // show end screen
  document.getElementById('end-screen').className ="show";
  // show final score
  document.getElementById("final-score").textContent = time;
  // hide questions section
  document.getElementById('questions').className ="hide";
  document.getElementById("feedback").className ="hide";
}

/// FUNCTION FOR UPDATING THE TIME ///
function clockTick() {
  // update time
  timer = setInterval(function() {
    time--;
    document.getElementById("timeText").textContent = "Time: " + time;
    if (time === 0) {
      clearInterval(timer);
      quizEnd();
    }
  }, 1000);
}

function saveHighscore() {
  // get value of input box - for initials
  var initials = document.getElementById('initials').value;
  // get saved scores from localstorage, or if not any, set to empty array
  var currentScore = {init: initials, score: time};
  var savedScores = JSON.parse(localStorage.getItem("savedScores"));

  if(initials === "") {
    savedScores.push(currentScore);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
  }
  else{
    savedScores = [currentScore];
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
  }
  document.location.href="./highscores.html"

}

/// CLICK EVENTS ///
  // user clicks button to submit initials

  // user clicks button to start quiz
document.querySelector("#start-button").addEventListener("click", startQuiz);

document.querySelector("#submit").addEventListener("click", saveHighscore);

document.querySelector("#questions").addEventListener("click", questionClick)
  // user clicks on element containing choices
