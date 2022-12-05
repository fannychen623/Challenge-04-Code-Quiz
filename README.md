# Module 04 Challenge - Code Quiz

>**Application Link:** [Code Quiz](https://fannychen623.github.io/Challenge-04-Code-Quiz/)
>
>**View:** [Description](#description) / [Application Details](#application-details) / [Application Sample Images](#application-sample-images) / [Responsive Layout Example](#responsive-layout)
>
>**Site Preview:**
>
>![Code Quiz](/assets/images/Code%20Quiz%20Title%20Page.png "Code Quiz")
## **DESCRIPTION**
> Topic Assessed: **JavasScript** - **(Web APIs)**, **(Timer, Local Storage, Append)**
### **My Task**
*Code Quiz* help familiarize with code related multiple-choice questions and allow you to use the skills covered in this module.
> Create the application from scratch. 
>
> Feature dynamically updated HTML and CSS powered by JavaScript code.
> 
> Use JavaScript to build a timed coding quiz with several multiple-choice questions.
>
> Display if an answer is correct after each question has been answered.
> 
> Record and store user initials and highscores in/from the local storage.
>
> Be able to retrieve stored data and/or clear stored data.
>
> **Note**: Extra features: Sorting highscores from largest to smallest, alternating colors for the highscores list, confirm clearing highscores before clearing local storage.
> 
> Only 1 html, each page is set as their individual section where the display is set to "none" unless they are to be displayed (which then the display will be set to "block").
>
## User Story
```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```
## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## **APPLICATION DETAILS**

### HTML Information
* **Head**: Linked `reset.css` and `style.css` file.
  * `script.js` file linked at the end of the body section.
* **Header**: Includes the `View Highscore` button and the Quiz Timer.
* **Main**: Main section divided into 4 sections that are to be displayed individually and a notification section that is to displayed for a set time.
  * Title Page (id: `#titlePage`)
  * Quiz Page (id: `#quizPage`)
  * Score Page (id: `#scorePage`)
  * Notification (id: `#notification`)
  * Highscores Page (id: `#highscoresPage`)
* **Title Page**: Displays the title of the page, details and button to start the quiz.
* **Quiz Page**: Includes fields that are to be populated by JavaScript
  * Question field (element `<h3>`, id: `#question`)
  * Options list with 4 buttons.
    * id: `#option1`, `#option2`, `#option3`, `#option4`
* **Score Page**: Displays the final score and gives option to log the score with initials.
  * Score field (id: `#score`) to be populated by JavaScript
  * Form: input field for initials.
    * Set `autocomplete="off"` to prevent the text area from autofilling and showing previous entries.
  * Submit button to submit the score with the initials.
    * Set `type="button"` to prevent submit button defaulting to refreshing the application upon click.
* **Notification**: Placed below the quiz page and the score page to display the results of a question.
  * id: `#answerCheck` to be populated by JavaScript
* **Highscores Page**: Includes a list of initials and a list of scores
  * Initials List (id: `#initialsList`)
  * Highscores List (id: `#highscoresList`)
  * Button to go back to the title page.
  * Button to clear all highscores.
* **Comments**: Added indicative comments before each section.

### CSS Information
* **Order**: Ordered selectors based on the order appeared on HTML.
* **Basic Styling**: Defined styles (such as: fonts, alignments, margins, paddings, borders, and colors) according to the provided visual.
* **:root Varibles**: Defined repetitive color varibles used throughout the sheet. 
* **Header**: Have content be spaced evenly on opposite ends of the page.
  * `justify-content: space-between`
* **Pseudo Classes**:
  * `button:hover` lighten the button over hover to highlight action
  * `#highscoresPage ul li:nth-child` to alternate the background and text color of the rows in the highscores list.
* **Option Buttons**: Remove the left bullet points from the list of button options on the quiz page.
  * `list-style: none`
* **Notification**: Italicize text and add a top border as division between the question and the answer results. 
* **Highscores Page**: Float the initials list so that it can be side by side with the highscores list.
  * **Pseudo Element**: `#highscoresList:after` to remove the float after the highscores list so the buttons are correctly displayed.
  * **Referenced Code**: [How TO - Two Column Layout](https://www.w3schools.com/howto/howto_css_two_columns.asp)
* **Comments**: Added indicative comments before selectors.

### JavaScript Information
* **Assignment Code**: Defined the different pages, buttons, and elements in the application.
  * Pages: `titlePage`, `quizPage`, `notifications`, `scorePage`, `highscoresPage`
  * Buttons: `viewHighscoresButton`, `startQuizButton`, `submitScoreButton`, `goBackButton`, `clearHighscoresButton`, Question option buttons: `option1`, `#option2`, `#option3`, `#option4`
  * Elements to be populated/used: `timeEl`, `questionEl`, `answerCheckEl`, `initialsListEl`, `highscoresListEl`, `scoreEl`, `initialsEl`
* **Define Variables**: Set variables used in the application.
  * `recordedInitials` and `recordedScores` as arrays.
    * Used to store recorded initials and scores as arrays in the local storage.
  * Set the score to 0 and the question number (qnum) to start at index 0.
  * Set the default answer check to "correct" to prevent the timer from penalizing -10 seconds at the start of the quiz.
  * `Question Bank` includes the questions and their respective options and correct answers.
    * Grouped based on their index (example: the first question has an index of [0], the group will be question[0], option1[0], option2[0], option3[0], option4[0], and answer[0])
* **function uploadQuestion(qnum)**: Runs the function to populate the quiz page with the right question and options.
  * qnum identifies the question number, starting at an index of [0].
  * Populate the question field.
  * Number and populate each option button.
* **EventListener startQuizButton**: Upon "click", run the function
  * Set the score to 0 and the question number to index 0
  * Call the `countdown()` function to start the timer for the quiz.
  * Call the `uploadQuestion(qnum)` function to populate the quiz page with the first question
  * Hide the title page and display the quiz page.
* **function countdown()**: Timer for the quiz
  * Set the timer to 60 seconds.
  * Set interval to call a function to be executed every 1000 milliseconds.
    * Confirm that the quiz page is shown, if not, stop the timer.
      * In the case the user clicks the "View Highscore" button and is redirected to the highscores page, stop the timer.
      * In the case where the user finishes the quiz and the score page is displayed, also stop the timer.
    * If the answerCheck variable is still "correct", decrement the timer by 1.
    * If the answerCheck variable is "incorrect", decrement the timer by 10 and set the answerCheck variable to "correct" to resume decrementing the timer by 1.
    * If the timer reaches 0, stop the timer and call the `completeQuiz()` function.
      * Do not call the function if the highscorePage is displayed. In the case where the user clicks the highscores page before completing the quiz.
* **EventListener quizPage**: Upon any "click" on the quiz page, run the function.
  * Check that what was clicked was a button, before running the code.
  * Also check that the notification display is off before running the code.
    * In the case where the notification is still displayed, do not run the code to prevent the notification function to be called again before the first one completes.
    * Hence each question can only be answered after a 1000 milliseconds delay.
  * If the id of the button selected matches the value in the answer index of the question, then add the score, set the answerCheck variable to "correct", populated the notification field, and call the `showNotification()` function.
    * With a full score of 100 and setting each question to be worth the same, the equation to calculate the worth of each question is: 100/(the number of questions).
    * Set `score = score + 100/(questionBank.question.length)`
  * If the id of the button does not match the value in the answer index of the question, then set the answerCheck value to "incorrect", populated the notification field, and call the `showNotification()` function.
    * No score is added for an incorrect answer.
  * If this is not the last question in the questionBank then add 1 to the qnum and call the `uploadQuestion()` function.
    * Otherwise, call the `completeQuiz()` function.
* **function showNotification()**: Show the result of the answer for a limited time
  * Show the notification section.
  * After 1000 milliseconds, set the display to "none" to hide the section again.
* **function completeQuiz()**: Hide the quiz page and show the score page.
  * Populate the score field with the final score rounded to the nearest integer.
* **EventListener submitScoreButton**: Submit the score to be stored in the local storage with initials.
  * Check that the initials textarea is not blank. If it is blank, set the `placeholder="ENTER INITIALS"` to remind to fill out initials before submitting score.
  * Convert the initials to uppercase for consistency
  * Add both the score and the initials to the recorded array.
  * Set the item in the local storage and covert it as a string with `JSON.stringify`
  * Clear the initials textarea for the next time a quiz is completed.
  * Call the `displayHighscores()` function.
* **function displayHighscores()**: Sort the scores from the local storage, render, and append them.
  * Set all displays except for the highscores page to "none.
    * Since the "View Highscore" button can be clicked from any page.
  * Clear the fields on the page from any previous run.
  * Sort the array of initials and scores from largest to smallest.
    * Combine both arrays.
    * Sort the inidicies based on largest to smallest.
    * Separate the arrays back out.
    * **Referenced Code**: [Sort two arrays the same way](https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way)
  * Render each stored initial and score as a `li` element.
  * Append each element into their respective sections.
* **EventListener clearHighscoresButton**: Clear all previous records from the local storage.
  * Confirm clearing local storage in case of misclick.
  * Once confirmed, clear the page and empty the recorded arrays of both the initials and the scores.
  * Overwrite the recorded data in the local storage by setting the item in the local storage to the new empty arrays.
* **function init()**: Run when the page is initialized. Called at the end of the JavaScript.
  * Retrieve the stored data from the local storage. To be used when the "View Highscore" button is clicked.
  * Display only the title page.
* **EventListener goBackButton**: Call the `init()` function.
* **EventListener viewHighscoresButton**: Call the `displayHighscores()` function.
* **Function and EventListener Chart**:
    | Functions | EventListeners |
    |  :---:  |  :---:  |
    | uploadQuestion(qnum) | startQuizButton |
    | countdown() | quizPage |
    | showNotification() | submitScoreButton |
    | completeQuiz() | clearHighscoresButton |
    | displayHighscores() | goBackButton |
    | init() | viewHighscoresButton |

## **APPLICATION SAMPLE IMAGES**
### Quiz Page 1
>![Quiz Page 1](/assets/images/Quiz%20Page%201.png "Quiz Page 1")
### Quiz Page 2
>![Quiz Page 2](/assets/images/Quiz%20Page%202.png "Quiz Page 2")
### Quiz Page 3
>![Quiz Page 3](/assets/images/Quiz%20Page%203.png "Quiz Page 3")
### Score Page 1
>![Score Page 1](/assets/images/Score%20Page%201.png "Score Page 1")
### Score Page 2
>![Score Page 2](/assets/images/Score%20Page%202.png "Score Page 2")
### Highscore Page
>![Highscore Page ](/assets/images/Highscore%20Page.png "Highscore Page 1")

## **RESPONSIVE LAYOUT**
### Screen Size: 670px
>![Responsive Layout 1](/assets/images/670px%201.png "Responsive Layout 1")
>![Responsive Layout 2](/assets/images/670px%202.png "Responsive Layout 2")
