import Player from "./player.js";

export default class Game {
    private boardSize = 0;
    private xTurn = true;
    private gameOver = false;

    private rows = [0,0,0];
    private columns = [0,0,0];
    private diagonals = [0,0];

    playerOne = new Player();
    playerTwo = new Player();

    // private methods

    // The rows/columns/diagonals arrays have their appropriate element incremented for "X", or decremented for "O". 
    // A winning state for "X" then occurs when the value 3 appears, and a winning state for "O" occurs when the value -3 appears.
    private winCheck(this: Game) {
        if (this.boardSize > 8) {
            this.gameOver = true;
            return;
        }

        for (let i = 0; i < this.rows.length; ++i) {
            if (this.rows[i] === 3 || this.rows[i] === -3 || this.columns[i] === 3 || this.columns[i] === -3) {
                this.currentPlayer().win();
                this.gameOver = true;
                return;
            }
        }

        for (let i = 0; i < this.diagonals.length; ++i) {
            if (this.diagonals[i] === 3 || this.diagonals[i] === -3) {
                this.currentPlayer().win();
                this.gameOver = true;
                return;
            }
        }
    }

    // public methods
    isGameOver(this: Game) {
        return this.gameOver;
    }

    currentPlayer(this: Game) {
        if (this.xTurn) {
            return this.playerOne;
        } else {
            return this.playerTwo;
        }
    }

    nextRound(this: Game) {
        this.boardSize = 0;
        this.xTurn = true;
        this.gameOver = false;
        this.rows = [0,0,0];
        this.columns = [0,0,0];
        this.diagonals = [0,0];
    }

    resetPlayers(this: Game) {
        this.playerOne.reset();
        this.playerTwo.reset();
    }

    changeTurn(this: Game) {
        this.xTurn = !this.xTurn;
    }

    playRound(this: Game, index: number) {
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (this.xTurn) {
            ++this.rows[row];
            ++this.columns[col];

            if (index === 0 || index === 4 || index === 8) ++this.diagonals[0];
            if (index === 2 || index === 4 || index === 6) ++this.diagonals[1];

        } else {
            --this.rows[row];
            --this.columns[col];

            if (index === 0 || index === 4 || index === 8) --this.diagonals[0];
            if (index === 2 || index === 4 || index === 6) --this.diagonals[1];
        }

        ++this.boardSize;
        this.winCheck();
    }
}