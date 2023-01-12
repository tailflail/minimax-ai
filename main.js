// game module
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

    const resetGame = () => {
        game.board = new Map();
        game.gameOver = false;
    }

    const changeTurn = () => {
        game.xTurn = !game.xTurn;
    }

    const checkSquares = (playerOne, playerTwo) => {
        if (game.board.size > 8) {
            game.gameOver = true;
            return;
        }

        for (let i = 0; i < winningCombinations.length; ++i) {
            let comb = winningCombinations[i];

            if (game.board.get(comb[0]) === "X" && game.board.get(comb[1]) === "X" && game.board.get(comb[2]) === "X") {
                playerOne.win()
                game.gameOver = true;
            } else if (game.board.get(comb[0]) === "O" && game.board.get(comb[1]) === "O" && game.board.get(comb[2]) === "O") {
                playerTwo.win();
                game.gameOver = true;
            }
        }
    }

    return { board, xTurn, gameOver, resetGame, checkSquares, changeTurn };
})();

// player factory function
const Player = (name) => {
    let score = 0;
    const getName = () => name;

    const getScore = () => score;

    const resetPlayer = () => {
        score = 0;
        name = "";
    }
    const win = () => ++score;

    return { getName, getScore, win, resetPlayer };
};

let gameBoard = document.getElementById("gameBoard");
let startScreen = document.getElementById("startScreen");
let startButton = document.getElementById("startButton");
let playerOneInput = document.getElementById("playerOneInput");
let playerTwoInput = document.getElementById("playerTwoInput");
let playerOneName = document.getElementById("playerOneName");
let playerTwoName = document.getElementById("playerTwoName");
let playerOneScore = document.getElementById("playerOneScore");
let playerTwoScore = document.getElementById("playerTwoScore");
let choiceContainer = document.getElementById("choices");
let choiceButtons = choiceContainer.querySelectorAll("button");
let resetBoard = document.getElementById("resetBoard");
let resetPlayers = document.getElementById("resetPlayers");

let playerOne;
let playerTwo;

// button to display the game board with the chosen player names
startButton.addEventListener("click", (event) => {
    event.preventDefault();

    playerOne = Player(playerOneInput.value);
    playerTwo = Player(playerTwoInput.value);

    playerOneName.textContent = playerOne.getName();
    playerTwoName.textContent = playerTwo.getName();

    startScreen.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
})

// main game loop
choiceButtons.forEach((item, idx) => {
    item.addEventListener("click", () => {
        if (!game.gameOver && item.textContent === "") {
            if (game.xTurn) {
                item.textContent = "X";
                game.board.set(idx, "X");
            } else {
                item.textContent = "O";
                game.board.set(idx, "O");
            }
            game.changeTurn();

            game.checkSquares(playerOne, playerTwo);
            playerOneScore.textContent = `${playerOne.getScore()}`;
            playerTwoScore.textContent = `${playerTwo.getScore()}`;
        }
    });
});

// button to reset the board squares when game is over
resetBoard.addEventListener("click", () => {
    if (game.gameOver) {
        choiceButtons.forEach((item, idx) => {
            item.textContent = "";
        });
        game.resetGame();
    }
});

// button to reset and choose new player names
resetPlayers.addEventListener("click", (event) => {
    event.preventDefault();

    resetBoard.click();
    playerOne.resetPlayer();
    playerTwo.resetPlayer();

    playerOneScore.textContent = `${playerOne.getScore()}`;
    playerTwoScore.textContent = `${playerTwo.getScore()}`;

    gameBoard.classList.toggle("hidden");
    startScreen.classList.toggle("hidden");
})