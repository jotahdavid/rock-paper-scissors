const RockPaperScissors = {
  winningCombinations: [ "Rock > Scissors", "Scissors > Paper", "Paper > Rock" ],
  computerChoice: null,
  userChoice: null,
  choicesBackup: {},

  getChoicesBackup() {
    this.choicesBackup = {
      Rock: this.getChoicesElements()[0].cloneNode(true),
      Paper: this.getChoicesElements()[1].cloneNode(true),
      Scissors: this.getChoicesElements()[2].cloneNode(true),
    }
  },
  getChoicesElements() {
    return document.querySelectorAll(".choices");
  },
  getComputerChoice() {
    const choiceOptions = [ "Rock", "Paper", "Scissors" ];
    const choice = Math.floor(Math.random() * 3);

    this.computerChoice = choiceOptions[choice];
  },
  getUserChoice(event) {
    const elementChosen = event.path.filter(({ dataset }) => dataset && dataset.hasOwnProperty("choice"));
    const choice = elementChosen[0].dataset.choice;

    this.userChoice = choice;
  },
  getWinner() {
    if(this.winningCombinations.includes(`${this.userChoice} > ${this.computerChoice}`)) {
      return "win";
    } else if(this.winningCombinations.includes(`${this.computerChoice} > ${this.userChoice}`)) {
      return "lose";
    } else {
      return "draw";
    }
  },
  removeChilds() {
    const choicesContainer = document.querySelector(".choices-container");
    while(choicesContainer.lastChild) {
      choicesContainer.removeChild(choicesContainer.lastChild);
    }
  },
  createOptionsChosen(element, cssClass, animationName) {
    const choicesContainer = document.querySelector(".choices-container");
    element.classList.add(cssClass);
    element.setAttribute("data-animation", animationName);
    choicesContainer.appendChild(element);
  },
  showWinner() {
    const showStatus = document.querySelector(".question h2");
    showStatus.innerText = this.getWinner().toUpperCase();
  },
  showOptionsChosen() {
    const userChoiceElement = this.choicesBackup[this.userChoice];
    this.createOptionsChosen(userChoiceElement, "user-choice", "left-to-right");
    
    let computerChoiceElement = this.choicesBackup[this.computerChoice];
    if(this.getWinner() === "draw") computerChoiceElement = computerChoiceElement.cloneNode(true);
    this.createOptionsChosen(computerChoiceElement, "computer-choice", "right-to-left");
  },
  addEvents() {
    this.getChoicesElements().forEach(element => {
      element.onclick = this.play.bind(this);
    });
  },
  play(event) {
    this.getComputerChoice();
    this.getUserChoice(event);
    this.showWinner();
    this.removeChilds();
    this.showOptionsChosen();
  },
  init() {
    this.addEvents();
    this.getChoicesBackup();
  },
}

window.addEventListener("load", () => {
  RockPaperScissors.init();
});