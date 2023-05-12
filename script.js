function game() {

    let name = prompt("What is your name?");
    // console.log(name);
    let playerScore = 0;
    let computerScore = 0;
    let currentScore;
    let rounds = 5;
    let round = 0;
    let roundsLeft = rounds;
    let scoreUp = 0;
    let playerSelection;
    let computerSelection;
    let roundTie = undefined;
    let playerWinRound = undefined;
    let computerWinRound = undefined;

    if (name == "" || name == " ") {
        name = "blank";
        console.log(1, name);
        alert("Speak louder please, I did not hear that.")
        game();
    } else if (name == null) {
        console.log(2, name);
        alert(`Game canceled`);
    } else {
        alert(`Welcome ${name}!${'\n'}Let's play a game of Rock, Paper Scissor - best of ${rounds} rounds.${'\n'}Press OK to start.`);
    }

    for (let i = 0; i < rounds; i++) {

        round = i+1;

        switch (round) {
            case 1:
                choiceMessage = `${name}, let's play the ${round}st round...${'\n'}Will it be Rock, Paper or Scissor?`;
            break;
            case 2:
                choiceMessage = `Let's play Round ${round}.${'\n'}Rock, Paper or Scissor?`;
            break;
            case 3:
                choiceMessage = `Round ${round}.${'\n'}Choose wisely now.`;
            break;
            case 4:
                choiceMessage = `Round ${round}.${'\n'}It's getting hot in here`;
            break;
            case 5:
                choiceMessage = `One final round, will it be Rock, Paper or Scissor?`;
            break;
            case 6:
                choiceMessage = `The winner takes it all!`;
            break;
        }

        if (name == null || name == "blank") {
            return;
        } else {

            playerSelection = prompt(choiceMessage);
            
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
            computerSelection = getComputerChoice();
            // computerSelection = "Scissor";
            // computerSelection = "Rock";
        }

        let approvedSelection;
        let tryAgain = false;
            
        if (playerSelection == null) {
            alert("Game ended");
            approvedSelection = false;
        } else if (playerSelection.includes("ro") || playerSelection.charAt(0) == "r") {
            playerSelection = "Rock";
            approvedSelection = true;
        } else if (playerSelection.includes("pa") || playerSelection.charAt(0) == "p") {
            playerSelection = "Paper";
            approvedSelection = true;
        } else if (playerSelection.includes("is") || playerSelection.charAt(0) == "s" || playerSelection.charAt(0) == "c" || playerSelection.charAt(0) == "z") {
            playerSelection = "Scissor";
            approvedSelection = true;
        } else {
            tryAgain = true;
        }

        if (approvedSelection) {

               // Play hands against each other
            function playRound(playerSelection, computerSelection) {
                roundTie = false;
                playerWinRound = false;
                computerWinRound = false;
                roundError = false;

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

            playRound(playerSelection, computerSelection);
            round = i + 1;

            // Return a unique message depending on round result
            function makeRoundMessage(playerSelection, computerSelection, round) {
                let roundMessages = {};
                
                if (roundError) {
                    console.log("Sorry something went wrong here");
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

            let roundResultMessage = makeRoundMessage(playerSelection, computerSelection, round);
            
            roundsLeft--;
            if (playerScore > computerScore) scoreUp = playerScore - computerScore;
            if (playerScore < computerScore) scoreUp = computerScore - playerScore;
            if (playerScore == computerScore) scoreUp = 0;
        
            currentScore = `${name} ${playerScore} / Computer ${computerScore}`
            // console.log(round);
            let scoreDependantMessage = "";
            let roundCountMessage = `Round ${round} Score:`;

            // console.log(round, rounds, roundsLeft);

            if (playerScore - computerScore > roundsLeft || computerScore - playerScore > roundsLeft) {
                i = rounds;
                roundCountMessage = `The final Score after ${round} rounds are:`;
            }   else if (round == 5 && playerScore == computerScore) {
                rounds++;
                roundsLeft++;
                scoreDependantMessage = "We're heading to a knock-out round"
            }   else if (round > 5 && playerScore == computerScore) {
                rounds++;
                roundsLeft++;
                scoreDependantMessage = "We go yet another round!"
            }   else if (scoreUp == 0 && roundsLeft == 1) {
                scoreDependantMessage = "The next round wins the game!";           
            }   else if (scoreUp == roundsLeft) {
                if (playerScore > computerScore) scoreDependantMessage = "A win or draw next wins you the game.";
                if (playerScore < computerScore) scoreDependantMessage = "You have to win this next one, a draw and it's game over";
            }   else if (scoreUp == roundsLeft - 1) {
                if (playerScore > computerScore) scoreDependantMessage = "Let's go! One more will win you the game.";
                if (playerScore < computerScore) scoreDependantMessage = "Focus now! The Computer will win if it takes the next round.";
            }   else {
                scoreDependantMessage = "Next round coming up...";
            }

            let dashesLength = name.length + 15;
            let nameDashes = "";

            for (let i = 0; i < dashesLength; i++) {
                nameDashes += "-";
            }

            console.log(roundCountMessage);
            console.log(currentScore);
            console.log(nameDashes); 
            alert(`${roundResultMessage.top}${'\n'}${roundResultMessage.bottom}${'\n'}${scoreDependantMessage}`);

        } else if (tryAgain) {
            alert("Sorry, I didn't get that, please try again.");
            i--;
        } else {
            console.log("Bye bye.");
            i = rounds;
        }
    }

    let endPhrase = "";

    if (playerScore > computerScore) {
        endPhrase = `The final score is ${playerScore}-${computerScore}. You won the game ${name}!`;
        alert(endPhrase);
    }   else if (playerScore < computerScore) {
        endPhrase = `The final score is ${playerScore}-${computerScore}. The mighty Computer wins the game!`;
        alert(endPhrase);
    } else {
        endPhrase = "Come again!"
    }


}

game()
// alert(game());
