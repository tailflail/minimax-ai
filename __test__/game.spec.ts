import Game from "../src/modules/game"

// Board index combinations for X win, O win and draw
const xWin = [0,3,1,4,2];
const oWin = [3,0,4,1,8,2];

describe("isGameOver", () => {
    it("returns false when the game is not over", () => {
        const game = new Game();
        expect(game.isGameOver()).toBe(false);
    });

    it("returns true when a player wins the game", () => {
        const game = new Game();
        xWin.forEach((index) => game.playRound(index));
        expect(game.isGameOver()).toBe(true);
    });

    it("returns true when the game is a draw", () => {
        const game = new Game();
        const draw = [0,1,3,4,7,6,2,5,8];
        draw.forEach((index) => game.playRound(index));
        expect(game.isGameOver()).toBe(true);
    })
});

describe("currentPlayer", () => {
    it("returns player one when X turn", () => {
        const game = new Game();
        expect(game.currentPlayer()).toBe(game.playerOne);
    });

    it("returns player two when O turn", () => {
        const game = new Game();
        game.playRound(0);
        expect(game.currentPlayer()).toBe(game.playerTwo);
    });
});

describe("nextRound", () => {
    it("resets the game", () => {
        const game = new Game();
        xWin.forEach((index) => game.playRound(index));
        game.nextRound();
        expect(game.currentPlayer()).toBe(game.playerOne);
        expect(game.isGameOver()).toBe(false);
    });
});

describe("players", () => {
    it("updates player one score", () => {
        const game = new Game();
        xWin.forEach((index) => game.playRound(index));
        expect(game.playerOne.score).toBe(1);
    });

    it("updates player two score", () => {
        const game = new Game();
        oWin.forEach((index) => game.playRound(index));
        expect(game.playerTwo.score).toBe(1);
    });

    describe("currentPlayer", () => {
        it("resets player names", () => {
            const game = new Game();
            game.playerOne.name = "Bob";
            game.playerTwo.name = "Alice";
            game.resetPlayers();
            expect(game.playerOne.name !== "Bob" && game.playerTwo.name !== "Alice").toBe(true);
        });
    
        it("resets player scores", () => {
            const game = new Game();
            xWin.forEach((index) => game.playRound(index));
            game.nextRound();
            oWin.forEach((index) => game.playRound(index));
            game.resetPlayers();
            expect(game.playerOne.score === 0 && game.playerTwo.score === 0).toBe(true);
        });
    })
});

describe("playRound", () => {
    it("returns 'X' if current player is player one", () => {
        const game = new Game();
        expect(game.playRound(0)).toBe("X");
    });

    it("returns 'O' if current player is player two", () => {
        const game = new Game();
        game.playRound(0);
        expect(game.playRound(1)).toBe("O");
    });
});

describe("getBestMove", () => {
    it("returns winning move for O", () => {
        const game = new Game();
        const almostOWin = [3,0,4,1,8];
        almostOWin.forEach((index) => game.playRound(index));
        expect(game.getBestMove()).toBe(2);
    });

    it("prevents X from winning", () => {
        const game = new Game();
        const almostXWin = [6,4,7];
        almostXWin.forEach((index) => game.playRound(index));
        expect(game.getBestMove()).toBe(8);
    });
});