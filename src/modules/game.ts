import Player from "./player.js";

export default class Game {
    private board = new Map();
    private xTurn = true;
    private gameOver = false;
    private winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    playerOne = new Player();
    playerTwo = new Player();

    // private methods
    private checkSquares(this: Game) {
        if (this.board.size > 8) {
            this.gameOver = true;
            return;
        }

        for (let i = 0; i < this.winningCombinations.length; ++i) {
            let comb = this.winningCombinations[i];

            if (this.board.get(comb[0]) === "X" && this.board.get(comb[1]) === "X" && this.board.get(comb[2]) === "X") {
                this.playerOne.win()
                this.gameOver = true;
                break;
            } else if (this.board.get(comb[0]) === "O" && this.board.get(comb[1]) === "O" && this.board.get(comb[2]) === "O") {
                this.playerTwo.win();
                this.gameOver = true;
                break;
            }
        }
    }

    // public methods
    isGameOver(this: Game) {
        return this.gameOver;
    }

    getSquare(this: Game, index: number) {
        return this.board.get(index);
    }

    nextRound(this: Game) {
        this.board = new Map();
        this.gameOver = false;
    }

    resetPlayers(this: Game) {
        this.playerOne.reset();
        this.playerTwo.reset();
    }

    playRound(this: Game, index: number) {
        if (this.xTurn) {
            this.board.set(index, "X");
        } else {
            this.board.set(index, "O");
        }

        this.xTurn = !this.xTurn;
        this.checkSquares();
    }
}