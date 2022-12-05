// assignment code
// different pages of the application
var titlePage = document.getElementById('titlePage');
var quizPage = document.getElementById('quizPage');
var notifications = document.getElementById('notification');
var scorePage = document.getElementById('scorePage');
var highscoresPage = document.getElementById('highscoresPage');

// buttons in the application
var viewHighscoresButton = document.getElementById('viewHighscores');
var startQuizButton = document.getElementById('startQuiz');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');
var submitScoreButton = document.getElementById('submitScore');
var goBackButton = document.getElementById('goBack');
var clearHighscoresButton = document.getElementById('clearHighscores');

// elements to be populated
var timeEl = document.getElementById('time');
var questionEl = document.getElementById('question');
var answerCheckEl = document.getElementById('answerCheck');
var initialsListEl = document.getElementById('initialsList');
var highscoresListEl = document.getElementById('highscoresList');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');

// define variables
// recorded array of initials and score
var recordedInitials = [];
var recordedScores = [];

// score starts at 0 and question `qnum` starts at array index 0
var score = 0;
var qnum = 0;
// initial define of answer check to be correct
var answerCheck = "correct";

// define all questions and respective options
// question and options are grouped based on the same indicies
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

// function to populate the question page based on the question number
function uploadQuestion(qnum) {
  questionEl.textContent = questionBank.question[qnum];
  option1.textContent = "1. " + questionBank.option1[qnum];
  option2.textContent = "2. " + questionBank.option2[qnum];
  option3.textContent = "3. " + questionBank.option3[qnum];
  option4.textContent = "4. " + questionBank.option4[qnum];
};

// function after the start quiz button is clicked
startQuizButton.addEventListener("click", function() {
  // start at a score of 0 and at question indix 0
  score = 0;
  qnum = 0;
  // call the `countdown()` and `uploadQuestion()` function
  countdown();
  uploadQuestion(qnum);
  // hide the title page and display the question page
  titlePage.style.display = "none";
  quizPage.style.display = "block";
});

// timer function for the quiz
function countdown() {
  // start time of 60 seconds
  var timeLeft = 60;

  // set interval to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1 && quizPage.style.display === "block") {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timeEl.textContent = timeLeft + ' seconds';
      // if the answer is correct, decrement `timeLeft` by 1
      if (answerCheck === "correct") {
        timeLeft--;
        // if the answer is incorrect, decrement `timeLeft` by 10 and reset `answerCheck` to correct
      } else if (answerCheck === "incorrect") {
        timeLeft = timeLeft - 10;
        answerCheck = "correct";
      }
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timeEl.textContent = "0";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // If the highscore page is not displayed then call the `completeQuiz()` function
      if (highscoresPage.style.display === "none") {
        completeQuiz();
      }
    };
  }, 1000);
};

// function to run everytime an option is selected for a question
quizPage.addEventListener("click", function (event) {
  // define what was clicked
  var element = event.target;
  // if a button was clicked and the notification is no longer displayed
  if (element.matches("button") === true && notifications.style.display === "none") {
    // if the button id is the same as the correct answer for the question
    if (element.id === questionBank.answer[qnum]) {
      // add to the score based on how much each question is worth
      // full score 100; individual question scores are divided evenly
      score = score + 100/(questionBank.question.length);
      // set `answerCheck` to correct, fill out the notification section, and run the `showNotification()` function
      answerCheck = "correct";
      answerCheckEl.textContent = "Correct!";
      showNotification();
      // if the button id is not the same as the correct answer for the question
    } else {
      // set `answerCheck` to incorrect, fill out the notification section, and run the `showNotification()` function
      answerCheck = "incorrect";
      answerCheckEl.textContent = "Wrong!";
      showNotification();
    };
    // if it is not the last question
    if (qnum < questionBank.question.length - 1) {
      // increase the question number index by 1 and run the `uploadQuestion()` function
      qnum++;
      uploadQuestion(qnum);
      // if it is the last question then run the `completeQuiz()` function
    } else {
      completeQuiz();
    };
  };
});

