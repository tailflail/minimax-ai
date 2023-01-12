let gameBoard = document.getElementById("gameBoard");
let startScreen = document.getElementById("startScreen");
let startButton = document.getElementById("startButton");
let playerOneInput = document.getElementById("playerOneInput");
let playerTwoInput = document.getElementById("playerTwoInput");
let playerOneName = document.getElementById("playerOneName");
let playerTwoName = document.getElementById("playerTwoName");
let playerOneScore = document.getElementById("playerOneScore");
let playerTwoScore = document.getElementById("playerTwoScore");
let gridContainer = document.getElementById("gridSquares");
let gridButtons = gridContainer.querySelectorAll("button");
let resetBoard = document.getElementById("resetBoard");
let resetPlayers = document.getElementById("resetPlayers");

let playerOne;
let playerTwo;

initEvents();

function initEvents() {
    startButton.addEventListener("click", onStartButtonClick);
    resetBoard.addEventListener("click", onResetBoardButtonClick);
    resetPlayers.addEventListener("click", onResetPlayersButtonClick);

    gridButtons.forEach((gridButton, index) => {
    gridButton.addEventListener("click", () => { onGridButtonClick(gridButton, index) })
});
}

// main game logic
function onGridButtonClick(gridButton, index) {
    if (!game.isGameOver() && gridButton.textContent === "") {
        game.playRound(playerOne, playerTwo, index);

        gridButton.textContent = game.getSquare(index);
        playerOneScore.textContent = `${playerOne.getScore()}`;
        playerTwoScore.textContent = `${playerTwo.getScore()}`;
    }
}

// button to reset the board squares when game is over
function onResetBoardButtonClick() {
    if (game.isGameOver()) {
        gridButtons.forEach((gridButton) => {
            gridButton.textContent = "";
        });
        game.resetGame();
    }
}

// button to display the game board with the chosen player names
function onStartButtonClick(event) {
    event.preventDefault();

    playerOne = Player(playerOneInput.value);
    playerTwo = Player(playerTwoInput.value);

    playerOneName.textContent = playerOne.getName();
    playerTwoName.textContent = playerTwo.getName();

    startScreen.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
}

// button to reset and choose new player names
function onResetPlayersButtonClick(event) {
    event.preventDefault();

    resetBoard.click();
    playerOne.resetPlayer();
    playerTwo.resetPlayer();

    playerOneScore.textContent = `${playerOne.getScore()}`;
    playerTwoScore.textContent = `${playerTwo.getScore()}`;

    gameBoard.classList.toggle("hidden");
    startScreen.classList.toggle("hidden");
}

// tic-tac-toe game module
const game = (() => {
    let board = new Map();
    let xTurn = true;
    let gameOver = false;
    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // private methods
    const checkSquares = (playerOne, playerTwo) => {
        if (board.size > 8) {
            gameOver = true;
            return;
        }

        for (let i = 0; i < winningCombinations.length; ++i) {
            let comb = winningCombinations[i];

            if (board.get(comb[0]) === "X" && board.get(comb[1]) === "X" && board.get(comb[2]) === "X") {
                playerOne.win()
                gameOver = true;
                break;
            } else if (board.get(comb[0]) === "O" && board.get(comb[1]) === "O" && board.get(comb[2]) === "O") {
                playerTwo.win();
                gameOver = true;
                break;
            }
        }
    }

    const changeTurn = () => xTurn = !xTurn;

    // public methods
    const isGameOver = () => gameOver;

    const getSquare = (index) => board.get(index);

    const resetGame = () => {
        board = new Map();
        gameOver = false;
    }

    const playRound = (playerOne, playerTwo, index) => {
        xTurn ? board.set(index, "X") : board.set(index, "O");
        changeTurn();
        checkSquares(playerOne, playerTwo);
    }

    return { isGameOver, getSquare, resetGame, playRound };
})();

// player factory function
const Player = (name) => {
    let score = 0;

    const getName = () => name;
    const getScore = () => score;
    const win = () => ++score;

    const resetPlayer = () => {
        score = 0;
        name = "";
    }

    return { getName, getScore, win, resetPlayer };
};