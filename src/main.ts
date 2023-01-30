import Game from "./modules/game.js";

let gameBoard : HTMLElement = document.getElementById("gameBoard") as HTMLElement;
let startScreen : HTMLElement = document.getElementById("startScreen") as HTMLElement;
let startButton : HTMLElement = document.getElementById("startButton") as HTMLElement;
let computerButton : HTMLElement = document.getElementById("computerButton") as HTMLElement;
let playerOneInput : HTMLInputElement = document.getElementById("playerOneInput") as HTMLInputElement;
let playerTwoInput : HTMLInputElement = document.getElementById("playerTwoInput") as HTMLInputElement;
let playerOneName : HTMLElement = document.getElementById("playerOneName") as HTMLElement;
let playerTwoName : HTMLElement = document.getElementById("playerTwoName") as HTMLElement;
let playerOneScore : HTMLElement = document.getElementById("playerOneScore") as HTMLElement;
let playerTwoScore : HTMLElement = document.getElementById("playerTwoScore") as HTMLElement;
let gridContainer : HTMLElement = document.getElementById("gridSquares") as HTMLElement;
let gridButtons : NodeListOf<HTMLElement> = gridContainer.querySelectorAll("button");
let resetBoard : HTMLElement = document.getElementById("resetBoard") as HTMLElement;
let resetPlayers : HTMLElement = document.getElementById("resetPlayers") as HTMLElement;

let computerToggle = false;
let game = new Game();

initEvents();

function initEvents() {
    startButton.addEventListener("click", onStartButtonClick);
    computerButton.addEventListener("click", onComputerButtonClick);
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

        if (!computerToggle) {
            if (game.currentPlayer() === game.playerOne) {
                gridButton.textContent = "X";
            } else {
                gridButton.textContent = "O";
            }
        } else {
            gridButton.textContent = "X";
            game.changeTurn();

            if (!game.isGameOver()) {
                let computerIndex = game.getBestMove();
                game.playRound(computerIndex);
                gridButtons[computerIndex].textContent = "O";
            }
        }

        game.changeTurn();
        playerOneScore.textContent = `${game.playerOne.score}`;
        playerTwoScore.textContent = `${game.playerTwo.score}`;
    }
}

// button to reset the board squares when game is over
function onResetBoardButtonClick() {
    gridButtons.forEach((gridButton : HTMLElement) => {
        gridButton.textContent = "";
    });
    game.nextRound();
}

// button to reset and choose new player names
function onResetPlayersButtonClick(event : MouseEvent) {
    event.preventDefault();

    resetBoard.click();
    game.resetPlayers();

    playerOneScore.textContent = `${game.playerOne.score}`;
    playerTwoScore.textContent = `${game.playerTwo.score}`;

    computerToggle = false;

    gameBoard.classList.toggle("hidden");
    startScreen.classList.toggle("hidden");
}

// button to display the game board with the chosen player names
function onStartButtonClick(event : MouseEvent) {
    toggleBoard(event);
}

// button to display the game board and play against the computer
function onComputerButtonClick(event : MouseEvent) {
    toggleBoard(event);
    playerTwoName.textContent += " (Computer)";
    computerToggle = true;
}

function toggleBoard(event : MouseEvent) {
    event.preventDefault();

    game.playerOne.name = playerOneInput.value;
    game.playerTwo.name = playerTwoInput.value;

    playerOneName.textContent = game.playerOne.name;
    playerTwoName.textContent = game.playerTwo.name;

    startScreen.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
}