// function to display whether the answer is correct or not
function showNotification() {
  // show the notification section
  notifications.style.display = "block";
  // display the notification for 1000 milliseconds only
  setTimeout(() => {
    notifications.style.display = "none";
  }, 1000);
};

// display the quiz results
function completeQuiz() {
  // hide the quiz page and display the score page
  quizPage.style.display = "none";
  scorePage.style.display = "block";
  // populate the score field with the final score rounded to the nearest integer
  scoreEl.textContent = Math.round(score) + ".";
}

// submit the initial and score into the local storage
submitScoreButton.addEventListener("click", function() {
  // if the initials text area is blank, remind by setting a placeholder in the textarea
  if (initialsEl.value === "") {
    initialsEl.setAttribute("placeholder", "ENTER INITIALS");
    // if the initials have been filled
  } else {
    // record value as all uppercase for consistency
    // add the initials and score to their respective arrays
    recordedInitials.push(initialsEl.value.toUpperCase());
    recordedScores.push(Math.round(score));
    // store object in storage and to convert it as a string
    localStorage.setItem("recordedInitials", JSON.stringify(recordedInitials));
    localStorage.setItem("recordedScores", JSON.stringify(recordedScores));
    // clear the initials and run the `displayHighscores()` function
    initialsEl.value = "";
    displayHighscores();
  };
});

// function to populate the highscore page
function displayHighscores() {
  // hide all pages other than the highscore page
  titlePage.style.display = "none";
  quizPage.style.display = "none";
  notifications.style.display = "none";
  scorePage.style.display = "none";
  highscoresPage.style.display = "block";
  // clear the fields on the page from any pevious run
  initialsListEl.innerHTML = "";
  highscoresListEl.innerHTML = "";
  // sort the highscores and their respective initials based on largest to smallest
  // combine the initials array and scores array
  var list = [];
  for (var j = 0; j < recordedInitials.length; j++) 
      list.push({'recordedInitials': recordedInitials[j], 'recordedScores': recordedScores[j]});
  // sort the indicies based on largest to smallest
  list.sort(function(a, b) {
      return ((a.recordedScores > b.recordedScores) ? -1 : ((a.recordedScores == b.recordedScores) ? 0 : 1));
  });
  // separate the arrays back out
  for (var k = 0; k < list.length; k++) {
    recordedInitials[k] = list[k].recordedInitials;
    recordedScores[k] = list[k].recordedScores;
  };
  // render and append a new li for each initial and score record
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

// function to clear all highscores from the page and local storage
clearHighscoresButton.addEventListener("click", function() {
  // confirm that all entries should be cleated
  if (confirm("\nConfirm clear ALL highscores?\n\n'Cancel' for 'No', 'OK' for 'Yes'")) {
    // clear the fields on the page
    initialsListEl.innerHTML = "";
    highscoresListEl.innerHTML = "";
    // clear the arrays
    recordedInitials = [];
    recordedScores = [];
    // store the cleared arrays in storage, wiping over the previous record
    localStorage.setItem("recordedInitials", JSON.stringify(recordedInitials));
    localStorage.setItem("recordedScores", JSON.stringify(recordedScores));
  };
});

// function when the page is initialized
function init() {
  // retrieve the initials and highscore records from the local storage
  var storedInitials = JSON.parse(localStorage.getItem("recordedInitials"));
  if (storedInitials !== null) {
    recordedInitials = storedInitials;
  };
  var storedScores = JSON.parse(localStorage.getItem("recordedScores"));
  if (storedScores !== null) {
    recordedScores = storedScores;
  };
  // display onlt the title page
  titlePage.style.display = "block";
  quizPage.style.display = "none";
  notifications.style.display = "none";
  scorePage.style.display = "none";
  highscoresPage.style.display = "none";
};

// if the buttons are clicked, run the specified functions
goBackButton.addEventListener("click", init);
viewHighscoresButton.addEventListener("click", displayHighscores);

// run the initialize function when the page opens
init();