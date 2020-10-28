const question = document.querySelector('.question');
const choices = document.querySelectorAll('.choice');

question.addEventListener('click', (event) => {
  console.log(event.currentTarget.innerHTML);
});

choices.forEach((choice) => {
  choice.addEventListener('click', (event) => {
    console.log(event.currentTarget.innerHTML);
  });
});

let triviaQuestions = [];

fetch('../Apprentice_TandemFor400_Data.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((triviaQuestion) => {
      triviaQuestions.push(triviaQuestion);
    });
  });

console.log(triviaQuestions);
