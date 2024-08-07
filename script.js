const mainContainer = document.querySelector(".main-container");
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const middleX = windowWidth / 2;
const middleY = windowHeight / 2;
/* 
Select the top area
*/
let topAreaTextContainer = document.querySelector(".top-area__text-container");
let topAreaTextContainerChildren = Array.from(topAreaTextContainer.children)
let topAreaWrapper = document.querySelector(".top-area--wrapper");

// Hide round counter spans
topAreaTextContainerChildren.forEach(child => child.classList.add("hidden"));
// Show welcome -- Hi there! -- message
let hiThere = document.createElement("span");
hiThere.textContent = "Hi There!"
hiThere.classList.add("top-area__text-container__hi-there");
topAreaWrapper.classList.add("justify-content-center");
topAreaTextContainer.appendChild(hiThere);

/* 
Select the center area 
*/
const centerArea = document.querySelector(".center-area")
let h2Text = document.querySelector(".center-area__h2Text");
let h2TextSpanContainers = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span-container"));

// let h2SpanElements = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span"));
const h1Text = document.querySelector(".center-area__h1Text")
let h1TextRPSAllChildren = Array.from(h1Text.querySelectorAll("span"));

// Set animation delays for ROCK, PAPER, SCISSOR,
// And also time for showing PLAY BUTTON
let timeDelay = 1.75;
let timeDelayIncrementor = 0.5;

let showPlayButtonTimeDelay = (timeDelayIncrementor * 3 + timeDelay + 0.25) * 1000;

for (let i = 0; i < h1TextRPSAllChildren.length; i++) {
    h1TextRPSAllChildren[i].style.animationDelay = timeDelay + "s";
    timeDelay = timeDelay + timeDelayIncrementor;
}

const originalH2TextStructure = h2Text.innerHTML;
/* 
Set initial text of H2
*/
h2TextSpanContainers.forEach(element => element.style.display = "none");
const letsPLayAGameMessage = document.createElement("span")
letsPLayAGameMessage.classList.add("center-area__h2Text")
letsPLayAGameMessage.textContent = "Let's play a game of"
h2Text.appendChild(letsPLayAGameMessage)

/* 
Select playing buttons
*/
const btnContainer = document.querySelector(".btn-container");
const btnWrapperAll = document.querySelector(".btn-wrapper-all");
const playerChoiceButtons = document.querySelectorAll(".play-button")
const playerChoiceButtonArray = Array.from(playerChoiceButtons)
/* 
Hide Playing Hands Buttons 
*/
playerChoiceButtonArray.forEach(button => button.style.display = "none");

/* 
Create initial button "Lets play" and add it to layout
*/
const letsPlayButton = document.createElement("button");
letsPlayButton.classList.add("lets-play")

function setLetsPLayButton(params) {

    btnWrapperAll.appendChild(letsPlayButton);
    btnWrapperAll.style.transitionDuration = "1s";
    btnWrapperAll.style.opacity = "0";
    // get with of letsPlayButton
    let letsPlayButtonWidth = letsPlayButton.getBoundingClientRect().width;

    setTimeout(() => {
        btnWrapperAll.style.opacity = "1";
        btnWrapperAll.classList.remove("zero-width");
        letsPlayButton.textContent = "Sure, let's do this!";

        let letsPlayTransitionDuration = parseFloat(window.getComputedStyle(letsPlayButton).transitionDuration.split(", ")[1]) * 1000;
        // After letsPlayButton has transitioned... 
        setTimeout(() => {
            btnWrapperAll.style.transitionDuration = "";

        }, letsPlayTransitionDuration);
    }, showPlayButtonTimeDelay);
    letsPlayButton.addEventListener("click", newGame);
}

setLetsPLayButton()

/* 
Select Score Tracker
*/
const scoreContainer = document.querySelector(".score-container");

let topAreaBorder = document.querySelector(".top-area__border");

/*
On window load, Bring in h2Text etc
*/
window.onload = function () {
    alignH1Background()
    setWidthsForCurrentScoreSpans(playerScore, cpuScore);


    topAreaWrapper.classList.add("show-rounds");
    topAreaBorder.classList.add("opacity1");
    h2Text.style.visibility = "hidden";
    setTimeout(() => {
        h2Text.style.visibility = "";

        h2Text.classList.toggle("center-area__h2Text--wayOffLeft");
    }, 750);

    setTimeout(() => {
        h2Text.classList.toggle("center-area__h2Text--wayOffLeft");

        // Get transition duration for LetsPlay button

    }, showPlayButtonTimeDelay);
}

let playerChoice
let playerScore
let cpuScore
let roundsPlayed
let roundsToPlay
let roundsLeftToPlay
let currentRound
let winningHand = "test";

let currentScorePara = document.querySelector(".current-score-para");
let currentScoreHeadline = document.querySelector(".current-score__headline");
// console.log(currentScoreHeadline);
let currentScorePlayer = currentScorePara.querySelector(".current-score__player-span-number");
let currentScorePlayerWrapper = currentScorePlayer.parentElement;
// console.log(currentScorePlayerWrapper);
let currentScoreCpu = currentScorePara.querySelector(".current-score__cpu-span-number");
let currentScoreCpuWrapper = currentScoreCpu.parentElement;

let currentScoreParaWidth = currentScorePara.getBoundingClientRect().width;
// console.log(currentScoreParaWidth);
// console.log(windowWidth);
// currentScorePara.style.left = (windowWidth - currentScoreParaWidth) / 2 + "px";

let h1TextAnimDuration;
let h1TextAnimDelay;


// cpuWonGame()


let roundTextHeight = topAreaTextContainer.getBoundingClientRect().height;
topAreaTextContainer.style.height = roundTextHeight + "px";

const allButtons = document.querySelectorAll("button");
let lastTouchedElement = null;

