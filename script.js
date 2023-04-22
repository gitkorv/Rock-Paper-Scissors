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
    return computerChoice;
}

function getPlayerChoice() {
    let playerChoice = prompt("Rock, Paper or Scissor?");
    playerChoice = playerChoice.charAt(0).toUpperCase()+playerChoice.slice(1).toLowerCase();
    return playerChoice;
}

// Function for playing one round and returning a message including what hands was played
function game() {

    let playerScore = 0;
    let computerScore = 0;
    let roundsLeft = 5;
    let scoreUp = 0;
    let playerSelection = undefined;
    let computerSelection = undefined;
    let roundTie = undefined;
    let playerWinRound = undefined;
    let computerWinRound = undefined;

    function evaluateHands(playerSelection, computerSelection) {
        roundTie = false;
        playerWinRound = false;
        computerWinRound = false;

        if (playerSelection == "Rock" && computerSelection == "Scissor" || playerSelection == "Paper" && computerSelection == "Rock" || playerSelection == "Scissor" && computerSelection == "Paper") {
            playerWinRound = true;
        } else if (playerSelection == "Rock" && computerSelection == "Paper" || playerSelection == "Paper" && computerSelection == "Scissor" || playerSelection == "Scissor" && computerSelection == "Rock") {
            computerWinRound = true;
        } else if (playerSelection == computerSelection) {
            roundTie = true;
        } 
    }

    for (let i = 0; i < 5; i++) {

        playerSelection = getPlayerChoice();
        // console.log("player choice", playerSelection);
        
        // computerSelection = getComputerChoice();
        computerSelection = "Rock";
        // console.log("cpu choice", computerSelection );

        evaluateHands(playerSelection, computerSelection);

        function playRound(playerSelection, computerSelection) {
            let roundMessage = "";
            
            if (roundTie && scoreUp + 1 > roundsLeft) {
                roundMessage = `It's a tie! ${playerSelection} vs ${computerSelection}.`;
            } else if (roundTie) {
                // console.log("this");
                roundMessage = `It's a tie! ${playerSelection} vs ${computerSelection}, please try again.`;
            }  else if (playerWinRound) {
                playerScore++;
                roundMessage = `You win! ${playerSelection} beats ${computerSelection}`;
            } else if (computerWinRound) {
                computerScore++;
                roundMessage = `You loose! ${computerSelection} beats ${playerSelection}`;
            }
            return roundMessage;
        }

        console.log("ROUND " + (i+1) + "/5" + ": ");
        console.log(playRound(playerSelection, computerSelection));

        roundsLeft--;
        if (playerScore > computerScore) scoreUp = playerScore - computerScore;
        if (playerScore < computerScore) scoreUp = computerScore - playerScore;
        if (playerScore == computerScore) scoreUp = 0;
       
        // console.log("PL score: ", playerScore,"CPU score: ", computerScore,"scoreUp ", scoreUp,"rounds left: ", roundsLeft);

        if (playerScore - computerScore > roundsLeft || computerScore - playerScore > roundsLeft) {
            i = 5;
            console.log("Game Over");
        }   else if (scoreUp == 0 && roundsLeft == 1) {
            console.log(`Player: ${playerScore} Computer: ${computerScore}`);
            console.log("The next round wins the game!");           
            console.log("--------"); 
        }   else if (scoreUp == roundsLeft || scoreUp == roundsLeft - 1) {
            console.log(`Player: ${playerScore} Computer: ${computerScore}`);
            if (playerScore > computerScore) console.log("Let's go! One more will win you the game.");
            if (playerScore < computerScore) console.log("Focus now! The Computer will win if it takes the next round.");
            console.log("--------");
        }   else {
            console.log(`Player: ${playerScore} Computer: ${computerScore}`);
            console.log("Get ready for next round");
            console.log("--------");
        }
    }

    let endPhrase = "";

    if (playerScore > computerScore) {
        endPhrase = `The final score is ${playerScore}-${computerScore}. You won the game!`;
    }   else if (playerScore < computerScore) {
        endPhrase = `The final score is ${playerScore}-${computerScore}. The mighty Computer wins the game!`;
    } else {
        knockOutRound(playerScore, computerScore);
    }

    function knockOutRound(playerScore, computerScore) {
        console.log(`The game is still tied at ${playerScore}-${computerScore}, we need to play a final knock out round!`);
        
        for (let i = 0; i < 3; i++) {
        playerSelection = prompt("Choose your weapon!");
        computerSelection = getComputerChoice();
        
        // choicesAndRuleDefinitions();
    
        if (roundTie) {
            console.log(playerSelection + " vs " + computerSelection);
            // knockOutRound(playerScore, computerScore);
        } else if (playerWinRound) {
            playerScore++;
            console.log(`You won the game after a thrilling knock-out!!! ${playerSelection} beats ${computerSelection}, the final score is ${playerScore}-${computerScore}`);
        } else if (computerWinRound) {
            computerScore++;
            console.log(`You lost the knock-out! ${computerSelection} beats ${playerSelection}. The Computer is victorious in this game! Final score is ${playerScore}-${computerScore}`);
        }
            
        }
        
        
    }

    return endPhrase;
}

// game()
console.log(game());

// console.log("hello");

// function getValues() {
//     return {
//         first: getFirstValue("Hello"),
//         second: getSecondValue(),
//     }
// }

// const {first, second} = getValues()