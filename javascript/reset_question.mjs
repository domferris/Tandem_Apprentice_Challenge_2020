////////////////////////////////////////////
////////// RESET QUESTION & CHOICES ////////
////////////////////////////////////////////

export const resetQuestion = (questionElement, choicesContainer) => {
  questionElement.innerText = '';
  choicesContainer.innerHTML = '';
};
