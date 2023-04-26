// Get computer choice
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
// Get player name
function getPlayerName() {
    let name = prompt("What is your name?")
    return name;
}
// Get player choice
function getPlayerChoice(name, i) {
    let playerChoice = "";

    let round = i+1;

    switch (round) {
        case 1:
            playerChoice = prompt(`Ok ${name}, let's play the ${round}st round...${'\n'}Will it be Rock, Paper or Scissor?`);
        break;
        case 2:
            playerChoice = prompt(`Let's play Round ${round}.${'\n'}Rock, Paper or Scissor?`);
        break;
        case 3:
            playerChoice = prompt(`Round ${round}.${'\n'}Choose wisely now.`);
        break;
        case 4:
            playerChoice = prompt(`Round ${round}.${'\n'}It's getting hot in here`);
        break;
        case 5:
            playerChoice = prompt(`One final time will it be Rock Paper or Scissor?`);
        break;
    }

    if (playerChoice == null) alert("Game ended");

    let lowerCase = playerChoice.toLowerCase();
    
    // console.log(lowerCase);

    if (lowerCase.includes("ro") || lowerCase.charAt(0) == "r") {
        playerChoice = "Rock";
    } else if (lowerCase.includes("pa") || lowerCase.charAt(0) == "p") {
        playerChoice = "Paper";
    } else if (lowerCase.includes("is") || lowerCase.charAt(0) == "s" || lowerCase.charAt(0) == "c" || lowerCase.charAt(0) == "z") {
        playerChoice = "Scissor";
    }
    // console.log(playerChoice);
    playerChoice = playerChoice.charAt(0).toUpperCase()+playerChoice.slice(1).toLowerCase();
    // console.log(playerChoice);
    // console.log(playerChoice);
    return playerChoice;

    
}

