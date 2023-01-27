export default class Player {
    name: string;
    score: number;

    constructor(name = "Anonymous") {
        this.name = name;
        this.score = 0;
    }

    win(this: Player) {
        ++this.score;
    }

    reset(this: Player) {
        this.score = 0;
        this.name = "Anonymous";
    }
}