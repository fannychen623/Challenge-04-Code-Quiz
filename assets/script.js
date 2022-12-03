var titlePage = document.getElementById('titlePage');
var quizPage = document.getElementById('quizPage');
var notifications = document.getElementById('notification');
var scorePage = document.getElementById('scorePage');
var highscoresPage = document.getElementById('highscoresPage');
var viewHighscoresButton = document.getElementById('viewHighscores');
var startQuizButton = document.getElementById('startQuiz');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');
var submitScoreButton = document.getElementById('submitScore');
var goBackButton = document.getElementById('goBack');
var clearHighscoresButton = document.getElementById('clearHighscores');
var timeEl = document.getElementById('time');
var questionEl = document.getElementById('question');
var answerCheckEl = document.getElementById('answerCheck');
var initialsListEl = document.getElementById('initialsList');
var highscoresListEl = document.getElementById('highscoresList');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');

var recordedInitials = [];
var recordedScores = [];
var score = 0;
var qnum = 1;

var questionBank = {
  question: ["Commonly used data types DO NOT include:", 
  "The condition in an if / else statement is enclosed within ______.",
  "Arrays in JavaScript can be used to store ______.",
  "String values must be enclosed within ______ when being assigned to variables.",
  "A very useful tool used during development and debugging for printing content to the debugger is:"],
  option1: ["strings", "quotes", "numbers and strings", "commas", "JavaScript"],
  option2: ["booleans", "curly brackets", "other arrays", "curly brackets", "terminal/bash"],
  option3: ["alerts", "parentheses", "booleans", "quotes", "for loops"],
  option4: ["numbers","square brackets", "all of the above", "parentheses", "console.log"],
  answer: ["option3", "option3", "option4", "option3", "option4"],
};

function uploadQuestion(qnum) {
  questionEl.textContent = questionBank.question[qnum];
  option1.textContent = "1. " + questionBank.option1[qnum];
  option2.textContent = "2. " + questionBank.option2[qnum];
  option3.textContent = "3. " + questionBank.option3[qnum];
  option4.textContent = "4. " + questionBank.option4[qnum];
};

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
    if (timeLeft > 1 && quizPage.style.display === "block") {
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
      if (highscoresPage.style.display === "none") {
        completeQuiz();
      }
    };
  }, 1000);
};

function showNotification() {
  notifications.style.display = "block";
  setTimeout(() => {
    notifications.style.display = "none";
  }, 1500);
};

quizPage.addEventListener("click", function optionClick(event) {
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

startQuizButton.addEventListener("click", function() {
  countdown();
  qnum = 0;
  uploadQuestion(qnum);
  score = 0;
  titlePage.style.display = "none";
  quizPage.style.display = "block";
});

function clearHighscores() {

  initialsListEl.innerHTML = "";
  highscoresListEl.innerHTML = "";

  recordedInitials = [];
  recordedScores = [];
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("recordedInitials", JSON.stringify(recordedInitials));
  localStorage.setItem("recordedScores", JSON.stringify(recordedScores));
};

function displayHighscores() {
  titlePage.style.display = "none";
  quizPage.style.display = "none";
  notifications.style.display = "none";
  scorePage.style.display = "none";
  highscoresPage.style.display = "block";
  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < recordedInitials.length; j++) 
      list.push({'recordedInitials': recordedInitials[j], 'recordedScores': recordedScores[j]});
  
  //2) sort:
  list.sort(function(a, b) {
      return ((a.recordedScores < b.recordedScores) ? -1 : ((a.recordedScores == b.recordedScores) ? 0 : 1));
      //Sort could be modified to, for example, sort on the age 
      // if the name is the same.
  });
  
  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
    recordedInitials[k] = list[k].recordedInitials;
    recordedScores[k] = list[k].recordedScores;
  };

  initialsListEl.innerHTML = "";
  highscoresListEl.innerHTML = "";

  // Render a new li for each todo
  for (var i = 0; i < recordedInitials.length; i++) {
    var initials = recordedInitials[i];
    var score = recordedScores[i];
    var initialLi = document.createElement("li");
    initialLi.textContent = initials;
    initialsListEl.appendChild(initialLi);
    var scoreLi = document.createElement("li");
    scoreLi.textContent = score;
    highscoresListEl.appendChild(scoreLi);
  };
};

submitScoreButton.addEventListener("click", function() {
  recordedInitials.push(initialsEl.value)
  recordedScores.push(Math.round(score));
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("recordedInitials", JSON.stringify(recordedInitials));
  localStorage.setItem("recordedScores", JSON.stringify(recordedScores));
  initialsEl.value = "";
  displayHighscores();
});

function init() {
  var storedInitials = JSON.parse(localStorage.getItem("recordedInitials"));
  if (storedInitials !== null) {
    recordedInitials = storedInitials;
  };
  var storedScores = JSON.parse(localStorage.getItem("recordedScores"));
  if (storedScores !== null) {
    recordedScores = storedScores;
  };
  titlePage.style.display = "block";
  quizPage.style.display = "none";
  notifications.style.display = "none";
  scorePage.style.display = "none";
  highscoresPage.style.display = "none";
};

goBackButton.addEventListener("click", init);
viewHighscoresButton.addEventListener("click", displayHighscores);
clearHighscoresButton.addEventListener("click", clearHighscores);

init();