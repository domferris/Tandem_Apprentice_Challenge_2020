// reveal correct answer after player chooses final answer

export const revealAnswer = (buttons) => {
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.add('answered');
  });
};
