// Global Variables

var  timerCount;
var  currentQuestionNdx = 0;
var  numberOfWins = 0;
var  numberOfLoses = 0;
var  numberUnAnswered = 0;

//Questions
var trivia = [
    
    {
    question: "The first person shooter video game Doom was first released in what year?",
    possibleAnswers: ["1983" ,
                      "1988",
                      "1993",
                      "1998" ],
    correctAnswer: "1993"
    },
    
    {
    question: "In what year was the first Apple computer released?",
    possibleAnswers: ["1970" ,
                      "1976",
                      "1980",
                      "1981" ],
    correctAnswer: "1976"
    },
    
    {
    question: "In database programming, SQL is an acronym for what?",
    possibleAnswers: ["Syntax Query Language" ,
                      "Software Quality Language",
                      "Sequential Query Language",
                      "Structured Query Language" ],
    correctAnswer: "Structured Query Language"
    },
    
    {
    question: "Fonts that contain small decorative lines at the end of a stroke are known as what?",
    possibleAnswers: ["Decorative Fonts" ,
                      "Stroked Fonts",
                      "Serif Fonts",
                      "Sans Fonts" ],
    correctAnswer: "Serif Fonts"
    },
    
    {
    question: "When referring to computer memory, what does that acronym RAM stand for?",
    possibleAnswers: ["Random Access Memory" ,
                      "Random Algorithm Memory",
                      "Retained Accelerated Memory",
                      "Random Address Memory" ],
    correctAnswer: "Random Access Memory"
    },
    
    {
    question: "What was the name of the first electronic general-purpose computer?",
    possibleAnswers: ["General Adding Machine" ,
                      "Antikythera mechanism",
                      "Apple II",
                      "ENIAC" ],
    correctAnswer: "ENIAC"
    },
    
    {
    question: "Regarding data storage, what does the acronym SSD stand for?",
    possibleAnswers: ["Scalable Storage Device" ,
                      "Solid State Drive",
                      "Server Side Drive",
                      "Software Storage Disk" ],
    correctAnswer: "Solid State Drive"
    }];


// Event Listeners

// Document.ready function
$(document).ready(function(){
  // Reset Button on Click
    $('#resetButton').on("click", function() {
      restart();
    }) 
    //Display the current question
  displayCurrentQuestion();
  }) 

// Restart/Reset functionality
function restart(){
  $('.wins').remove();
  $('.lose').remove();
  $('.unAns').remove();
  numberOfWins = 0;
  numberOfLoses = 0;
  numberUnAnswered = 0;
  currentQuestionNdx = 0;
  displayCurrentQuestion();
}

//Game Array for loop
function initGameArrayChooser(){
  for (var i = 0; i < trivia.length; i++) {
    gameArrayChooser[i] = i;
  }
}

function newEventListeners(){
  $('.possibleAnswer').on("click", function() {
    checkClickedAnswer(this.textContent);
    }) //end possibleAnswer').on("click"
}// newEventListeners()

function displayCurrentQuestion(){

  var   currentQuestion = trivia[currentQuestionNdx].question;
  //output the current question to the DOM
  $(".currentQuestion").text(currentQuestion);
  //get rid of any answers from last game
  $(".answersUnOrderedList").empty();
  var answer;
  var theList = $(".answersUnOrderedList")

  for (var i = 0; i < trivia[currentQuestionNdx].possibleAnswers.length; i++) {
    answer = trivia[currentQuestionNdx].possibleAnswers[i];
    $("<li class='possibleAnswer'> " + answer + "</li>").appendTo(theList)
  }
newEventListeners();
countDownTimerObj.start();
}// end displayCurrentQuestion()

//count down timer functionality
var timerController;
var countDownTimerObj= {
  time:25,
  setTime:25,
  reset: function(){
    countDownTimerObj.time = countDownTimerObj.setTime;
    countDownTimerObj.updateDisplay(countDownTimerObj.time);
  },
  start: function(){
    timerController = setInterval(countDownTimerObj.count, 1000);
  },
  stop: function(){
    clearInterval(timerController);
  },
  count: function(){
    countDownTimerObj.time--;
    countDownTimerObj.updateDisplay(countDownTimerObj.time);
  
  },
  inputTime: function(){
    // This line of code will grab the input from the textbox
    countDownTimerObj.setTime = $('#timeInput').val().trim();
    countDownTimerObj.time =countDownTimerObj.setTime;
    countDownTimerObj.updateDisplay(countDownTimerObj.time);
    return false;
  },
  updateDisplay: function(time){
    if (time < 7) {
      $('#timerDisplay').addClass('shortTime');
    }
    else{
      $('#timerDisplay').removeClass('shortTime');
    }
    if (time<=0) {
      $('#timerDisplay').html(time);
      this.stop();
      //if time runs out check agianst ""
      checkClickedAnswer("");
    }
    else{
      $('#timerDisplay').html(time);
    }
  }
}; 

// Check the clicked answer
function checkClickedAnswer(answerClicked){

  //Conditional for correct answer
  if(trivia[currentQuestionNdx].correctAnswer === answerClicked.trim()){
    //Stop the timer
    countDownTimerObj.stop();
    // Increase wins by 1
    numberOfWins++;
    //Add winner class
    $('#winLose').addClass('winner');
    // Output "Correct!"
    $('#winLose').html('Correct!');
    //Reset winLose
    var resetWinLose = setTimeout(resetWL, 1500);
  }
  else if (answerClicked === "") {
    // Unanswered Counter
    numberUnAnswered++;
    //Stop the Timer
    countDownTimerObj.stop();
    // Adds "loser" class for styling
    $('#winLose').addClass('loser');
    // Display incorrect answer message
    $('#winLose').html('Nope.');
    // Reset the timer
    var resetWinLose = setTimeout(resetWL, 1500);
  }
  else{
    // Increase Losses by 1
    numberOfLoses++;
    //Stop the timer
    countDownTimerObj.stop();
    //Add "loser" class
    $('#winLose').addClass('loser');
    //Display incorrect answer message
    $('#winLose').html('Nope.');
    //Reset the timer
    var resetWinLose = setTimeout(resetWL, 1500);
  }
}

// Reset Results Function
function resetWL(){
  $('#winLose').removeClass('winner loser');
  $('#winLose').html('');
  countDownTimerObj.reset();
  currentQuestionNdx++;
  if (currentQuestionNdx > trivia.length-1) {
    countDownTimerObj.stop();
    outputStats();
  }
  else{
    displayCurrentQuestion();
  }
}

// Results output at game conclusion
function outputStats(){
//  Number correct
  var winText = "Correct Answers: "+ numberOfWins;
// Number Incorrect
  var loseText = "Incorrect Answers: "+ numberOfLoses;
// Number of Unanswered questions
  var unanswerText = "Unanswered Questions: "+ numberUnAnswered;
  //Correct
  $('#winLose').append("<div class='wins'>"+winText+"</div>");
  //Incorrect
  $('#winLose').append("<div class='lose'>"+loseText+"</div>");
  //Unanswered
  $('#winLose').append("<div class='unAns'>"+unanswerText+"</div>")
}
