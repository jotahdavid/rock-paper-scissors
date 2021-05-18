const RockPaperScissors = {
  winningCombinations: [ "Rock > Scissors", "Scissors > Paper", "Paper > Rock" ],
  computerChoice: null,
  userChoice: null,
  
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
  createComputerChoiceElement(element) {
    const choiceElement = element.cloneNode(true);
    choiceElement.classList.add("computer-choice");

    const choicesContainer = document.querySelector(".choices-container");
    choicesContainer.appendChild(choiceElement);
  },
  showWinner() {
    const roundEndStatus = this.getWinner();

    const showStatus = document.querySelector(".question h2");
    showStatus.innerText = `You ${roundEndStatus.toUpperCase()}`;
    
    const choicesElements = document.querySelectorAll(".choices");
    choicesElements.forEach(element => {
      const dataChoice = element.dataset.choice;

      const theElementWasSelected = this.userChoice !== dataChoice && this.computerChoice !== dataChoice;
      if(theElementWasSelected) {
        element.classList.add("not-selected");
      } else {
        element.classList.add("selected");
      }

      if(this.userChoice === dataChoice) {
        if(roundEndStatus === "draw") this.createComputerChoiceElement(element);
        element.classList.add("user-choice");

      } else if(this.computerChoice === dataChoice) {
        element.classList.add("computer-choice");
      }
    });
  },
  removeEvents() {
    const choicesElements = document.querySelectorAll(".choices");
    choicesElements.forEach(element => {
      element.onclick = "";
    });
  },
  play(event) {
    this.getComputerChoice();
    this.getUserChoice(event);
    this.showWinner();
    this.removeEvents();
  },
}