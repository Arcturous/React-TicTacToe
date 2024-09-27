import { eDifficulty } from "../../Enums/eDifficulty";
import { Grid } from "../Grid";
import { CalculateBestMove } from "../Logic";
import { Player } from "./Player";

export class ComputerPlayer extends Player {
    private m_difficulty: eDifficulty;

    constructor(index: number = 0, difficulty: eDifficulty = eDifficulty.easy) {
        super(index == 0 ? "Computer" : `Computer${index}`);
        this.m_difficulty = difficulty;
    }

    public NextMoveIndex(grid: Grid): number {
        if (this.m_difficulty == eDifficulty.medium) {
            const rand: number = (Math.random() * 100) + 1;    // 1 - 100
            if (rand < 31)  // 30% to make random choice
                return grid.RandomEmptyIndex();

            // otherwise pick best next move
            return CalculateBestMove(grid.Grid, this.PlayerSymbol);
        }

        if (this.m_difficulty == eDifficulty.hard) {
            // always pick best next move
            return CalculateBestMove(grid.Grid, this.PlayerSymbol);
        }

        // default normal difficulty - always pick random move 
        return grid.RandomEmptyIndex();
    }
}