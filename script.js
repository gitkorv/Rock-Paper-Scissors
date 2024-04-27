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
let h2Text = document.querySelector(".center-area__h2Text")
let h2TextElements = Array.from(h2Text.children)
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

const lastPlayedHandsElementsStructure = h2Text.innerHTML;

/* 
Set initial text of H2
*/
h2TextElements.forEach(element => element.style.display = "none");
const hiMessage = document.createElement("span")
hiMessage.classList.add("center-area__h2Text")
hiMessage.textContent = "Let's play a game of"
h2Text.appendChild(hiMessage)

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
    topAreaWrapper.classList.add("hi-there-effect");
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

let currentScorePara = document.querySelector(".current-score-para");
let currentScorePlayer = currentScorePara.firstElementChild;
let currentScoreCpu = currentScorePara.lastElementChild;
let currentScoreParaWidth = currentScorePara.getBoundingClientRect().width;
currentScorePara.style.left = (windowWidth - currentScoreParaWidth) / 2 + "px";

let h1TextAnimDuration;
let h1TextAnimDelay;

// Create curtain element
let curtainElement = document.createElement("div");
curtainElement.classList.add("curtain-element")
mainContainer.appendChild(curtainElement);

function setH1AnimTimesAndMessages(resultMessage) {
    // console.log(resultMessage);
    h1Text.classList.toggle("center-area__h1Text--rotate-in")
    h1TextAnimDuration = parseFloat(window.getComputedStyle(h1Text).animationDuration.split(", ")[0]) * 1000;
    h1TextAnimDelay = parseFloat(window.getComputedStyle(h1Text).animationDelay.split(", ")[0]) * 1000;

    setTimeout(() => {
        h1Text.textContent = `${resultMessage}`;
    }, h1TextAnimDelay + h1TextAnimDuration / 2);

    setTimeout(() => {
        h1Text.classList.toggle("center-area__h1Text--rotate-in");
    }, h1TextAnimDelay + h1TextAnimDuration);
}

let roundTextHeight = topAreaTextContainer.getBoundingClientRect().height;
topAreaTextContainer.style.height = roundTextHeight + "px";

function setTopRoundTicker(keepGoing) {
    if (keepGoing === true) {
        topAreaWrapper.classList.add("show-rounds");
        // let roundTextHeight = topAreaTextContainer.getBoundingClientRect().height;
        // console.log(roundTextHeight);
        let topAreaRoundNumberContainer = document.querySelector(".top-area__text-container__number")
        topAreaRoundNumberContainer.style.height = roundTextHeight * 2 + "px" ;
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
            console.log(slideUpElement.style.transform);

            // console.log(slideUpElement);
            setTimeout(() => {
                topAreaTopRoundNumber.textContent = currentRound - 1;
                topAreaRoundNumberContainer.classList.remove("slide-up");
                slideUpElement.style.transform = `translateY(-0px)`
            }, 950);
        }
    }
}

function setH2TextEffects(keepGoing, boldTextNumber) {
    h2Text.classList.toggle("h2Text-fade-in");
    setTimeout(() => {
        h2Text.classList.toggle("h2Text-fade-in");
    }, 1000);

    h2TextElements = Array.from(h2Text.children)

    if (keepGoing === true) {
        boldTextNumber.forEach(number => h2TextElements[number].classList.add("bold-anim"))
    }
}

function setCurrentScoreMessages(playerScore, cpuScore, keepGoing) {

    currentScorePara.classList.add("zero-width");
    currentScorePara.style.width = "0px";

    if (keepGoing) {
        setTimeout(() => {
            currentScorePara.style.width = currentScoreParaWidth + "px";
    
            currentScorePara.classList.remove("zero-width");
            console.log(currentScorePara);
            currentScorePlayer.textContent = playerScore;
            currentScoreCpu.textContent = cpuScore;
        }, 500);
    }
}

