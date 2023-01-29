import Player from "./player.js";

export default class Game {
    private board : string[] = Array(9).fill("-");
    private xTurn = true;
    private gameOver = false;

    private rows = [0,0,0];
    private columns = [0,0,0];
    private diagonals = [0,0];

    playerOne = new Player();
    playerTwo = new Player();

    // public methods
    isGameOver(this: Game) : boolean {
        return this.gameOver;
    }

    currentPlayer(this: Game) : Player {
        if (this.xTurn) {
            return this.playerOne;
        } else {
            return this.playerTwo;
        }
    }

    nextRound(this: Game) : void {
        this.board = Array(9).fill("-");
        this.xTurn = true;
        this.gameOver = false;
        this.rows = [0,0,0];
        this.columns = [0,0,0];
        this.diagonals = [0,0];
    }

    resetPlayers(this: Game) : void {
        this.playerOne.reset();
        this.playerTwo.reset();
    }

    changeTurn(this: Game) : void {
        this.xTurn = !this.xTurn;
    }

    // The rows/columns/diagonals arrays have their appropriate element incremented for "X" or decremented for "O". 
    // A winning state for "X" occurs when 3 appears, and a winning state for "O" occurs when -3 appears.
    // The check for these conditions is given by winCheck.
    playRound(this: Game, index: number) : void {
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (this.xTurn) {
            ++this.rows[row];
            ++this.columns[col];

            if (index === 0 || index === 4 || index === 8) ++this.diagonals[0];
            if (index === 2 || index === 4 || index === 6) ++this.diagonals[1];

            this.board[index] = "X";

        } else {
            --this.rows[row];
            --this.columns[col];

            if (index === 0 || index === 4 || index === 8) --this.diagonals[0];
            if (index === 2 || index === 4 || index === 6) --this.diagonals[1];

            this.board[index] = "O";
        }

        this.winCheck();
    }

    // private methods
    private winCheck(this: Game) : string {
        if (this.board.length > 8) {
            this.gameOver = true;
            return "DRAW";
        }

        for (let i = 0; i < this.rows.length; ++i) {
            if (this.rows[i] === 3 || this.rows[i] === -3 || this.columns[i] === 3 || this.columns[i] === -3) {
                this.currentPlayer().win();
                this.gameOver = true;
                
                if (this.currentPlayer() === this.playerOne) {
                    return "X";
                } else {
                    return "O";
                }
            }
        }

        for (let i = 0; i < this.diagonals.length; ++i) {
            if (this.diagonals[i] === 3 || this.diagonals[i] === -3) {
                this.currentPlayer().win();
                this.gameOver = true;
                
                if (this.currentPlayer() === this.playerOne) {
                    return "X";
                } else {
                    return "O";
                }
            }
        }
        return "CONTINUE";
    }

    // Minimax algorithm recursively fills the remaining squares and ranks the outcomes.
    // A positive score indicates a favourable outcome for "O", while a negative score
    // indicates a favourable outcome for "X".
    private minimax(this: Game, board : string[], isMaximizing : boolean) : number {
        let result = this.winCheck();
        
        if (result === "X") return -1;
        if (result === "O") return 1;
        if (result === "DRAW") return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; ++i) {
                if (board[i] === "-") {
                    board[i] = "O";
                    const score = this.minimax(board, false) as number;
                    board[i] = "-";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; ++i) {
                if (board[i] === "-") {
                    board[i] === "X";
                    const score = this.minimax(board, true) as number;
                    board[i] = "-";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // obtains the index of the best move for "O"
    private getBestMove(this: Game, board : string[]) : number {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; ++i) {
            if (board[i] === "-") {
                board[i] === "O";
                const score = this.minimax(board, false);
                board[i] === "-";

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }
}