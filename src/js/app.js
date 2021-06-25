const RockPaperScissors = {
  html: {
    choicesContainer: document.querySelector(".choices-container"),
    textBox: document.querySelector(".text-box h2"),
    button: document.querySelector("#play-again"),
  },
  
  init() {
    this.addEvents();
  },
  addEvents() {
    const choicesElement = document.querySelectorAll(".choices");

    choicesElement.forEach(element => element.addEventListener("click", this.play.bind(this), { once: true }));
  },
  getComputerChoice() {
    const choiceOptions = [ "Rock", "Paper", "Scissors" ];
    const choice = Math.floor(Math.random() * 3);

    return choiceOptions[choice];
  },
  getUserChoice(event) {
    const getDataChoice = event.target.dataset["choice"] || event.target.parentElement.dataset["choice"];

    return getDataChoice;
  },
  getMatchRoundResult(user, comp) {
    const winningCombinations = [ "Rock > Scissors", "Scissors > Paper", "Paper > Rock" ];

    if(winningCombinations.includes(`${user} > ${comp}`)) {
      return "win";
    } else if(winningCombinations.includes(`${comp} > ${user}`)) {
      return "lose";
    }
    return "draw";
  },
  clearChoicesContainer() {
    this.html["choicesContainer"].innerHTML = "";
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
  showWinner(user, comp) {
    const result = this.getMatchRoundResult(user, comp);
    
    this.html["textBox"].innerText = result.toUpperCase();
    this.html["textBox"].classList.add(result);
  },
  showQuestion() {
    this.html["textBox"].innerText = "Which one do you choose?";
    this.html["textBox"].classList.value = "";
  },
  createChoice(value, animation = "appear-and-rotate", playerClass) {
    const imagesLinks = {
      Rock: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/fisted-hand-sign_1f44a.png",
      Paper: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/raised-hand-with-fingers-splayed_1f590.png",
      Scissors: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/victory-hand_270c.png",
    };

    const Choice = document.createElement("div");

    Choice.classList.add("choices");
    if(playerClass) Choice.classList.add(playerClass);
    Choice.dataset.animation = animation;
    Choice.dataset.choice = value;

    Choice.innerHTML = `
      <img src="${imagesLinks[value]}" alt="Choose ${value.toLowerCase()}">
      <span class="tooltip">${value}</span>
    `;

    return Choice;
  },
  showOptionsChosen(user, comp) {
    this.clearChoicesContainer();

    const userChoiceElement = this.createChoice(user, "left-to-right", "user-choice");
    const computerChoiceElement = this.createChoice(comp, "right-to-left", "computer-choice");

    this.html["choicesContainer"].appendChild(userChoiceElement);
    this.html["choicesContainer"].appendChild(computerChoiceElement);
  },
  recreateOptions() {
    this.clearChoicesContainer();

    this.html["choicesContainer"].appendChild(this.createChoice("Rock"));
    this.html["choicesContainer"].appendChild(this.createChoice("Paper"));
    this.html["choicesContainer"].appendChild(this.createChoice("Scissors"));
  },
  showPlayAgainButton() {
    this.html["button"].classList.add("show");
    this.html["button"]
      .children[0]
      .addEventListener("click", this.restart.bind(this), { once: true });
  },
  hidePlayAgainButton() {
    this.html["button"].classList.remove("show");
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
    this.addEvents();
  },
}

window.addEventListener("load", () => {
  RockPaperScissors.init();
});