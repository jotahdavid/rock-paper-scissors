import ChoiceButton from './components/ChoiceButton.js';

const $choicesContainer = document.querySelector('.choices-container');
const $textBox = document.querySelector('.text-box h2');
const $playAgainButton = document.querySelector('.play-again');

const RockPaperScissors = {
  init() {
    this.recreateOptions();
  },
  getComputerChoice() {
    const choiceOptions = [ 'Rock', 'Paper', 'Scissors' ];
    const choice = Math.floor(Math.random() * 3);

    return choiceOptions[choice];
  },
  getUserChoice(event) {
    return event.currentTarget.dataset['choice'];
  },
  getMatchRoundResult(user, comp) {
    const winningCombinations = [ 'Rock > Scissors', 'Scissors > Paper', 'Paper > Rock' ];

    if (winningCombinations.includes(`${user} > ${comp}`)) {
      return 'win';
    } else if (winningCombinations.includes(`${comp} > ${user}`)) {
      return 'lose';
    }
    return 'draw';
  },
  clearChoicesContainer() {
   $choicesContainer.innerHTML = null;
  },
  showTitle(value) {
    document.querySelector('.title').classList.toggle('hidden', value);
  },
  centralizeChoicesContainer(value) {
    document.querySelector('section').classList.toggle('centralize', value);
  },
  showWinner(user, comp) {
    const result = this.getMatchRoundResult(user, comp);
    $textBox.innerText = result.toUpperCase();
    $textBox.classList.add(result);
  },
  showQuestion() {
    $textBox.innerText = 'Which one do you choose?';
    $textBox.classList.value = '';
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

    $choicesContainer.appendChild(userChoiceElement);
    $choicesContainer.appendChild(computerChoiceElement);
  },
  recreateOptions() {
    this.clearChoicesContainer();

    const handleChoiceClick = (event) => this.play(event);
    $choicesContainer.appendChild(ChoiceButton({ value: 'Rock', onClick: handleChoiceClick }));
    $choicesContainer.appendChild(ChoiceButton({ value: 'Paper', onClick: handleChoiceClick }));
    $choicesContainer.appendChild(ChoiceButton({ value: 'Scissors', onClick: handleChoiceClick }));
  },
  showPlayAgainButton(value) {
    $playAgainButton.classList.toggle('show', value);

    if (!value) return;

    const handlePlayAgainButtonClick = () => this.restart();
    $playAgainButton.children[0].addEventListener('click', handlePlayAgainButtonClick, { once: true });
  },
  play(event) {
    this.showTitle(true);
    this.centralizeChoicesContainer(true);
    const compChoice = this.getComputerChoice();
    const userChoice = this.getUserChoice(event);
    this.showWinner(userChoice, compChoice);
    this.showOptionsChosen(userChoice, compChoice);
    this.showPlayAgainButton(true);
  },
  restart() {
    this.showTitle(false);
    this.centralizeChoicesContainer(false);
    this.recreateOptions();
    this.showQuestion();
    this.showPlayAgainButton(false);
  },
}

window.addEventListener('load', () => {
  RockPaperScissors.init();
});
