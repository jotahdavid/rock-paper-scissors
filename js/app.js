const RockPaperScissors = {
  choices: [ "Rock", "Paper", "Scissors" ],
  computerChoice: null,
  userChoice: null,
  
  getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    this.computerChoice = this.choices[choice];
  },
  getUserChoice(event) {
    event.path.forEach(({ dataset }) => {
      if(dataset && dataset.hasOwnProperty("choice")) this.userChoice = dataset.choice;
    });
  },
  getWinner() {
    switch(this.userChoice) {
      case "Rock":
        if(this.computerChoice === "Paper") {
          return "lose";
        } else if(this.computerChoice === "Scissors") {
          return "win";
        } else {
          return "draw";
        }

      case "Paper":
        if(this.computerChoice === "Scissors") {
          return "lose";
        } else if(this.computerChoice === "Rock") {
          return "win";
        } else {
          return "draw";
        }

      case "Scissors":
        if(this.computerChoice === "Rock") {
          return "lose";
        } else if(this.computerChoice === "Paper") {
          return "win";
        } else {
          return "draw";
        }
    }
  },
  showWinner() {
    const roundEndStatus = this.getWinner();

    console.log(this.userChoice + " vs. " + this.computerChoice);

    const showStatus = document.querySelector(".question h2");
    showStatus.innerText = `You ${roundEndStatus.toUpperCase()}`;
    
    const getChoicesElements = document.querySelectorAll(".choices");
    getChoicesElements.forEach(element => {
      const choiceData = element.dataset.choice;

      if(this.userChoice !== choiceData && this.computerChoice !== choiceData) {
        element.classList.add("not-selected");
      } else {
        element.classList.add("selected");
      }

      if(this.userChoice === choiceData) {
        if(roundEndStatus === "draw") {
          const div = element.cloneNode(true);
          div.classList.add("computer-choice");

          const getChoicesContainer = document.querySelector(".choices-container");
          getChoicesContainer.appendChild(div);
        }
        
        element.classList.add("user-choice");
      } else if(this.computerChoice === choiceData) {
        element.classList.add("computer-choice");
      }

    });
  },
  removeEvents() {
    const getChoicesElements = document.querySelectorAll(".choices");
    getChoicesElements.forEach(element => {
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