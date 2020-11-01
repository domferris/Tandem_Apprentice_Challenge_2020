// populate questions array via json

const triviaData =
  'https://domferris.github.io/Tandem_Apprentice_Challenge_2020/data/Apprentice_TandemFor400_Data.json' ||
  './../Apprentice_TandemFor400_Data.json';

let triviaQuestions = [];

fetch(triviaData)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((triviaQuestion) => {
      triviaQuestions.push(triviaQuestion);
    });
  });

export { triviaQuestions };