function handleMouseOver() {
    this.classList.add("hovered")
}
function handleMouseOut() {
    this.classList.remove("hovered")
}
function handleTouchStart(event) {
    lastTouchedElement = event.target;
    lastTouchedElement.classList.add("active");
    event.target.classList.add("hovered");
}
function handleTouchMove(event) {
    console.log(event);
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.tagName === "BUTTON") {

        if (lastTouchedElement && lastTouchedElement !== element) {
            lastTouchedElement.classList.remove("active", "hovered")
        }
        lastTouchedElement = element;
        element.classList.add("active", "hovered")

        // console.log("this is a button");
        // allButtons.forEach(button => button.classList.remove("hovered"));
        // element.classList.add("hovered")
    } else {
        if (lastTouchedElement) {
            lastTouchedElement.classList.remove("active", "hovered")
        }
        lastTouchedElement = null;
        // allButtons.forEach(button => button.classList.remove("hovered"));

    }
}
function handleTouchEnd(event) {
    // console.log(event);

    if (lastTouchedElement) {
        console.log("last touched ", lastTouchedElement.classList.add("active"));
    }

    // event.target.classList.add("active");
    allButtons.forEach(button => button.classList.remove("active", "hovered"));

    // const touch = event.touches[0];
    // const element = document.elementFromPoint(touch.clientX, touch.clientY);

    // console.log(element);

    // if (element && element.classList.contains("play-button")) {
    //     allButtons.forEach(button => button.classList.remove("hovered"));
    //     element.classList.add("active")
    // } else {
    //     allButtons.forEach(button => button.classList.remove("hovered"));
    // }

    setTimeout(() => {
        event.target.classList.remove("active");
    }, 500);

    // this.classList.remove("hovered");
    // setTimeout(() => {
    //     // this.style.outline = "";
    //     // this.style.color = "";

    //     this.classList.remove('hovered');
    // }, 100);
}
function handleTouchCancel() {
    this.classList.remove("hovered")
}

allButtons.forEach(button => {
    button.addEventListener('mouseover', handleMouseOver);
    button.addEventListener('mouseout', handleMouseOut);
    button.addEventListener('touchstart', handleTouchStart);
    button.addEventListener('touchmove', handleTouchMove);
    button.addEventListener('touchend', handleTouchEnd);
    button.addEventListener('touchcancel', handleTouchCancel);

    button.addEventListener('click', function (event) {
        // this.style.outline = "4px solid #f72585";
        // this.style.color = "#f72585";
        if (event.target.classList.contains("play-button")) {
            console.log("its a play button");
            playerChoiceButtons.forEach(button => {
                button.classList.add("btn-fade-out-and-back");
            })
            playerChoiceButtons.forEach(button => {
                button.addEventListener('animationend', function (e) {
                    console.log("anim ended");
                    button.classList.remove("btn-fade-out-and-back", "slower");

                })
            })
            // this.classList.remove("btn-fade-out-and-back")
            this.classList.add("slower");

        }

        this.classList.add("active");
        // Prevent the default action of the click event
        event.preventDefault();
        // Remove the "hovered" class after a delay to allow time for the touch event to complete
        setTimeout(() => {
            // this.style.outline = "";
            // this.style.color = "";
            this.classList.remove('hovered', "active");
        }, 500);
        // setTimeout(() => {
        //     allButtons.forEach(button => {
        //         button.classList.remove("btn-fade-out-and-back", "slower");
        //     })
        // }, 4000);
    });
    // allButtons.forEach(button => {
    //     button.addEventListener('animationend', function(e) {
    //         console.log("anim ended");
    //     })
    // })

});

let canvasDripWrapper = document.querySelector(".canvas-wrapper-all");
// canvasDripWrapper.style.transition = "none";
canvasDripWrapper.classList.add("zero-opacity");
canvasDripWrapper.classList.add("trans");
// canvasDripWrapper.style.transition = "";

let gameInPlay = false;


function newGame(gameOver, gameInPlay) {
    // console.log("gameOver is" + gameOver);
    currentScorePara.classList.add("zero-width");

    let h2TextSpanContainers = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span-container"));
    h2TextSpanContainers.forEach(spanContainer => spanContainer.style.display = "none");


    btnWrapperAll.classList.add("zero-width")
    setTimeout(() => {
        letsPlayButton.classList.add("zero-width");

        btnWrapperAll.classList.remove("zero-width")

        currentScoreHeadline.textContent = "Current Score:";


        // console.log(currentScorePara);

        // currentScorePara.addEventListener('transitionend', function(e) {
        //     console.log(e);
        // })

        // currentScorePara.removeEventListener('transitionend', function(e) {
        //     console.log(e);
        // })


        // letsPlayButton.style.display = "none";
        playerChoiceButtonArray.forEach(button => {
            button.addEventListener("click", pickHand);
            button.style.display = "";
        })
    }, 500);




    // topAreaWrapper.classList.remove("hi-there-effect")
    topAreaWrapper.classList.remove("show-rounds");
    // letsPlayButton.style.display = "none";
    setTimeout(() => {
        if (topAreaTextContainer.lastChild === hiThere) {
            topAreaTextContainer.removeChild(hiThere);
        }
        topAreaTextContainerChildren.forEach(child => child.classList.remove("hidden"));
        topAreaWrapper.classList.remove("justify-content-center");

    }, 1000);

    // topAreaTextContainer.innerHTML = originalTopAreaTextContainerHTML;


    playerChoice;
    playerScore = 0;
    cpuScore = 0;
    roundsPlayed = 0;
    roundsToPlay = 5;
    roundsLeftToPlay
    currentRound = 0;
    keepGoing = true;

    resultMessage = `Choose Your Weapon!`;
    setH1AnimTimesAndMessages(resultMessage, gameInPlay);
    // h2Text.textContent = "";
    h2Text.appendChild(letsPLayAGameMessage);
    // letsPLayAGameMessage.textContent = `Great, here goes round ${currentRound + 1}`;
    letsPLayAGameMessage.textContent = `Great, here goes round one!`;
    letsPLayAGameMessage.classList.add("black");
    setTopRoundTicker();
    setH2TextEffects(keepGoing, undefined, winningHand, currentRound, gameOver)

    // setH2TextEffects(undefined, undefined, undefined, undefined, gameOver)
}



function pickHand(event) {
    playerChoice = event.target.textContent;
    // console.log(playerHand);
    playRound(playerChoice);
}

function getCpuChoice() {
    let hands = ["Rock", "Paper", "Scissor"]
    let dice = Math.floor(Math.random() * 3);
    return hands[dice];
}