function newGame() {

    setTimeout(() => {
        curtainElement.classList.remove("roll-down");
        letsPlayButton.style.display = "none";
        playerChoiceButtonArray.forEach(button => {
            button.addEventListener("click", pickHand);
            button.style.display = "";
        })
    }, 500);

    topAreaWrapper.classList.remove("hi-there-effect")
    // letsPlayButton.style.display = "none";
    setTimeout(() => {
        if (topAreaTextContainer.lastChild === hiThere) {
            topAreaTextContainer.removeChild(hiThere);
        }
        topAreaTextContainerChildren.forEach(child => child.classList.remove("hidden"));
    }, 1000);

    playerChoice;
    playerScore = 0;
    cpuScore = 0;
    roundsPlayed = 0;
    roundsToPlay = 5;
    roundsLeftToPlay
    currentRound = 1;

    resultMessage = `Choose Your Weapon!`;
    setH1AnimTimesAndMessages(resultMessage);

    setTopRoundTicker();
    setH2TextEffects()
    h2Text.classList.add("black");

    h2Text.textContent = `Great, here goes round ${currentRound}`;
}
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

    button.addEventListener('click', function(event) {
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

    let computerChoice = getCpuChoice();
    // let computerChoice = "Rock";

    h2Text.innerHTML = lastPlayedHandsElementsStructure;

    let playerHand = document.querySelector(".center-area__h2Text__player-span")
    let vs = document.querySelector(".center-area__h2Text__vs-span")
    let cpuHand = document.querySelector(".center-area__h2Text__cpu-span")
    let boldTextNumber = [];
    playerHand.textContent = playerChoice;
    cpuHand.textContent = computerChoice;

    if (playerChoice === computerChoice) {
        vs.textContent = "vs";
        resultMessage = "The Round is a tie";
        boldTextNumber.push(0);
        boldTextNumber.push(2);
    } else if (
        playerChoice === "Rock" && computerChoice === "Scissor" ||
        playerChoice === "Paper" && computerChoice === "Rock" ||
        playerChoice === "Scissor" && computerChoice === "Paper"
    ) {
        resultMessage = "You Won the Round!"
        vs.textContent = "beats";
        playerScore++;
        boldTextNumber.push(0);
    } else {
        resultMessage = "Computer Won Round!"
        vs.textContent = "lost to";
        cpuScore++;
        boldTextNumber.push(2);
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
            h2Text.textContent = `Final Score: ${playerScore} - ${cpuScore}`
            keepGoing = false;
            startFireWork(12);
            restartGame();

        } else if (playerScore < cpuScore) {
            resultMessage = `The Computer won the game!`;
            h2Text.textContent = `Final Score: ${playerScore} - ${cpuScore}`
            keepGoing = false;
            cpuWonGame();
            restartGame();
        } else {
            h2Text.textContent = `It's a tie: ${playerScore} - ${cpuScore}`
            resultMessage = `It's a knock-out round!`;
            roundsToPlay++;
            keepGoing = false;
        }
    }

    setTopRoundTicker(keepGoing);
    setH2TextEffects(keepGoing, boldTextNumber)
    setH1AnimTimesAndMessages(resultMessage)
    setCurrentScoreMessages(playerScore, cpuScore, keepGoing);
    currentRound++;
}

function cpuWonGame(params) {
    setTimeout(() => {
        curtainElement.classList.add("roll-down");
    }, 200);
}

// Restart game, hide hands buttons, show play again button
function restartGame() {
    playerChoiceButtonArray.forEach(button => button.style.display = "none");
    topAreaWrapper.classList.remove("show-rounds");
    letsPlayButton.style.width = "100px";
    letsPlayButton.textContent = "Play again!"
    letsPlayButton.style.display = "";
    letsPlayButton.addEventListener("click", newGame);
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
        this.bendY = this.firework.height / 2 - 150;
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
    currentScorePara.style.left = (windowWidth - currentScoreParaWidth) / 2 + "px";

})