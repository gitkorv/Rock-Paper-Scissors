// function for computer choice

function getComputerChoice(){
    let RPSNumber = Math.floor(Math.random() * 3);
    let computerChoice = "";

    if (RPSNumber < 1) {
        computerChoice = "Rock";
    } else if (RPSNumber >= 2) {
        computerChoice = "Paper";
    } else {
        computerChoice = "Scissor";
    }

    // console.log(computerChoice);
    return computerChoice;
}

// Function for playing one round and returning a message including what hands was played

function playRound(playerSelection, computerSelection) {
    let result = "";
    playerSelection = playerSelection.charAt(0).toUpperCase()+playerSelection.slice(1).toLowerCase();
    if (playerSelection == "Rock" && computerSelection == "Rock" || playerSelection == "Paper" && computerSelection == "Paper" || playerSelection == "Scissor" && computerSelection == "Scissor") {
        result = `${playerSelection} vs ${computerSelection} means it's a tie, try again!`;
    } else if (playerSelection == "Rock" && computerSelection == "Scissor" || playerSelection == "Paper" && computerSelection == "Rock" || playerSelection == "Scissor" && computerSelection == "Paper") {
        result = `You win! ${playerSelection} beats ${computerSelection}`;
    }

    return result;
}

const playerSelection = getComputerChoice();
const computerSelection = getComputerChoice();
console.log(playRound(playerSelection, computerSelection));