function playRound(playerChoice) {
    gameInPlay = true;
    h2Text.classList.remove("black");
    roundsPlayed++;

    // let computerChoice = getCpuChoice();
    let computerChoice = "Rock";
    h2Text.innerHTML = originalH2TextStructure;
    // console.log(h2Text);

    let playerHand = document.querySelector(".center-area__h2Text__player-span")
    let vsSpan = document.querySelector(".center-area__h2Text__vs-span")
    let cpuHand = document.querySelector(".center-area__h2Text__cpu-span")
    let boldTextNumber = [];
    playerHand.textContent = playerChoice;
    cpuHand.textContent = computerChoice;

    let whoWonRound;


    if (playerChoice === computerChoice) {
        vsSpan.textContent = "vs";
        resultMessage = "The Round is a tie";
        boldTextNumber.push(0);
        boldTextNumber.push(2);
        winningHand = playerChoice;
        whoWonRound = "both";
    } else if (
        playerChoice === "Rock" && computerChoice === "Scissor" ||
        playerChoice === "Paper" && computerChoice === "Rock" ||
        playerChoice === "Scissor" && computerChoice === "Paper"
    ) {
        resultMessage = "You Won the Round!"
        vsSpan.textContent = "beats";
        playerScore++;
        boldTextNumber.push(0);
        winningHand = playerChoice;
        whoWonRound = "player";

    } else {
        resultMessage = "The Computer Won the Round!"
        vsSpan.textContent = "lost to";
        cpuScore++;
        boldTextNumber.push(2);
        winningHand = computerChoice;
        whoWonRound = "cpu";
    }

    /*
    Find out if the game is over
    */

    let scoreDiff = 0;

    if (playerScore > cpuScore) {
        scoreDiff = playerScore - cpuScore;
    } else if (cpuScore > playerScore) {
        scoreDiff = cpuScore - playerScore;
    } else {
        scoreDiff = 0;
    }

    let keepGoing = true;
    let gameOver = false;

    roundsLeftToPlay = roundsToPlay - roundsPlayed;

    if (roundsPlayed === roundsToPlay || scoreDiff > roundsLeftToPlay) {
        if (playerScore > cpuScore) {
            resultMessage = `You won the game!`;
            // h2Text.textContent = `Final Score: ${playerScore} - ${cpuScore}`
            // setH2TextEffects(keepGoing, boldTextNumber, winningHand)
            topAreaWrapper.classList.remove("show-rounds");
            // topAreaWrapper.classList.add("no-transition");
            topAreaWrapper.style.transitionDuration = ".2s";
            keepGoing = false;
            // canvasDripWrapper.classList.remove("zero-opacity")
            gameOver = true;

            setTimeout(() => {
                startFireWork();

            }, 1500);
            restartGame(gameOver);

        } else if (playerScore < cpuScore) {
            resultMessage = `The Computer won the game!`;
            // h2Text.textContent = `Final Score: ${playerScore} - ${cpuScore}`
            // setH2TextEffects(keepGoing, boldTextNumber, winningHand)

            topAreaWrapper.classList.remove("show-rounds");
            // topAreaWrapper.classList.add("no-transition");
            topAreaWrapper.style.transitionDuration = ".2s";

            gameOver = true;
            keepGoing = false;
            cpuWonGame();
            restartGame(gameOver);
        } else {
            // setH2TextEffects(keepGoing, boldTextNumber, winningHand)

            topAreaWrapper.classList.remove("show-rounds");
            // topAreaWrapper.classList.add("no-transition");
            topAreaWrapper.style.transitionDuration = ".2s";

            setTimeout(() => {
                topAreaWrapper.style.transitionDuration = "";

                topAreaWrapper.classList.remove("no-transition");
                topAreaTextContainerChildren.forEach(child => child.classList.add("hidden"));
                hiThere.textContent = `The game is tied`
                hiThere.classList.add("top-area__text-container__hi-there")
                topAreaTextContainer.appendChild(hiThere);

                setTimeout(() => {
                    topAreaWrapper.classList.add("show-rounds");

                }, 1000);
            }, 500);


            // h2Text.textContent = `It's a tie: ${playerScore} - ${cpuScore}`
            resultMessage = `Let's play a knock-out round!`;
            roundsToPlay++;
            keepGoing = false;
        }
    }
    setTopRoundTicker(keepGoing);
    setH1AnimTimesAndMessages(resultMessage, gameOver, whoWonRound)
    setCurrentScoreMessages(playerScore, cpuScore, keepGoing, currentRound, whoWonRound);
    currentRound++;
    setH2TextEffects(keepGoing, boldTextNumber, winningHand, currentRound, gameOver)


}

function setTopRoundTicker(keepGoing) {
    if (keepGoing === true) {
        topAreaWrapper.classList.add("show-rounds");
        // let roundTextHeight = topAreaTextContainer.getBoundingClientRect().height;
        // console.log(roundTextHeight);
        let topAreaRoundNumberContainer = document.querySelector(".top-area__text-container__number")
        topAreaRoundNumberContainer.style.height = roundTextHeight * 2 + "px";
        // console.log(topAreaRoundNumberContainer.style.height);
        let topAreaTopRoundNumber = document.querySelector(".top-area__text-container__number--top")
        let topAreaBottomRoundNumber = document.querySelector(".top-area__text-container__number--bottom")
        topAreaTopRoundNumber.textContent = 1;
        if (currentRound > 0) {
            topAreaTopRoundNumber.textContent = currentRound;
            topAreaBottomRoundNumber.textContent = currentRound + 1;
            topAreaRoundNumberContainer.classList.add("slide-up");
            let slideUpElement = topAreaTextContainer.querySelector(".top-area__text-container__number.slide-up")
            slideUpElement.style.transform = `translateY(-${roundTextHeight}px)`;

            setTimeout(() => {
                topAreaTopRoundNumber.textContent = currentRound;
                topAreaRoundNumberContainer.classList.remove("slide-up");
                slideUpElement.style.transform = `translateY(-0px)`
            }, 950);
        }
    }
}

