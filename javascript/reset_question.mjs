// reset question & choices

export const resetQuestion = (questionElement, choicesContainer) => {
  questionElement.innerText = '';
  choicesContainer.innerHTML = '';
};
