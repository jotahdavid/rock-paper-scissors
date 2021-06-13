const RockPaperScissors = {
  choiceOptions: [ "Rock", "Paper", "Scissors" ],
  winningCombinations: [ "Rock > Scissors", "Scissors > Paper", "Paper > Rock" ],
  computerChoice: null,
  userChoice: null,
  choicesBackup: {},
  html: {
    choicesContainer: document.querySelector(".choices-container"),
    textBox: document.querySelector(".text-box h2"),
    button: document.querySelector("#play-again"),
  },
  
  addEvents() {
    this.getChoicesElements().forEach(element => {
      element.onclick = this.play.bind(this);
    });
  },
  removeEvents() {
    this.getChoicesElements().forEach(element => {
      element.onclick = null;
    });
  },
  getChoicesBackup() {
    this.choicesBackup = { 
      Rock: this.getChoicesElements()[0].cloneNode(true),
      Paper: this.getChoicesElements()[1].cloneNode(true),
      Scissors: this.getChoicesElements()[2].cloneNode(true),
    };
  },
  getChoicesElements() {
    return document.querySelectorAll(".choices");
  },
  getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);

    this.computerChoice = this.choiceOptions[choice];
  },
  getUserChoice(event) {
    const getDataChoice = event.target.dataset["choice"] || event.target.parentElement.dataset["choice"];

    this.userChoice = getDataChoice;
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
    while(this.html["choicesContainer"].lastChild) {
      this.html["choicesContainer"].removeChild(this.html["choicesContainer"].lastChild);
    }
  },
  createOptionsChosen(element, cssClass, animationName) {
    element.classList.add(cssClass);
    element.setAttribute("data-animation", animationName);
    this.html["choicesContainer"].appendChild(element);
  },
  recreateOptions() {
    this.choiceOptions.forEach(option => {
      const choiceElement = this.choicesBackup[option];
      for(let i = 1; i < choiceElement.classList.length; i++) {
        choiceElement.classList.remove(choiceElement.classList[i]);
      }
      choiceElement.setAttribute("data-animation", "appear-and-rotate");
      this.html["choicesContainer"].appendChild(this.choicesBackup[option]);
    });
  },
  toggleTitle() {
    document
      .querySelector("header")
      .classList.toggle("hidden")
  },
  toggleCentralizeChoicesContainer() {
    document
      .querySelector("section")
      .classList.toggle("centralize")
  },
  showWinner() {
    this.html["textBox"].innerText = this.getWinner().toUpperCase();
    this.html["textBox"].classList.add(this.getWinner());
  },
  showQuestion() {
    this.html["textBox"].innerText = "Which one do you choose?";
    this.html["textBox"].classList.value = "";
  },
  showOptionsChosen() {
    const userChoiceElement = this.choicesBackup[this.userChoice];
    this.createOptionsChosen(userChoiceElement, "user-choice", "left-to-right");
    
    let computerChoiceElement = this.choicesBackup[this.computerChoice];
    if(this.getWinner() === "draw") computerChoiceElement = computerChoiceElement.cloneNode(true);
    this.createOptionsChosen(computerChoiceElement, "computer-choice", "right-to-left");
  },
  addPlayAgainButton() {
    this.html["button"].classList.add("show");
    this.html["button"].children[0].onclick = this.restart.bind(this);
  },
  removePlayAgainButton() {
    this.html["button"].classList.remove("show");
    this.html["button"].children[0].onclick = null;
  },
  play(event) {
    this.toggleTitle();
    this.toggleCentralizeChoicesContainer();
    this.getComputerChoice();
    this.getUserChoice(event);
    this.showWinner();
    this.removeEvents();
    this.removeChilds();
    this.showOptionsChosen();
    this.addPlayAgainButton();
  },
  restart(event) {
    this.toggleTitle();
    this.toggleCentralizeChoicesContainer();
    this.removeChilds();
    this.recreateOptions();
    this.showQuestion();
    this.removePlayAgainButton();
    this.addEvents();
  },
  init() {
    this.getChoicesBackup();
    this.addEvents();
  },
}

window.addEventListener("load", () => {
  RockPaperScissors.init();
});