function setH2TextEffects(keepGoing, boldTextNumber, winningHand, currentRound, gameOver) {
    // console.log("gameOver is " + gameOver);

    // console.log(currentRound);

    if (currentRound >= 1) {
        h2Text.classList.add("font-5rem");

    } else {
        h2Text.classList.remove("font-5rem");

    }

    // if (currentRound !== undefined && !gameOver) {
    //     console.log(`currentRound: ${currentRound}, gameOver: ${gameOver}`);
    //     h2Text.classList.add("font-5rem");
    // } else if (currentRound === undefined && !gameOver) {
    //     console.log(`currentRound: ${currentRound}, gameOver: ${gameOver}`);
    // } else if (currentRound === undefined && gameOver === undefined){
    //     console.log(`currentRound: ${currentRound}, gameOver: ${gameOver}`);

    //     let h2TextSpanContainers = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span-container"));
    //     h2TextSpanContainers.forEach(spanContainer => spanContainer.style.display = "none");
    //     h2Text.classList.add("font-5rem");
    // }


    h2Text.classList.toggle("h2Text-fade-in");
    h2Text.addEventListener('animationend', function() {
        console.log("h2 finished animation");
        h2Text.classList.toggle("h2Text-fade-in");
    }, {once:true})
    // setTimeout(() => {
    //     h2Text.classList.toggle("h2Text-fade-in");
    // }, 3000);
    // Grab h2 spans as an array
    let h2SpanElements = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span"));
    let h2TextSpanContainers = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span-container"))

    if (boldTextNumber !== undefined) {
        if (keepGoing === true || keepGoing === false) {
            let handWidth
            if (boldTextNumber.length < 2) {
                handWidth = h2SpanElements[boldTextNumber].getBoundingClientRect().width;
                h2TextSpanContainers[boldTextNumber].style.width = handWidth + "px";
                h2SpanElements[boldTextNumber].classList.add("bold-anim");
                h2SpanElements[boldTextNumber].classList.add("with-after");
                h2SpanElements[boldTextNumber].classList.add(`${winningHand.toLowerCase()}`);
    
                // console.log(boldTextNumber.toString());
                switch (boldTextNumber.toString()) {
                    case "0":
                        console.log("it's 0");
                        h2SpanElements[2].classList.add("vs-anim");
                        break;
                    case "2":
                        // console.log("it's 2");
                        h2SpanElements[0].classList.add("vs-anim");
                        break;
                    default:
                        break;
                }
            } else {
                boldTextNumber.forEach(number => {
                    handWidth = h2SpanElements[number].getBoundingClientRect().width;
                    console.log(handWidth);
                    h2TextSpanContainers[number].style.width = handWidth + "px";
                    h2SpanElements[number].classList.add("bold-anim");
                    h2SpanElements[number].classList.add("bold-anim-double");
                    h2SpanElements[number].classList.add("with-after");
                    h2SpanElements[number].classList.add(`${winningHand.toLowerCase()}`);
                });
            }
            h2SpanElements[1].classList.add("vs-anim");
    
        }
    }

    
}

function alignH1Background(params) {
    let bottomOfH1Text = h1Text.getBoundingClientRect().bottom
    let h1TextBackground = document.querySelector(".center-area__h1Text--background");
    let bottomOfH1TextBackground = h1TextBackground.getBoundingClientRect().bottom;

    if (bottomOfH1TextBackground !== bottomOfH1Text) {
        let bottomDifference = bottomOfH1TextBackground - bottomOfH1Text;
        let currentBottomOfH1TextBackground = parseInt(window.getComputedStyle(h1TextBackground).bottom);
        h1TextBackground.style.bottom = currentBottomOfH1TextBackground + bottomDifference + "px";
    }
}

let h1Canvas = document.getElementById("center-area__h1Canvas");
const h1CanvasCTX = h1Canvas.getContext("2d");

const h1CanvasRect = h1Canvas.getBoundingClientRect();

