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
hiThere.classList.add("top-area__text-container__hi-there")
topAreaTextContainer.appendChild(hiThere);

/* 
Select the center area 
*/
const centerArea = document.querySelector(".center-area")
let h2Text = document.querySelector(".center-area__h2Text");
let h2TextSpanContainers = Array.from(h2Text.children);

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
const btnContainer = document.querySelector(".btn-container")
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


function setLetsPLayButton(params) {
    // Add classes, content and append letsPlayButton
    letsPlayButton.classList.add(...["lets-play-button", "not-visible"]);
    btnContainer.appendChild(letsPlayButton)
    letsPlayButton.textContent = "Sure, let's do this!";
    // get with of letsPlayButton
    let letsPlayButtonWidth = letsPlayButton.getBoundingClientRect().width;
    // Set btnContainer to BLOCK and make letsPlayButton 0 width
    btnContainer.classList.add("letsPlaySetting");
    letsPlayButton.classList.add("zero-width");

    setTimeout(() => {
        // Show letsPlayButton
        letsPlayButton.classList.remove(...["not-visible", "zero-width"]);
        // Set style left for letsPlayButton
        letsPlayButton.style.left = (windowWidth - letsPlayButtonWidth) / 2 + "px";
        // Find out transition time for button
        let letsPlayTransitionDuration = parseFloat(window.getComputedStyle(letsPlayButton).transitionDuration.split(", ")[1]) * 1000;
        // After letsPlayButton has transitioned... 
        setTimeout(() => {
            // remove btnContainer class to make it flex again
            btnContainer.classList.remove("letsPlaySetting");
            // remove left position to work with flex again
            letsPlayButton.style.left = "";
        }, letsPlayTransitionDuration);
    }, showPlayButtonTimeDelay);
    // Add click function to button
    letsPlayButton.addEventListener("click", newGame);

}

setLetsPLayButton()

/* 
Select Score Tracker
*/
const scoreContainer = document.querySelector(".score-container");

