const RockPaperScissors = {
  choices: [ "Rock", "Paper", "Scissors" ],
  computerChoice: null,
  userChoice: null,
  
  getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    this.computerChoice = this.choices[choice];
  },
  getUserChoice(target) {
    this.userChoice = this.choices[target];
  },
  getWinner() {
    switch(this.userChoice) {
      case "Rock":
        if(this.computerChoice === "Paper") {
          console.log("You LOSE!");
        } else if(this.computerChoice === "Scissors") {
          console.log("You WIN!");
        } else {
          console.log("DRAW!");
        }
        break;

      case "Paper":
        if(this.computerChoice === "Scissors") {
          console.log("You LOSE!");
        } else if(this.computerChoice === "Rock") {
          console.log("You WIN!");
        } else {
          console.log("DRAW!");
        }
        break;

      case "Scissors":
        if(this.computerChoice === "Rock") {
          console.log("You LOSE!");
        } else if(this.computerChoice === "Paper") {
          console.log("You WIN!");
        } else {
          console.log("DRAW!");
        }
        break;
    }
  },
  init(index) {
    this.getComputerChoice();
    this.getUserChoice(index);
    console.log(`${this.userChoice} vs. ${this.computerChoice}`);
    this.getWinner();
  },
}


window.addEventListener('load', () => {
  const getChoices = document.querySelectorAll('.choices');

  getChoices.forEach((choice, index) => {
    choice.addEventListener('click', () => RockPaperScissors.init(index));
  });
});