function setH1TextRotationAndCanvasLine(resultMessage, gameOver, whoWonRound, gameInPlay) {
    alignH1Background()
    // console.log(gameOver);

    h1Text.style.transitionDuration = "";

    if (gameInPlay || gameOver) h1Text.classList.add("color-fade");

    // h1Text.classList.toggle("color-fade");

    // console.log(gameInPlay);

    h1Canvas.width = window.innerWidth;
    h1Canvas.height = window.innerHeight;

    let h1TextCorners = {
        topLeft: [h1Text.getBoundingClientRect().x, h1Text.getBoundingClientRect().y],
        topRight: [h1Text.getBoundingClientRect().right, h1Text.getBoundingClientRect().y],
        bottomLeft: [h1Text.getBoundingClientRect().x, h1Text.getBoundingClientRect().bottom],
        bottomRight: [h1Text.getBoundingClientRect().right, h1Text.getBoundingClientRect().bottom]
    }

    let pathLength = h1Text.getBoundingClientRect().width * 2 + h1Text.getBoundingClientRect().height * 2;
    let oneUnitOfPathLength = pathLength * 0.02;
    // console.log(pathLength);
    let speed = 4;
    let dashOffset = 0;
    let lastTime = 0;
    let whoReallyWonRound;
    // WhoWonRound is only passed on the first time animateH1Path is called, after that it becomes undefined due to being called by requestanimationframe //

    function animateH1Path(timestamp, whoWonRound) {


        if (whoWonRound !== undefined) {
            whoReallyWonRound = whoWonRound;
        }
        // console.log(whoReallyWonRound);

        let elapsedTime = timestamp - lastTime;

        if (elapsedTime > speed) {
            // h1CanvasCTX.clearRect(0, 0, h1Canvas.width, h1Canvas.height);
            h1CanvasCTX.lineDashOffset = pathLength - dashOffset;

            h1CanvasCTX.beginPath();
            h1CanvasCTX.moveTo(h1TextCorners.topLeft[0], h1TextCorners.topLeft[1]);
            h1CanvasCTX.lineTo(h1TextCorners.topRight[0], h1TextCorners.topRight[1]);
            h1CanvasCTX.lineTo(h1TextCorners.bottomRight[0], h1TextCorners.bottomRight[1]);
            h1CanvasCTX.lineTo(h1TextCorners.bottomLeft[0], h1TextCorners.bottomLeft[1]);
            h1CanvasCTX.lineTo(h1TextCorners.topLeft[0], h1TextCorners.topLeft[1]);
            h1CanvasCTX.closePath();

            h1CanvasCTX.setLineDash([pathLength, pathLength])
            h1CanvasCTX.strokeStyle = "white";
            h1CanvasCTX.lineWidth = ".5";
            h1CanvasCTX.stroke();


            // else {
            //     h1CanvasCTX.clearRect(0, 0, h1Canvas.width, h1Canvas.height);
            // }
            // dashOffset -= pathLength * speed;
            dashOffset += oneUnitOfPathLength;
            lastTime = timestamp;
        }

        if (h1CanvasCTX.lineDashOffset >= 0) {
            requestAnimationFrame(animateH1Path)
        } else {
            h1CanvasCTX.clearRect(0, 0, h1Canvas.width, h1Canvas.height);

            if (gameOver && whoReallyWonRound === "cpu") {
                // canvasDripWrapper.classList.remove("zero-opacity");
                h1Text.classList.add("center-area__h1Text--rotate-in-cpuWon")
            } else {
                h1Text.classList.add("center-area__h1Text--rotate-in")
            }


            h1TextAnimDuration = parseFloat(window.getComputedStyle(h1Text).animationDuration.split(", ")[0]) * 1000;
            h1TextAnimDelay = parseFloat(window.getComputedStyle(h1Text).animationDelay.split(", ")[0]) * 1000;

            // console.log(h1Text);
            let h1TextWidth
            let currentH1TextContent = h1Text.textContent;
            h1Text.textContent = `${resultMessage}`;
            h1TextWidth = h1Text.getBoundingClientRect().width;
            // h1TextHeight = h1Text.getBoundingClientRect().height;
            h1Text.textContent = currentH1TextContent;

            // console.log(currentH1TextContent);

            let containsRock = currentH1TextContent.includes("Rock");

            // console.log(containsRock);

            if (containsRock) {
                h1Text.style.fontSize = "2rem";
            }


            // setTimeout(() => {
            //     drawLineAroundH1Text(h1Canvas)
            // }, 700);

            setTimeout(() => {
                h1Text.style.fontSize = "";
                h1Text.style.transitionDuration = "0s";
                requestAnimationFrame(() => {
                    if (gameInPlay || gameOver) h1Text.classList.remove("color-fade");
                })



                if (gameOver && whoReallyWonRound === "cpu") {
                    // canvasDripWrapper.classList.remove("zero-opacity");
                    console.log("were doing it");
                    h1Text.classList.add("center-area__h1Text--rotate-in--cpuWon-part2")
                } else {
                    h1Text.classList.add("center-area__h1Text--rotate-in--part2");
                }

                // h1Text.classList.toggle("center-area__h1Text--rotate-in");
                h1Text.style.animationDuration = h1TextAnimDuration + "ms";
                if (h1TextWidth >= windowWidth) {
                    h1Text.classList.add("with-margins");
                } else {
                    h1Text.classList.remove("with-margins")
                }
                h1Text.textContent = `${resultMessage}`;

                setTimeout(() => {
                    h1Text.classList.remove("center-area__h1Text--rotate-in");
                    h1Text.classList.remove("center-area__h1Text--rotate-in--part2");
                    h1Text.classList.remove("center-area__h1Text--rotate-in-cpuWon")


                    // if (gameOver) {
                    //     h1Text.classList.remove("center-area__h1Text--rotate-in--cpuWon-part2")
                    // }

                }, h1TextAnimDuration);
            }, h1TextAnimDuration);
        }
    }
    setTimeout(() => {
        animateH1Path(undefined, whoWonRound)

    }, 1500);
}

function setH1AnimTimesAndMessages(resultMessage, gameOver, whoWonRound) {
    h1Text.style.height = "";
    // console.log(resultMessage, h1Text);
    // alignH1Background()
    setH1TextRotationAndCanvasLine(resultMessage, gameOver, whoWonRound, gameInPlay)
}

let withOfPlayerScoreWrapper
let currentScoreAllSpans = Array.from(currentScorePara.children)
let currentScoreSpans = Array.from(currentScorePara.querySelectorAll(".current-score__span-both-players"));
let widthOfCurrentScoreHeadline;
let widthOfPlayerScoreWrapper;


function setWidthsForCurrentScoreSpans(playerScore, cpuScore) {
    // currentScorePara.style.width = "100%";
    currentScoreHeadline.style.width = "fit-content";
    widthOfCurrentScoreHeadline = currentScoreHeadline.offsetWidth;
    // console.log(widthOfCurrentScoreHeadline);
    currentScoreHeadline.style.width = widthOfCurrentScoreHeadline + "px";

    console.log(widthOfPlayerScoreWrapper);

    currentScorePlayerWrapper.style.width = "fit-content";
    currentScoreCpuWrapper.style.width = "fit-content";
    widthOfPlayerScoreWrapper = currentScorePlayerWrapper.offsetWidth + 20;
    currentScorePlayerWrapper.style.width = widthOfPlayerScoreWrapper + "px";
    // currentScorePlayerWrapper.style.width = "100px";
    currentScoreCpuWrapper.style.width = widthOfPlayerScoreWrapper + "px";
    console.log(widthOfPlayerScoreWrapper);

    // currentScoreSpans.forEach(player => player.style.width = widthOfPlayerScoreWrapper + "px")
    // console.log(playerScore);
    // currentScorePlayer.textContent = playerScore;
    // currentScoreCpu.textContent = cpuScore;
}