/*
On window load, Bring in h2Text etc
*/
window.onload = function () {
    topAreaWrapper.classList.add("show-rounds");
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
let currentScorePlayer = currentScorePara.querySelector(".current-score__player-span-number");
let currentScorePlayerWrapper = currentScorePlayer.parentElement;
console.log(currentScorePlayerWrapper);
let currentScoreCpu = currentScorePara.querySelector(".current-score__cpu-span-number");
let currentScoreCpuWrapper = currentScoreCpu.parentElement;

let currentScoreParaWidth = currentScorePara.getBoundingClientRect().width;
console.log(currentScoreParaWidth);
console.log(windowWidth);
    // currentScorePara.style.left = (windowWidth - currentScoreParaWidth) / 2 + "px";

let h1TextAnimDuration;
let h1TextAnimDelay;

// Create curtain element
let curtainContainer = document.createElement("div");
curtainContainer.classList.add("curtain-container")
mainContainer.appendChild(curtainContainer);

cpuWonGame()


let roundTextHeight = topAreaTextContainer.getBoundingClientRect().height;
topAreaTextContainer.style.height = roundTextHeight + "px";

const allButtons = document.querySelectorAll("button")

function handleMouseOver() {
    this.classList.add("hovered")
}
function handleMouseOut() {
    this.classList.remove("hovered")
}
function handleTouchStart() {
    this.classList.add("hovered")
}
function handleTouchEnd() {
    this.classList.remove("hovered")
}
function handleTouchCancel() {
    this.classList.remove("hovered")
}

allButtons.forEach(button => {
    button.addEventListener('mouseover', handleMouseOver);
    button.addEventListener('mouseout', handleMouseOut);
    button.addEventListener('touchstart', handleTouchStart);
    button.addEventListener('touchend', handleTouchEnd);
    button.addEventListener('touchcancel', handleTouchCancel);

    button.addEventListener('click', function (event) {
        this.style.outline = "4px solid #f72585";
        // this.style.color = "#f72585";

        // Prevent the default action of the click event
        event.preventDefault();
        // Remove the "hovered" class after a delay to allow time for the touch event to complete
        setTimeout(() => {
            this.style.outline = "";
            // this.style.color = "";

            this.classList.remove('hovered');
        }, 300); // Adjust the delay as needed
    });
});

function newGame() {
    setTimeout(() => {
        // curtainContainer.classList.remove("roll-down");
        curtainContainer.innerHTML = "";

        letsPlayButton.style.display = "none";
        playerChoiceButtonArray.forEach(button => {
            button.addEventListener("click", pickHand);
            button.style.display = "";
        })
    }, 500);

    // h2Text.textContent = "test";

    // topAreaWrapper.classList.remove("hi-there-effect")
    topAreaWrapper.classList.remove("show-rounds")
    // letsPlayButton.style.display = "none";
    setTimeout(() => {
        if (topAreaTextContainer.lastChild === hiThere) {
            topAreaTextContainer.removeChild(hiThere);
        }
        topAreaTextContainerChildren.forEach(child => child.classList.remove("hidden"));
    }, 1000);

    // topAreaTextContainer.innerHTML = originalTopAreaTextContainerHTML;


    playerChoice;
    playerScore = 0;
    cpuScore = 0;
    roundsPlayed = 0;
    roundsToPlay = 5;
    roundsLeftToPlay
    currentRound = 1;
    keepGoing = true;

    resultMessage = `Choose Your Weapon!`;
    setH1AnimTimesAndMessages(resultMessage);
    h2Text.textContent = "";
    h2Text.appendChild(letsPLayAGameMessage);
    letsPLayAGameMessage.textContent = `Great, here goes round ${currentRound}`;
    letsPLayAGameMessage.classList.add("black");
    setTopRoundTicker();
    setH2TextEffects()
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


    if (playerChoice === computerChoice) {
        vsSpan.textContent = "vs";
        resultMessage = "The Round is a tie";
        boldTextNumber.push(0);
        boldTextNumber.push(2);
        winningHand = playerChoice;
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

    } else {
        resultMessage = "The Computer Won the Round!"
        vsSpan.textContent = "lost to";
        cpuScore++;
        boldTextNumber.push(2);
        winningHand = computerChoice;

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

    roundsLeftToPlay = roundsToPlay - roundsPlayed;

    if (roundsPlayed === roundsToPlay || scoreDiff > roundsLeftToPlay) {
        if (playerScore > cpuScore) {
            resultMessage = `You won the game!`;
            // h2Text.textContent = `Final Score: ${playerScore} - ${cpuScore}`
            setH2TextEffects(keepGoing, boldTextNumber, winningHand)
            topAreaWrapper.classList.remove("show-rounds");
            topAreaWrapper.classList.add("no-transition");
            keepGoing = false;
            setTimeout(() => {
                startFireWork(12);

            }, 1500);
            restartGame();

        } else if (playerScore < cpuScore) {
            resultMessage = `The Computer won the game!`;
            // h2Text.textContent = `Final Score: ${playerScore} - ${cpuScore}`
            setH2TextEffects(keepGoing, boldTextNumber, winningHand)

            topAreaWrapper.classList.remove("show-rounds");
            topAreaWrapper.classList.add("no-transition");
            keepGoing = false;
            cpuWonGame();
            restartGame();
        } else {
            setH2TextEffects(keepGoing, boldTextNumber, winningHand)

            topAreaWrapper.classList.remove("show-rounds");
            topAreaWrapper.classList.add("no-transition");
            setTimeout(() => {
                topAreaWrapper.classList.remove("no-transition");
                topAreaTextContainerChildren.forEach(child => child.classList.add("hidden"));
                hiThere.textContent = `Game is tied: ${playerScore} - ${cpuScore}`
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
    setH2TextEffects(keepGoing, boldTextNumber, winningHand)
    setH1AnimTimesAndMessages(resultMessage)
    setCurrentScoreMessages(playerScore, cpuScore, keepGoing, currentRound);
    currentRound++;

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
        if (currentRound > 1) {
            topAreaTopRoundNumber.textContent = currentRound - 1;
            topAreaBottomRoundNumber.textContent = currentRound;
            topAreaRoundNumberContainer.classList.add("slide-up");
            let slideUpElement = topAreaTextContainer.querySelector(".top-area__text-container__number.slide-up")
            slideUpElement.style.transform = `translateY(-${roundTextHeight}px)`;

            setTimeout(() => {
                topAreaTopRoundNumber.textContent = currentRound - 1;
                topAreaRoundNumberContainer.classList.remove("slide-up");
                slideUpElement.style.transform = `translateY(-0px)`
            }, 950);
        }
    }
}

function setH2TextEffects(keepGoing, boldTextNumber, winningHand) {
    h2Text.classList.toggle("h2Text-fade-in");
    setTimeout(() => {
        h2Text.classList.toggle("h2Text-fade-in");
    }, 1000);
    // Grab h2 spans as an array
    let h2SpanElements = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span"));
    let h2TextSpanContainers = Array.from(h2Text.querySelectorAll(".center-area__h2Text__span-container"))

    if (keepGoing === true) {
        let handWidth
        if (boldTextNumber.length < 2) {
            handWidth = h2SpanElements[boldTextNumber].getBoundingClientRect().width;
            h2TextSpanContainers[boldTextNumber].style.width = handWidth + "px";
            h2SpanElements[boldTextNumber].classList.add("bold-anim");
            h2SpanElements[boldTextNumber].classList.add("with-after");
            h2SpanElements[boldTextNumber].classList.add(`${winningHand.toLowerCase()}`);
            let thisShit = h2TextSpanContainers[boldTextNumber].querySelector(`span.bold-anim.with-after.${winningHand.toLowerCase()}`);
            // console.log(thisShit);
            // console.log(boldTextNumber.toString());
            switch (boldTextNumber.toString()) {
                case "0":
                    console.log("it's 0");
                    h2SpanElements[2].classList.add("vs-anim");
                    break;
                case "2":
                    console.log("it's 2");
                    h2SpanElements[0].classList.add("vs-anim");
                    break;
                default:
                    break;
            }
        } else {
            boldTextNumber.forEach(number => {
                handWidth = h2SpanElements[number].getBoundingClientRect().width;
                h2TextSpanContainers[number].style.width = handWidth + "px";
                h2SpanElements[number].classList.add("bold-anim");
                h2SpanElements[number].classList.add("bold-anim-double");
                h2SpanElements[number].classList.add("with-after");
                h2SpanElements[number].classList.add(`${winningHand.toLowerCase()}`);
                let thisShit = h2TextSpanContainers[number].querySelector(`span.bold-anim.bold-anim-double.with-after`);
                // thisShit.style.animationDelay = "0.25s"
                // console.log(thisShit);
            });
        }
        h2SpanElements[1].classList.add("vs-anim");

    }
}

function setH1AnimTimesAndMessages(resultMessage) {
    h1Text.style.height = "";
    h1Text.classList.toggle("center-area__h1Text--rotate-in")
    h1TextAnimDuration = parseFloat(window.getComputedStyle(h1Text).animationDuration.split(", ")[0]) * 1000;
    h1TextAnimDelay = parseFloat(window.getComputedStyle(h1Text).animationDelay.split(", ")[0]) * 1000;
    let h1TextWidth
    let h1TextHeight
    let currentH1TextContent = h1Text.textContent;
    h1Text.textContent = `${resultMessage}`;
    h1TextWidth = h1Text.getBoundingClientRect().width;
    console.log(h1TextWidth);
    console.log(windowWidth);
    h1TextHeight = h1Text.getBoundingClientRect().height;
    console.log(h1TextHeight);
    h1Text.textContent = currentH1TextContent;

    setTimeout(() => {
        // if (h1TextWidth > windowWidth) {
        //     h1Text.style.height = h1TextHeight * 2 + "px";
        //     console.log(h1Text);
        //     // h1Text.style.textWrap = "wrap";
        //     // h1Text.setAttribute('style', 'white-space: pre;');
        //     h1Text.style.whiteSpace = "pre";
        //     console.log(resultMessage);
        //     let splitResultMessage = resultMessage.split(" ");
        //     console.log(splitResultMessage);
        //     let resultMessageTop = splitResultMessage.slice(0, 2).join(" ");
        //     let resultMessageBottom = splitResultMessage.slice(2).join(" ");
        //     h1Text.textContent = resultMessageTop + "\n";
        //     // h1Text.textContent = resultMessageTop;
        //     h1Text.textContent += resultMessageBottom;
        // } else {
        //     h1Text.textContent = `${resultMessage}`;
        // }
        if (h1TextWidth > windowWidth || h1TextWidth === windowWidth) {
            // h1Text.style.height = h1TextHeight * 2 + "px";
            console.log(h1Text);
            h1Text.classList.add("with-margins");
        } else {
            h1Text.classList.remove("with-margins")

        }
        h1Text.textContent = `${resultMessage}`;
    }, h1TextAnimDelay + h1TextAnimDuration / 2);

    setTimeout(() => {
        h1Text.classList.toggle("center-area__h1Text--rotate-in");
    }, h1TextAnimDelay + h1TextAnimDuration);
}

function setCurrentScoreMessages(playerScore, cpuScore, keepGoing, currentRound) {
    console.log(currentRound);

    // currentScorePara.classList.add("zero-width");
    // currentScorePara.style.width = "0px";

    if (keepGoing) {
        if (currentRound === 1) {
            currentScorePara.style.width = "0px";

            setTimeout(() => {
                currentScorePara.style.width = currentScoreParaWidth + "px";
    
                currentScorePara.classList.remove("zero-width");
                currentScorePlayer.textContent = playerScore;
                currentScoreCpu.textContent = cpuScore;
            }, 500);
        } else {
            let currentTransitionStyle = currentScorePlayerWrapper.style;
            console.log(currentTransitionStyle);
            console.log(currentScorePlayerWrapper);
            // currentScorePlayerWrapper.style.transition = ""
            currentScorePlayerWrapper.style.width = "0px";
            setTimeout(() => {
                currentScorePlayer.textContent = playerScore;
                currentScoreCpu.textContent = cpuScore;
                currentScorePlayerWrapper.style.width = "100%";

    

            }, 500);
        }

    }
}
// curtainElement.classList.add("show-curtain");


function cpuWonGame(params) {

        let allDripsWidth = windowWidth;
        console.log(allDripsWidth);




        for (let i = 0; i < 10; i++) { 
            let transitionTime = Math.random() * 10 + 1;
            let transitionTime2Decimals = transitionTime.toFixed(2);
            // console.log(transitionTime2Decimals);
            let curtainDripWrapper = document.createElement("div");
            curtainDripWrapper.classList.add("curtain__drip-wrapper")
            let curtainDripElement = document.createElement("div");
            curtainDripElement.classList.add(`curtain__drip`, `drip`, `drip-${i+1}`);
            curtainContainer.appendChild(curtainDripWrapper);
            curtainDripWrapper.appendChild(curtainDripElement);
            curtainDripElement.style.cssText = `transition: height ${transitionTime2Decimals}s ease-out;`;



            let curtainDripTip = document.createElement("div");
            curtainDripTip.classList.add(`curtain__drip-tip`, `drip-tip`, `drip-tip-${i+1}`);

            curtainDripWrapper.appendChild(curtainDripTip)


        }




        let curtainDripWrappersArray = Array.from(document.querySelectorAll(".curtain__drip-wrapper"));
        // let curtainDripElementArray = Array.from(document.querySelectorAll(".curtain__drip"));
        // let curtainDripTipAraay = Array.from(document.querySelectorAll(".curtain__drip-tip"))
        // console.log(curtainDripElementArray);

        // let dripTipWidthArray = [] 
        let curtainDripElemensWidthsPercentages = [4,4,4,4,8,8,8,16,20,24]
        let curtainDripElemensWidthsAll = [];
        let cutCurtainDripElemensWidthsPercentages = [];

        for (let i = 0; i < curtainDripWrappersArray.length; i++) {

            let getIndex = Math.floor(Math.random() * (10 -i));
            // console.log(getIndex);
            let myPercentageOfWidth = curtainDripElemensWidthsPercentages[getIndex] / 100;
            console.log(allDripsWidth * myPercentageOfWidth);
            // console.log(curtainDripElemensWidthsPercentages[getIndex]);
            curtainDripWrappersArray[i].style.width = `${allDripsWidth * myPercentageOfWidth}px`;
            curtainDripElemensWidthsPercentages.splice(getIndex,1)
            
        }

        
        curtainDripWrappersArray.forEach(item => {
            let dripTipWidth = parseInt(window.getComputedStyle(item).width) * 0.7;
            console.log(dripTipWidth);
            let tip = item.querySelector(".drip-tip");
            tip.style.cssText = `width: ${dripTipWidth}px; height: ${dripTipWidth}px`;
        })
        console.log(windowHeight);

        curtainContainer.style.top = "-50px";
        curtainContainer.style.height = windowHeight + 100 + "px";

        function makeDrips() {
            curtainDripWrappersArray.forEach(dripWrapper => {
                dripWrapper.firstChild.classList.add("trans")
                dripWrapper.lastChild.classList.add("trans")
            });
            // curtainDripElement.classList.add("trans")
        }
        setTimeout(() => {
            makeDrips()
        }, 1000);
}

// Restart game, hide hands buttons, show play again button
function restartGame() {

    setTimeout(() => {
        playerChoiceButtonArray.forEach(button => button.style.display = "none");
        topAreaWrapper.classList.remove("no-transition");
        topAreaTextContainerChildren.forEach(child => child.classList.add("hidden"));
        hiThere.textContent = `Final Score: ${playerScore} - ${cpuScore}`
        hiThere.classList.add("top-area__text-container__hi-there")
        topAreaTextContainer.appendChild(hiThere);

        setTimeout(() => {
            topAreaWrapper.classList.add("show-rounds");

        }, 1000);
        letsPlayButton.style.width = "100px";
        letsPlayButton.textContent = "Play again!"
        letsPlayButton.style.display = "";
        letsPlayButton.addEventListener("click", newGame);
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
        this.startY = this.firework.height / 3;
        this.bendX = this.firework.width / 2;
        this.bendY = this.firework.height / 3 - 150;
        this.endX = Math.floor(Math.random() * 401) - 200 + this.startX;
        this.endY = this.startY - (Math.floor(Math.random() * 101) + 50);
        this.colors = ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"];
        this.randomColorIndex = Math.floor(Math.random() * this.colors.length);
        this.randomFireworksColor = `${this.colors[this.randomColorIndex]}`;
        this.pathAnimationTime = Math.floor(Math.random() * 2000) + 1000;

    }
    drawPath() {
        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.path.classList.add("fireworks-path");
        this.pathData = `M${this.startX},${this.startY} Q${this.bendX},${this.bendY} ${this.endX},${this.endY}`;
        this.path.setAttribute('d', this.pathData);
        this.pathLength = this.path.getTotalLength();
        this.path.style.strokeDasharray = this.pathLength;
        this.path.style.strokeDashoffset = this.pathLength;
        this.path.style.animationDuration = this.pathAnimationTime + "ms"
        this.path.setAttribute('stroke', this.randomFireworksColor);

        svgContainer.appendChild(this.path);
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
        this.oneExplosionContainer.style.background = `radial-gradient(circle, ${this.randomFireworksColor} 0%, rgba(255,255,255,.5) 50%, rgba(25,255,255,0) 100%)`
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
    reset() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fireworkPathArray = [];
        this.pathAnimTimeArray = [];
        this.explosionArray = [];
        this.endXAndYArray = [];
    }
}

const firework = new Firework(windowWidth, windowHeight);

function startFireWork(number) {
    firework.init(number);
    firework.draw();
    firework.reset();
}

window.addEventListener('resize', function () {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    firework.reset();
    // currentScorePara.style.left = (windowWidth - currentScoreParaWidth) / 2 + "px";

})