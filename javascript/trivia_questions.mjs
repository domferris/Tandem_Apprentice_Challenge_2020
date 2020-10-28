const startButton = document.querySelector('.start');
const triviaContainer = document.querySelector('.trivia-container');
const question = document.querySelector('.question');
const choices = document.querySelectorAll('.choices-container button');

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

//////////////////////////////////
////////// START BUTTON //////////
//////////////////////////////////

const startGame = () => {
  startButton.classList.add('hidden');
  triviaContainer.classList.remove('hidden');
};

startButton.addEventListener('click', startGame);