function setCurrentScoreMessages(playerScore, cpuScore, keepGoing, currentRound, whoWonRound) {
    console.log(keepGoing, currentRound, whoWonRound);

    // console.log(whoWonRound);
    // setWidthsForCurrentScoreSpans(playerScore, cpuScore);


    if (currentRound === 0) {
        // setWidthsForCurrentScoreSpans(playerScore, cpuScore);
        // setTimeout(() => {
        //     currentScorePara.classList.remove("zero-width");
        // }, 500);
        currentScorePara.classList.remove("zero-width");

    };

    function currentScoreAnims(changeMe, endWidth, playerScore, cpuScore, currentRound) {
        let timeoutTime = currentRound === 0 ? 750 : 500;

        console.log(currentRound);

        if (currentRound === 0) {
            changeMe.forEach(span => span.classList.toggle("no-trans"));
            changeMe.forEach(span => span.style.width = "0px");
            changeMe.forEach(span => span.classList.toggle("no-trans"));
            currentScorePlayer.textContent = playerScore;
            currentScoreCpu.textContent = cpuScore;
            console.log(playerScore);
        } else {
            changeMe.forEach(span => span.style.width = "0px");
        }

        setTimeout(() => {
            changeMe.forEach(span => span.style.width = endWidth + "px");
            currentScorePlayer.textContent = playerScore;
            currentScoreCpu.textContent = cpuScore;
        }, timeoutTime);
    }

    if (keepGoing) {
        console.log(widthOfPlayerScoreWrapper);

        if (whoWonRound === "player") {
            currentScoreAnims([currentScorePlayerWrapper], widthOfPlayerScoreWrapper, playerScore, cpuScore, currentRound)
        } else if (whoWonRound === "cpu") {
            currentScoreAnims([currentScoreCpuWrapper], widthOfPlayerScoreWrapper, playerScore, cpuScore, currentRound)
        } else {
            currentScoreAnims(currentScoreSpans, widthOfPlayerScoreWrapper, playerScore, cpuScore, currentRound)
        }

    } else {
        if (whoWonRound === "player") {
            currentScorePara.classList.add("zero-width")
            // currentScoreHeadline.style.width = "0px";
            // currentScoreAnims([currentScorePlayerWrapper], widthOfPlayerScoreWrapper, playerScore, cpuScore)
        } else if (whoWonRound === "cpu") {
            currentScorePara.classList.add("zero-width")

            // currentScoreHeadline.style.width = "0px";
            // currentScoreAnims([currentScoreCpuWrapper], widthOfPlayerScoreWrapper, playerScore, cpuScore)
        } else {
            currentScoreAnims(currentScoreSpans, widthOfPlayerScoreWrapper, playerScore, cpuScore, currentRound)
        }

        setTimeout(() => {
            if (playerScore === cpuScore) {
                currentScoreHeadline.textContent = "Current Score:"
                currentScoreHeadline.style.width = "fit-content";
                widthOfCurrentScoreHeadline = currentScoreHeadline.offsetWidth;
                currentScoreHeadline.style.width = widthOfCurrentScoreHeadline + "px";
            } else {
                currentScoreHeadline.textContent = "Final Score:"
            }
            currentScoreHeadline.style.width = widthOfCurrentScoreHeadline + "px";
        }, 250);
    }
}
// curtainElement.classList.add("show-curtain");

// Canvas drop feature

const dripCanvas = document.getElementById("drip__canvas");
const dripCTX = dripCanvas.getContext("2d");
dripCanvas.width = window.innerWidth;
dripCanvas.height = window.innerHeight;
const dripRect = dripCanvas.getBoundingClientRect();

dripCTX.fillStyle = "#FFFFFF";

const dripTipCanvas = document.getElementById("drip-tip__canvas");
const dripTipCTX = dripTipCanvas.getContext("2d");
dripTipCanvas.width = window.innerWidth;
dripTipCanvas.height = window.innerHeight;
const dripTipRect = dripCanvas.getBoundingClientRect();

dripTipCTX.fillStyle = "#FF22FF";

// console.log(dripCTX);
// let jsjshsh = Math.random() / 10 - 0.05;
// // jsjshsh.toFixed(3)
// console.log(Number(jsjshsh.toFixed(4)));
class drip {
    constructor(dripsEffect) {
        this.dripsEffect = dripsEffect;
        this.x = Math.random() * this.dripsEffect.width;
        this.y = -10;
        this.quickerY = this.y;
        this.radius = Math.random() * 40 + 20;
        // this.speedX = Math.random() - 0.5;
        this.speedY = Math.random();
        this.speedYQuicker = this.speedY * Math.random() + .75;
        // this.colors = ["#FFFFFF", "#33bf99", "#f0ab67"]
        this.originalRadius = this.radius;
        this.radiusGrowth = Math.random() < 0.5 ? 0.05 : -0.05;
        // console.log(this.radiusGrowth);

    }
    update() {
        // if (this.x < this.radius || this.x > this.dripEffect.width - this.radius) this.speedX *= -1;
        // if (this.y < this.radius || this.y > this.dripEffect.height - this.radius) this.speedY *= -1;
        // this.x += this.speedX;
        if (this.y > this.dripsEffect.height * 1.2) {
            this.y = -10;
            this.x = Math.random() * this.dripsEffect.width;
            this.quickerY = this.y;
        }
        this.y += this.speedY;
        this.quickerY += this.speedYQuicker;
        this.radius = this.radius + this.radiusGrowth * Math.random();
        if (this.radius > this.originalRadius * 1.4 || this.radius < this.originalRadius * 0.9) { this.radiusGrowth *= -1 }

    }
    draw(dripCTX, dripTipCTX) {
        dripCTX.beginPath();
        dripCTX.lineWidth = this.radius;
        dripCTX.moveTo(this.x, 0);
        dripCTX.lineTo(this.x, this.y);
        dripCTX.strokeStyle = "#FFFFFF"
        dripCTX.stroke()

        dripCTX.beginPath();
        dripCTX.lineWidth = this.radius * 0.5;
        dripCTX.moveTo(this.x, 0);
        dripCTX.lineTo(this.x, this.quickerY);
        dripCTX.strokeStyle = "#FFFFFF"
        dripCTX.stroke()

        dripTipCTX.beginPath();
        dripTipCTX.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        dripTipCTX.fillStyle = "#FFFFFF"
        dripTipCTX.fill();

        dripTipCTX.beginPath();
        dripTipCTX.arc(this.x, this.quickerY, this.radius, 0, Math.PI * 2);
        dripTipCTX.fillStyle = "#FFFFFF"
        dripTipCTX.fill();

        dripTipCTX.beginPath();
        dripTipCTX.arc(this.x - 2, this.y - 2, this.radius - 2, 0, Math.PI * 0.5);
        dripTipCTX.fillStyle = "#000000"
        dripTipCTX.fill();

    }
    reset() {
        // console.log("drip reset");
        // dripCTX.clearRect(0,0, dripCanvas.width, dripCanvas.height);
        // dripTipCTX.clearRect(0,0, dripCanvas.width, dripCanvas.height);
        this.x = Math.random() * this.dripsEffect.width;
        this.y = -10;
        this.quickerY = this.y;

    }
}



