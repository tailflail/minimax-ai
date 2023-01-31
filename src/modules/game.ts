import Player from "./player.js";

export default class Game {
    private board : string[] = new Array(9).fill("-");
    private xTurn = true;
    private gameOver = false;

    private readonly winningCombinations = [
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
        this.board = new Array(9).fill("-");
        this.xTurn = true;
        this.gameOver = false;
    }

    resetPlayers(this: Game) : void {
        this.playerOne.reset();
        this.playerTwo.reset();
    }

    playRound(this: Game, index: number) : string {
        if (this.currentPlayer() === this.playerOne) {
            this.board[index] = "X";
        } else {
            this.board[index] = "O";
        }
        this.winCheck(false);
        this.changeTurn();

        return this.board[index];
    }

    // obtains the index of the best move for "O" using minimax
    getBestMove(this: Game) : number {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; ++i) {
            if (this.board[i] === "-") {
                this.board[i] = "O";
                const score = this.minimax(false, 0, -Infinity, Infinity);
                this.board[i] = "-";

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    // private methods
    private changeTurn(this: Game) : void {
        this.xTurn = !this.xTurn;
    }

    // Player wins and game over are not changed when called in the minimax function.
    // This prevents accidental score updates from minimax simulating possible outcomes.
    private winCheck(this: Game, minimaxToggle: boolean) : string {
        if (!this.board.includes("-")) {
            if (!minimaxToggle) {
                this.gameOver = true;
            }
            return "DRAW";
        }

        for (let i = 0; i < this.winningCombinations.length; ++i) {
            const comb = this.winningCombinations[i];

            if (this.board[comb[0]] === "X" && this.board[comb[1]] === "X" && this.board[comb[2]] === "X") {
                if (!minimaxToggle) {
                    this.playerOne.win();
                    this.gameOver = true;
                }
                return "X"
            }

            if (this.board[comb[0]] === "O" && this.board[comb[1]] === "O" && this.board[comb[2]] === "O") {
                if (!minimaxToggle) {
                    this.playerTwo.win();
                    this.gameOver = true;
                }
                return "O"
            }
        }
        return "CONTINUE";
    }

    /* Minimax algorithm recursively fills the remaining squares and ranks the outcomes.
    A positive score indicates a favourable outcome for "O", while a negative score
    indicates a favourable outcome for "X".
    
    Alpha-beta pruning is included to decrease the number of outcomes that are evaluated. 
    Evaluation stops when beta <= alpha, indicating a negative outcome for the computer "O". */
    private minimax(this: Game, isMaximizing: boolean, depth: number, alpha: number, beta: number) : number {
        const result = this.winCheck(true);
        
        if (result === "X") return -10 + depth;
        if (result === "O") return 10 - depth;
        if (result === "DRAW" || depth === 9) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; ++i) {
                if (this.board[i] === "-") {
                    this.board[i] = "O";
                    const score = this.minimax(false, depth + 1, alpha, beta);
                    this.board[i] = "-";

                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) break;
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; ++i) {
                if (this.board[i] === "-") {
                    this.board[i] = "X";
                    const score = this.minimax(true, depth + 1, alpha, beta);
                    this.board[i] = "-";

                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) break;
                }
            }
            return bestScore;
        }
    }
}