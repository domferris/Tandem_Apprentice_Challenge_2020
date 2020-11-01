///////////////////////////////////////////
////////// REVEAL CORRECT ANSWER //////////
///////////////////////////////////////////

export const revealAnswer = (buttons) => {
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.add('answered');
  });
};
