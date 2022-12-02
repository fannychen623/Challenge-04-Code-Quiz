var titlePage = document.getElementById('titlePage');
var quizPage = document.getElementById('quizPage');
var notifications = document.getElementById('notification');
var scorePage = document.getElementById('scorePage');
var highscoresPage = document.getElementById('highscoresPage');
var startQuizbutton = document.getElementById('startQuiz');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');
var submitScorebutton = document.getElementById('submitScore');
var goBackbutton = document.getElementById('goBack');
var clearHighscoresbutton = document.getElementById('clearHighscores');
var timeEl = document.getElementById('time');
var questionEl = document.getElementById('question');
var answerCheckEl = document.getElementById('answerCheck');
var highscoresListEl = document.getElementById('highscores-list');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');

var score = 0;
function completeQuiz() {
  quizPage.style.display = "none";
  scorePage.style.display = "block";
  scoreEl.textContent = Math.round(score) + ".";
}

function countdown() {
  var timeLeft = 60;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1 && scorePage.style.display === "none") {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timeEl.textContent = timeLeft + ' seconds';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timeEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      completeQuiz();
    };
  }, 1000);
};

var qnum = 1;
var questionBank = {
  question: ["Commonly used data types DO NOT include:", 
  "The condition in an if / else statement is enclosed within ______."],
  option1: ["strings", "quotes"],
  option2: ["booleans", "curly brackets"],
  option3: ["alerts", "parentheses"],
  option4: ["numbers","square brackets"],
  answer: ["option3", "option3"],
};

function uploadQuestion(qnum) {
  questionEl.textContent = questionBank.question[qnum];
  option1.textContent = "1. " + questionBank.option1[qnum];
  option2.textContent = "2. " + questionBank.option2[qnum];
  option3.textContent = "3. " + questionBank.option3[qnum];
  option4.textContent = "4. " + questionBank.option4[qnum];
};

function showNotification() {
  notifications.style.display = "block";
  setTimeout(() => {
    notifications.style.display = "none";
  }, 1000);
};

quizPage.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true && element.id === questionBank.answer[qnum]) {
    answerCheckEl.textContent = "Correct!";
    score = score + 100/(questionBank.question.length);
    showNotification();
  } else if (element.matches("button") === true && element.id !== questionBank.answer[qnum]) {
    answerCheckEl.textContent = "Wrong!";
    showNotification();
  };
  if (element.matches("button") === true && qnum < questionBank.question.length - 1) {
    qnum++;
    uploadQuestion(qnum);
  } else if (element.matches("button") === true) {
    completeQuiz();
  };
});

startQuizbutton.addEventListener("click", function() {
  countdown();
  qnum = 0;
  uploadQuestion(qnum);
  score = 0;
  titlePage.style.display = "none";
  quizPage.style.display = "block";
});

var recordedInitials = new Array[];
var recordedScores = new Array[];
submitScorebutton.addEventListener("click", function() {
  recordedInitials.push(initialsEl.value);
  recordedScores.push(score);
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("recordedInitials", JSON.stringify(recordedInitials));
  localStorage.setItem("recordedScores", JSON.stringify(recordedScores));
  console.log(recordedInitials);
  console.log(recordedScores);
});

// function displayScores() {
//   for (var i = 0; i < todos.length; i++) {
//     var todo = todos[i];

//     var li = document.createElement("li");
//     li.textContent = todo;
//     li.setAttribute("data-index", i);

//     var button = document.createElement("button");
//     button.textContent = "Complete ✔️";

//     li.appendChild(button);
//     todoList.appendChild(li);
//   }
// };

goBackbutton.addEventListener("click", init());

function init() {
  titlePage.style.display = "block";
  quizPage.style.display = "none";
  notifications.style.display = "none";
  scorePage.style.display = "none";
  highscoresPage.style.display = "none";
}

init();