function game() {

    let name = getPlayerName();
    // console.log(name);

    if (name == "" || name == " ") {
        name = null;
        console.log(name);
        alert("Speak louder please, I did not hear that.")
        game();
    } else if (name == null) {
        console.log(name);
        alert(`Game canceled`);
    } else {
        alert(`Welcome ${name}!${'\n'}Let's play a game of Rock, Paper Scissor - best of five rounds.${'\n'}Press OK to start.`);

    }


    let playerScore = 0;
    let computerScore = 0;
    let currentScore = [];
    let rounds = 5;
    let round = 0;
    let roundsLeft = rounds;
    let scoreUp = 0;
    let playerSelection = undefined;
    let computerSelection = undefined;
    let roundTie = undefined;
    let playerWinRound = undefined;
    let computerWinRound = undefined;
    let validSelection = undefined;

    // Check players hand for validity
    function evaluatePlayerSelection(playerSelection) {
        if (playerSelection == "Rock" || playerSelection == "Paper" || playerSelection == "Scissor") {
            validSelection = true;
        } else {
            validSelection = false;
        }
        return validSelection;
    }

    // Play hands against each other
    function playRound(playerSelection, computerSelection) {
        roundTie = false;
        playerWinRound = false;
        computerWinRound = false;
        roundError = false;

        // console.log(playerSelection, computerSelection);

        if (playerSelection == "Rock" && computerSelection == "Scissor" || playerSelection == "Paper" && computerSelection == "Rock" || playerSelection == "Scissor" && computerSelection == "Paper") {
            playerWinRound = true;
        } else if (playerSelection == "Rock" && computerSelection == "Paper" || playerSelection == "Paper" && computerSelection == "Scissor" || playerSelection == "Scissor" && computerSelection == "Rock") {
            computerWinRound = true;
        } else if (playerSelection == computerSelection) {
            roundTie = true;
        } else {
            roundError = true;
        }
    }

    // Return a unique message depending on round result
    function makeRoundMessage(playerSelection, computerSelection, i, round) {
        let roundMessages = {};
        
        if (roundError) {
            console.log("Sorry I did not get that");
            // playerSelection = prompt("spell corectly!")
            // playRound(playerSelection, computerSelection);
        } else if (roundTie) {
            roundMessages = {
                top: `Round ${round} is a tie!`,
                bottom: `${playerSelection} vs ${computerSelection}.`
            };
        }  else if (playerWinRound) {
            playerScore++;
            roundMessages = {
                top: `You win round ${round}!`,
                bottom: `${playerSelection} beats ${computerSelection}.`
            };
        } else if (computerWinRound) {
            computerScore++;
            roundMessages = {
                top: `Haha! You lost round ${round}!`,
                bottom: `${computerSelection} beats ${playerSelection}.`
            };
        } 
        
        return roundMessages;
    }

    for (let i = 0; i < rounds; i++) {

        let approvedSelection;

        if (name == null) {
            return;
        } else {
             // Get player selection
            playerSelection = getPlayerChoice(name, i);        
            computerSelection = getComputerChoice();
            // computerSelection = "Rock";

            // console.log(playerSelection, computerSelection);
            approvedSelection = evaluatePlayerSelection(playerSelection);
            // console.log(approvedSelection);
        }
       

        

        if (approvedSelection) {
            playRound(playerSelection, computerSelection);
            round = i + 1;
            let roundResultMessage = makeRoundMessage(playerSelection, computerSelection, i, round);
            
            roundsLeft--;
            if (playerScore > computerScore) scoreUp = playerScore - computerScore;
            if (playerScore < computerScore) scoreUp = computerScore - playerScore;
            if (playerScore == computerScore) scoreUp = 0;
        
            currentScore = ["Player:", playerScore,"Computer:", computerScore,"ScoreUp", scoreUp,"Rounds Left:", roundsLeft]
            // console.log(round);
            let scoreDependantMessage = "";

            if (playerScore - computerScore > roundsLeft || computerScore - playerScore > roundsLeft) {
                i = rounds;
                console.log("Final Score:");

                console.log(currentScore[0], currentScore[1], currentScore[2], currentScore[3]);
                // scoreDependantMessage = "Game Over";
            }   else if (scoreUp == 0 && roundsLeft == 1) {
                console.log("Round " + round + " Score:");
                console.log(currentScore[0], currentScore[1], currentScore[2], currentScore[3]);
                console.log("--------"); 
                scoreDependantMessage = "The next round wins the game!";           
            }   else if (scoreUp == roundsLeft || scoreUp == roundsLeft - 1) {
                console.log("Round " + round + " Score:");
                console.log(currentScore[0], currentScore[1], currentScore[2], currentScore[3]);
                console.log("--------");
                if (playerScore > computerScore) scoreDependantMessage = "Let's go! One more will win you the game.";
                if (playerScore < computerScore) scoreDependantMessage = "Focus now! The Computer will win if it takes the next round.";
            }   else {
                console.log("Round " + round + " Score:");
                console.log(currentScore[0], currentScore[1], currentScore[2], currentScore[3]);
                console.log("--------");
                scoreDependantMessage = "Next round coming up...";
            }

            alert(`${roundResultMessage.top}${'\n'}${roundResultMessage.bottom}${'\n'}${scoreDependantMessage}`);
            // alert(roundResultMessage.bottom);
        } else {
            alert("Sorry, I didn't get that, please try again.");
            i--;
        }

    }

    let endPhrase = "";

    if (playerScore > computerScore) {
        endPhrase = `The final score is ${playerScore}-${computerScore}. You won the game ${name}!`;
    }   else if (playerScore < computerScore) {
        endPhrase = `The final score is ${playerScore}-${computerScore}. The mighty Computer wins the game!`;
    } else {
        console.log("even");
        // for (let i = 0; i < 3; i++) {
        //     playRound(playerScore, computerScore);
        // }
    }

    alert(endPhrase);
}

game()
// alert(game());

// console.log("hello");

// function getValues() {
//     return {
//         first: getFirstValue("Hello"),
//         second: getSecondValue(),
//     }
// }

// const {first, second} = getValues()