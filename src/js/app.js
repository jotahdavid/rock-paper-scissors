import ChoiceButton from './components/ChoiceButton.js';

const RockPaperScissors = {
  html: {
    choicesContainer: document.querySelector('.choices-container'),
    textBox: document.querySelector('.text-box h2'),
    button: document.querySelector('#play-again'),
  },

  init() {
    this.recreateOptions();
  },
  getComputerChoice() {
    const choiceOptions = [ 'Rock', 'Paper', 'Scissors' ];
    const choice = Math.floor(Math.random() * 3);

    return choiceOptions[choice];
  },
  getUserChoice(event) {
    const getDataChoice = event.target.dataset['choice'] || event.target.parentElement.dataset['choice'];

    return getDataChoice;
  },
  getMatchRoundResult(user, comp) {
    const winningCombinations = [ 'Rock > Scissors', 'Scissors > Paper', 'Paper > Rock' ];

    if(winningCombinations.includes(`${user} > ${comp}`)) {
      return 'win';
    } else if(winningCombinations.includes(`${comp} > ${user}`)) {
      return 'lose';
    }
    return 'draw';
  },
  clearChoicesContainer() {
    this.html['choicesContainer'].innerHTML = '';
  },
  toggleTitle() {
    document
      .querySelector('header')
      .classList.toggle('hidden')
  },
  toggleCentralizeChoicesContainer() {
    document
      .querySelector('section')
      .classList.toggle('centralize')
  },
  showWinner(user, comp) {
    const result = this.getMatchRoundResult(user, comp);

    this.html['textBox'].innerText = result.toUpperCase();
    this.html['textBox'].classList.add(result);
  },
  showQuestion() {
    this.html['textBox'].innerText = 'Which one do you choose?';
    this.html['textBox'].classList.value = '';
  },
  showOptionsChosen(user, comp) {
    this.clearChoicesContainer();

    const userChoiceElement = ChoiceButton({
      value: user,
      animation: 'left-to-right',
      playerClass: 'user-choice'
    });
    const computerChoiceElement = ChoiceButton({
      value: comp,
      animation: 'right-to-left',
      playerClass: 'computer-choice'
    });

    this.html['choicesContainer'].appendChild(userChoiceElement);
    this.html['choicesContainer'].appendChild(computerChoiceElement);
  },
  recreateOptions() {
    this.clearChoicesContainer();

    const handleChoiceClick = (event) => {
      this.play(event);
    }
    this.html['choicesContainer'].appendChild(ChoiceButton({ value: 'Rock', onClick: handleChoiceClick }));
    this.html['choicesContainer'].appendChild(ChoiceButton({ value: 'Paper', onClick: handleChoiceClick }));
    this.html['choicesContainer'].appendChild(ChoiceButton({ value: 'Scissors', onClick: handleChoiceClick }));
  },
  showPlayAgainButton() {
    this.html['button'].classList.add('show');
    this.html['button']
      .children[0]
      .addEventListener('click', this.restart.bind(this), { once: true });
  },
  hidePlayAgainButton() {
    this.html['button'].classList.remove('show');
  },
  play(event) {
    this.toggleTitle();
    this.toggleCentralizeChoicesContainer();
    const compChoice = this.getComputerChoice();
    const userChoice = this.getUserChoice(event);
    this.showWinner(userChoice, compChoice);
    this.showOptionsChosen(userChoice, compChoice);
    this.showPlayAgainButton();
  },
  restart() {
    this.toggleTitle();
    this.toggleCentralizeChoicesContainer();
    this.recreateOptions();
    this.showQuestion();
    this.hidePlayAgainButton();
  },
}

window.addEventListener('load', () => {
  RockPaperScissors.init();
});
