import { ePlayerSymbol } from "../Enums/ePlayerSymbol";
import { IsWin } from "./Logic";

export class Grid {
    private m_grid: number[];
    private m_gridDimension: number = 3;

    public get Grid(): number[] {
        return this.m_grid;
    }

    constructor(gridDimension: number) {
        this.m_gridDimension = gridDimension;
        this.m_grid = new Array<number>(gridDimension * gridDimension);
    }

    private GetEmptyIndices(): number[] {
        const indiceArray = [];

        this.m_grid.forEach((val, i) => {
            if (val === -1)
                indiceArray.push(i);
        });

        return indiceArray;
    }

    public MarkGrid(index: number, playerSymbol: ePlayerSymbol): void {
        this.m_grid[index] = playerSymbol;
    }

    public RemoveMark(index: number): void {
        this.m_grid[index] = -1;
    }

    public Reset(): void {
        for (let i = 0; i < this.m_grid.length; i++) {
            this.RemoveMark(i);
        }
    }

    public RandomEmptyIndex(): number {
        const emptyIndices: number[] = this.GetEmptyIndices();

        const index = Math.random() * emptyIndices.length;
        return emptyIndices[index];
    }

    public IsWin(symbol: ePlayerSymbol): boolean {
        return IsWin(this.m_grid, this.m_gridDimension, symbol);
    }
}