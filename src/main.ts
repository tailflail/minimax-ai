import Game from "./modules/game.js";

let gameBoard : HTMLElement = document.getElementById("gameBoard");
let startScreen : HTMLElement = document.getElementById("startScreen");
let startButton : HTMLElement = document.getElementById("startButton");
let playerOneInput : HTMLInputElement = document.getElementById("playerOneInput");
let playerTwoInput : HTMLInputElement = document.getElementById("playerTwoInput");
let playerOneName : HTMLElement = document.getElementById("playerOneName");
let playerTwoName : HTMLElement = document.getElementById("playerTwoName");
let playerOneScore : HTMLElement = document.getElementById("playerOneScore");
let playerTwoScore : HTMLElement = document.getElementById("playerTwoScore");
let gridContainer : HTMLElement = document.getElementById("gridSquares");
let gridButtons : NodeListOf<HTMLElement> = gridContainer.querySelectorAll("button");
let resetBoard : HTMLElement = document.getElementById("resetBoard");
let resetPlayers : HTMLElement = document.getElementById("resetPlayers");

let game = new Game();

initEvents();

function initEvents() {
    startButton.addEventListener("click", onStartButtonClick);
    resetBoard.addEventListener("click", onResetBoardButtonClick);
    resetPlayers.addEventListener("click", onResetPlayersButtonClick);

    gridButtons.forEach((gridButton : HTMLElement, index : number) => {
    gridButton.addEventListener("click", () => { onGridButtonClick(gridButton, index) })
    });
}

// main game logic
function onGridButtonClick(gridButton : HTMLElement, index : number) {
    if (!game.isGameOver() && gridButton.textContent === "") {
        game.playRound(index);

        if (game.currentPlayer() === game.playerOne) {
            gridButton.textContent = "X";
        } else {
            gridButton.textContent = "O";
        }

        game.changeTurn();

        playerOneScore.textContent = `${game.playerOne.score}`;
        playerTwoScore.textContent = `${game.playerTwo.score}`;
    }
}

// button to reset the board squares when game is over
function onResetBoardButtonClick() {
    if (game.isGameOver()) {
        gridButtons.forEach((gridButton : HTMLElement) => {
            gridButton.textContent = "";
        });
        game.nextRound();
    }
}

// button to display the game board with the chosen player names
function onStartButtonClick(event : MouseEvent) {
    event.preventDefault();

    game.playerOne.name = playerOneInput.value;
    game.playerTwo.name = playerTwoInput.value;

    playerOneName.textContent = game.playerOne.name;
    playerTwoName.textContent = game.playerTwo.name;

    startScreen.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
}

// button to reset and choose new player names
function onResetPlayersButtonClick(event : MouseEvent) {
    event.preventDefault();

    resetBoard.click();
    game.resetPlayers();

    playerOneScore.textContent = `${game.playerOne.score}`;
    playerTwoScore.textContent = `${game.playerTwo.score}`;

    gameBoard.classList.toggle("hidden");
    startScreen.classList.toggle("hidden");
}