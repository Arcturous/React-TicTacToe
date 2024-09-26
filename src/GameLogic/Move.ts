export class Move {
    public index: number;
    public score: number; // weight

    constructor(index: number = -1, score: number = 0) {
        this.index = index;
        this.score = score;
    }
}