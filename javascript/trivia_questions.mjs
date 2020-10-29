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

  const choicesAll = [...question.incorrect, question.correct];
  const shuffledChoices = choicesAll.sort(() => Math.random() - 0.5);

  const correct = question.correct;

  shuffledChoices.map((choice) => {
    choicesContainer.innerHTML += `<button type="submit" class="choice">${choice}</button>`;

    const choiceButtons = choicesContainer.querySelectorAll('button');

    choiceButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const playerChoice = event.currentTarget.innerText;

        if (playerChoice === correct) {
          score++;
          setScore(score);
          nextQuestion();
        } else {
          nextQuestion();
        }
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