class dripsEffect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.dripArray = [];
        this.dripTipArray = [];
    }
    init(numberOfDrips) {
        for (let i = 0; i < numberOfDrips; i++) {
            this.dripArray.push(new drip(this));
            this.dripTipArray.push(new drip(this, i));
        }
        // console.log(this.dripArray);
    }
    update() {
        for (let i = 0; i < this.dripArray.length; i++) {
            this.dripArray[i].update();
            this.dripTipArray[i].update();
        }
    }
    draw(dripCTX, dripTipCTX) {
        this.dripArray.forEach(drip => drip.draw(dripCTX, dripTipCTX));

    }
    reset() {
        // console.log("dripEffect reset");
        for (let i = 0; i < this.dripArray.length; i++) {
            this.dripArray[i].reset();
            this.dripTipArray[i].reset();
        }
    }

}

const dripEffect = new dripsEffect(dripCanvas.width, dripCanvas.height)
dripEffect.init(10);

let dripFrames

function animateDrip() {
    // dripCTX.clearRect(0,0, dripCanvas.width, dripCanvas.height);
    dripTipCTX.clearRect(0, 0, dripCanvas.width, dripCanvas.height);
    dripEffect.update();
    dripEffect.draw(dripCTX, dripTipCTX);
    dripFrames = requestAnimationFrame(animateDrip)
}

// animateDrip()


function cpuWonGame(params) {
    setTimeout(() => {
        canvasDripWrapper.classList.remove("zero-opacity");
        animateDrip()
    }, h1TextAnimDuration);

}

// Restart game, hide hands buttons, show play again button
function restartGame(gameOver) {
    gameInPlay = false;
    console.log("gameOver is" + gameOver);
    console.log("now!!!");

    playerChoiceButtons.forEach(button => {
        console.log("reset");
        button.classList.remove("btn-fade-out-and-back", "slower");
    })

    setTimeout(() => {
        // playerChoiceButtonArray.forEach(button => button.style.display = "none");
        topAreaWrapper.style.transitionDuration = "";

        topAreaWrapper.classList.remove("no-transition");
        topAreaTextContainerChildren.forEach(child => child.classList.add("hidden"));
        hiThere.textContent = `Final Score: ${playerScore} - ${cpuScore}`
        hiThere.classList.add("top-area__text-container__hi-there", "top-area__text-container__hi-there--cpu-won")
        topAreaTextContainer.appendChild(hiThere);
        btnWrapperAll.classList.add("zero-width");
        setTimeout(() => {
            playerChoiceButtonArray.forEach(button => button.style.display = "none");
        }, 1000);
        letsPlayButton.style.display = "";
        letsPlayButton.classList.add("play-again");

        topAreaWrapper.classList.add("show-rounds");


        setTimeout(() => {
            letsPlayButton.classList.toggle("zero-width");
            letsPlayButton.textContent = "Play again!"
            btnWrapperAll.style.transitionDuration = "1s";
            btnWrapperAll.classList.remove("zero-width");
            setTimeout(() => {
                btnWrapperAll.style.transitionDuration = "";
            }, 1000);
            // topAreaWrapper.classList.add("show-rounds");
        }, 4000);

        letsPlayButton.addEventListener("click", function () {
            h1Text.classList.remove("center-area__h1Text--rotate-in--cpuWon-part2")

            newGame(gameOver)
            firework.reset();

            h1Text.classList.remove("center-area__h1Text--rotate-in--cpuWon-part2")

            canvasDripWrapper.classList.add("zero-opacity")
            setTimeout(() => {
                cancelAnimationFrame(dripFrames);

                dripCTX.clearRect(0, 0, dripCanvas.width, dripCanvas.height);
                dripEffect.reset()
            }, 1000);

        });
    }, 500);

}


/* 
Fireworks display below
*/
const fireworksTopContainer = document.querySelector(".fireworks-container")
const svgContainer = document.querySelector("#svg-container")
const fireworkPaths = document.querySelector('.fireworks-path');



class FireworkPath {
    constructor(firework) {
        this.firework = firework;
        this.startX = this.firework.width / 2;
        this.startY = this.firework.height / 2;
        this.bendX = this.firework.width / 2;
        this.bendY = this.firework.height / 3 - 150;
        // this.endX = Math.floor(Math.random() * 401) - 200 + this.startX;
        this.endX = Math.floor(Math.random() * (this.firework.width * 0.6) + this.firework.width * 0.2);
        this.endY = this.startY - (Math.floor(Math.random() * 250) + 80);
        this.colors = ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"];
        this.randomColorIndex = Math.floor(Math.random() * this.colors.length);
        this.randomFireworksColor = `${this.colors[this.randomColorIndex]}`;
        this.pathAnimationTime = Math.floor(Math.random() * 2000) + 2000;

    }
    drawPath() {
        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.path.classList.add("fireworks-path");
        this.pathData = `M${this.startX},${this.startY} Q${this.bendX},${this.bendY} ${this.endX},${this.endY}`;
        this.path.setAttribute('d', this.pathData);
        this.pathLength = this.path.getTotalLength();
        this.path.style.strokeDasharray = `${this.pathLength * 0.75} ${this.pathLength * 1.25}`;
        this.path.style.strokeDashoffset = this.pathLength * 0.75;
        // this.path.style.strokeDashoffset = 0;
        // this.path.style.animationDuration = this.pathAnimationTime + "ms"
        // this.path.style.transitionDuration = this.pathAnimationTime + "ms"
        // this.path.style.transition = `stroke-dashoffset 1s ease-out forwards`;
        this.path.style.transitionDuration = `${this.pathAnimationTime * 2}ms, ${this.pathAnimationTime * 1.5}ms`;
        this.path.style.transitionTimingFunction = "ease-out, ease-in";
        this.path.setAttribute('stroke', this.randomFireworksColor);

        svgContainer.appendChild(this.path);
    }
    update() {

        this.path.style.strokeDashoffset = `-${this.pathLength}`;
        this.path.style.strokeWidth = 0;

        // this.path.style.strokeDashoffset = `-100`;
        // requestAnimationFrame(() => {
        //     // let randomThing = svgContainer.clientWidth;

        // })
        // setTimeout(() => {
        //     this.path.style.strokeDashoffset = `-${this.pathLength}`;
        //     this.path.style.strokeWidth = 0;
        // }, 1);
    }
}

