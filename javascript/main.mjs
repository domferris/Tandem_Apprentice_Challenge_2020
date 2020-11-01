import { setScore } from './set_score.mjs';
import { resetQuestion } from './reset_question.mjs';
import { revealAnswer } from './reveal_answer.mjs';
import { gameOver } from './game_over.mjs';

const landing = document.querySelector('.landing');
const startButton = document.querySelector('.start');
const triviaContainer = document.querySelector('.trivia-container');
const questionElement = document.querySelector('.question');
const choicesContainer = document.querySelector('.choices-container');
const scoreDisplay = document.querySelector('.score');

///////////////////////////////////////////////////////
////////// POPULATE QUESTIONS ARRAY VIA JSON //////////
///////////////////////////////////////////////////////

const triviaData =
  'https://domferris.github.io/Tandem_Apprentice_Challenge_2020//data/Apprentice_TandemFor400_Data.json' ||
  './../Apprentice_TandemFor400_Data.json';

let triviaQuestions = [];

fetch(triviaData)
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
  setScore(scoreDisplay, score);

  landing.classList.add('hidden');
  scoreDisplay.classList.remove('hidden');
  triviaContainer.classList.remove('hidden');

  shuffledQuestions = triviaQuestions.sort(() => Math.random() - 0.5);
  questionIndex = 0;

  nextQuestion();
};

startButton.addEventListener('click', startGame);

let score = 0;

///////////////////////////////////////////////
////////// SET & SHOW NEXT QUESTIONS //////////
///////////////////////////////////////////////

const nextQuestion = () => {
  resetQuestion(questionElement, choicesContainer);

  // limit game to 10 questions
  if (questionIndex < 10) {
    showQuestion(shuffledQuestions[questionIndex]);
    questionIndex++;
  } else {
    const finalScore = score;
    gameOver(scoreDisplay, finalScore);

    landing.classList.remove('hidden');
    triviaContainer.classList.add('hidden');
    startButton.innerHTML = 'Play again';
    score = 0;
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
          setScore(scoreDisplay, score);
        }, 3000);

        // delay transition to next question after score is updated
        setTimeout(nextQuestion, 4500);
      });
    });
  });
};
