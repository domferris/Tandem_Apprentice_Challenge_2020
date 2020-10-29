const startButton = document.querySelector('.start');
const triviaContainer = document.querySelector('.trivia-container');
const questionElement = document.querySelector('.question');
const choicesContainer = document.querySelector('.choices-container');
const scoreDisplay = document.querySelector('.score');

///////////////////////////////////////////////////////
////////// POPULATE QUESTIONS ARRAY VIA JSON //////////
///////////////////////////////////////////////////////

let triviaQuestions = [];

fetch('../Apprentice_TandemFor400_Data.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((triviaQuestion) => {
      triviaQuestions.push(triviaQuestion);
    });
  });

let shuffledQuestions, questionIndex;

////////////////////////////////
////////// START GAME //////////
////////////////////////////////

const startGame = () => {
  setScore(score);

  startButton.classList.add('hidden');
  triviaContainer.classList.remove('hidden');

  shuffledQuestions = triviaQuestions.sort(() => Math.random() - 0.5);
  questionIndex = 0;

  nextQuestion();
};

startButton.addEventListener('click', startGame);

/////////////////////////////
////////// SCORING //////////
/////////////////////////////

let score = 0;

const setScore = (score) => {
  scoreDisplay.innerText = `Score: ${score}`;
};

////////////////////////////////////////////
////////// RESET QUESTION & CHOICES ////////
////////////////////////////////////////////

const resetQuestion = () => {
  questionElement.innerText = '';
  choicesContainer.innerHTML = '';
};

///////////////////////////////////////////////
////////// SET & SHOW NEXT QUESTIONS //////////
///////////////////////////////////////////////

const nextQuestion = () => {
  resetQuestion();

  // limit game to 10 questions
  if (questionIndex < 10) {
    showQuestion(shuffledQuestions[questionIndex]);
    questionIndex++;
  } else {
    const finalScore = score;
    gameOver(finalScore);
  }
};

const showQuestion = (question) => {
  questionElement.innerText = question.question;

  // collect and shuffle all possible answers
  const choicesAll = [...question.incorrect, question.correct];
  const shuffledChoices = choicesAll.sort(() => Math.random() - 0.5);

  const correct = question.correct;

  shuffledChoices.map((choice) => {
    // populate buttons with multiple choice answers
    choicesContainer.innerHTML += `<button>${choice}</button>`;
    const choiceButtons = choicesContainer.querySelectorAll('button');

    choiceButtons.forEach((button) => {
      if (button.innerText === correct) button.classList.add('correct');

      button.addEventListener('click', (event) => {
        const playerChoice = event.currentTarget;
        playerChoice.classList.add('final-answer');
        if (playerChoice.innerText === correct) score++;

        revealAnswer(choiceButtons);

        // delay score update after correct answer is revealed
        setTimeout(() => {
          setScore(score);
        }, 3000);

        // delay transition to next question after score is updated
        setTimeout(nextQuestion, 4500);
      });
    });
  });
};

///////////////////////////////
////////// GAME OVER //////////
///////////////////////////////

const gameOver = (finalScore) => {
  scoreDisplay.innerText = `Final score: ${finalScore}`;
  startButton.classList.remove('hidden');
  startButton.innerHTML = 'Play again';
  score = 0;
};

///////////////////////////////////////////
////////// REVEAL CORRECT ANSWER //////////
///////////////////////////////////////////

const revealAnswer = (buttons) => {
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.add('answered');
  });
};