class Explosion extends FireworkPath {
    constructor(firework, endXAndY, pathAnimTime, i) {
        super(firework);
        this.endXAndY = endXAndY;
        this.endX = this.endXAndY.x;
        this.endY = this.endXAndY.y;
        this.pathAnimationTime = pathAnimTime;
        this.i = i;

    }
    makeExplosion(endXAndYArray, pathAnimTime, i) {
        this.oneExplosionContainer = document.createElement("div");
        this.oneExplosionContainer.classList.add(`explosion-container`, `expCont${this.i}`)
        this.oneExplosionContainer.style.top = `${this.endY}px`;
        this.oneExplosionContainer.style.left = `${this.endX}px`;
        this.oneExplosionContainer.style.background = `radial-gradient(circle, ${this.randomFireworksColor} 0%, rgba(255,255,255,.2) 25%, ${this.colors[Math.floor(Math.random() * this.colors.length)]} 50%, rgba(255,255,255,1) 100%)`
        fireworksTopContainer.appendChild(this.oneExplosionContainer);
        // Settings for bursts within explosions
        this.burstsInExplosion = 50;
        this.burstRotationAngle = 360 / this.burstsInExplosion;
        this.allBurstsContainersInExplosionArray = [];

        // Create and add all individual bursts to each explosion
        for (let i = 0; i < this.burstsInExplosion; i++) {
            // Create each burst within explosion
            this.oneBurstInOneExplosionContainer = document.createElement("div");
            this.oneBurstInOneExplosionContainer.classList.add("explosion-container__one-burst-container", "zero-width")
            this.burstRotationIncrement = this.burstRotationAngle * (i + 1);
            this.oneBurstInOneExplosionContainer.style.transform = `translateY(-50%) rotate(${this.burstRotationIncrement}deg)`;
            // Create centre piece in burst
            this.centerBurstPiece = document.createElement("div");
            this.centerBurstPiece.classList.add("one-burst__center-piece");
            // Create tip piece in burst
            this.tipOfBurstPiece = document.createElement("div");
            this.tipOfBurstPiece.classList.add("one-burst__tip-piece");
            this.tipOfBurstPiece.style.backgroundColor = this.randomFireworksColor;
            // Attach center and tip bits to burst
            this.oneBurstInOneExplosionContainer.appendChild(this.centerBurstPiece);
            this.oneBurstInOneExplosionContainer.appendChild(this.tipOfBurstPiece);
            // Push each burst to array
            this.allBurstsContainersInExplosionArray.push(this.oneBurstInOneExplosionContainer);
            // console.log(this.allBurst);
            this.allBurstsContainersInExplosionArray.forEach(burstContainer => this.oneExplosionContainer.appendChild(burstContainer));
        }
    }

    update() {
        this.allExplosionContainers = Array.from(document.querySelectorAll(".explosion-container"));

        setTimeout(() => {
            this.oneExplosionContainer.style.height = "60px";
            this.oneExplosionContainer.style.width = "60px";
            this.allBurstsContainersInExplosionArray.forEach(burstContainer => burstContainer.classList.remove("zero-width"))
            this.allCenterBurstPieces = this.oneExplosionContainer.querySelectorAll(".one-burst__center-piece");
            // console.log(this.allCenterBurstPieces);
            this.allCenterBurstPieces.forEach(piece => piece.classList.add(`anim`));
        }, this.pathAnimationTime - 200);

        setTimeout(() => {
            // console.log(this.allBurstsArray);
            // this.allBurstsArray.forEach(burst => burst.style.display = "none");
            this.oneExplosionContainer.style.height = "0px";
            this.oneExplosionContainer.style.width = "0px";
            this.allTipBurstPieces = this.oneExplosionContainer.querySelectorAll(".one-burst__tip-piece");
            this.allTipBurstPieces.forEach(piece => piece.classList.add("anim"));
        }, this.pathAnimationTime + 1000);
    }
}

class Firework {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.fireworkPathArray = [];
        this.pathAnimTimeArray = [];
        this.explosionArray = [];
        this.endXAndYArray = [];
    }
    init(numberOfFirework) {
        for (let i = 0; i < numberOfFirework; i++) {
            this.fireworkPathArray.push(new FireworkPath(this));
        }
        for (let i = 0; i < this.fireworkPathArray.length; i++) {
            this.endXAndY = {
                x: this.fireworkPathArray[i].endX,
                y: this.fireworkPathArray[i].endY
            }
            this.endXAndYArray.push(this.endXAndY);
            this.pathAnimTimeArray.push(this.fireworkPathArray[i].pathAnimationTime);
            this.explosionArray.push(new Explosion(this, this.endXAndYArray[i], this.pathAnimTimeArray[i], i))
        }

    }
    draw() {
        for (let i = 0; i < this.fireworkPathArray.length; i++) {
            this.fireworkPathArray[i].drawPath();
            this.explosionArray[i].makeExplosion();
        }
        this.explosionArray.forEach(explosion => explosion.update());
    }
    update() {
        // this.fireworkPathArray.forEach(path => path.update());

        requestAnimationFrame(() => {
            this.fireworkPathArray.forEach(path => path.update());

        })
    }

    reset() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fireworkPathArray = [];
        this.pathAnimTimeArray = [];
        this.explosionArray = [];
        this.endXAndYArray = [];
        svgContainer.innerHTML = "";
        removeDivsFromFirework()

    }
}

const firework = new Firework(windowWidth, windowHeight);

function startFireWork() {
    // firework.reset();

    firework.init(12);
    firework.draw();
    firework.update()
}

function removeDivsFromFirework() {
    const container = document.querySelector(".fireworks-container");

    let divsArray = Array.from(document.querySelectorAll(".explosion-container"))

    divsArray.forEach(div => container.removeChild(div));
    // console.log(divs);
}

// console.log(h2SpanElements, h2TextSpanContainers);

function resizeH2TextSpanDivContainers() {
    let h2SpanElementWidths = []
    let h2SpanElements = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span"));
    let h2TextSpanContainers = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span-container"))

    h2SpanElements.forEach(div => h2SpanElementWidths.push(div.offsetWidth))

    for (let i = 0; i < h2SpanElementWidths.length; i++) {
        h2TextSpanContainers[i].style.width = h2SpanElementWidths[i] + "px";
    }
}





window.addEventListener('resize', function (e) {
    console.log(e);
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    firework.reset();
    setWidthsForCurrentScoreSpans(playerScore, cpuScore);
    resizeH2TextSpanDivContainers()
    alignH1Background()

})