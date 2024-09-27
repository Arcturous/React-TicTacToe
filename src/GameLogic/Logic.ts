import { ePlayerSymbol } from "../Enums/ePlayerSymbol";
import { Move } from "./Move";

const WIN_SCORE = 10;
const LOSE_SCORE = -1000;
const STEP_SCORE = -50;
const DRAW_SCORE = 0;

const checkedMoves = new Map<string, Move>();

let currentPlayerSymbol: ePlayerSymbol;
let currentOpponentSymbol: ePlayerSymbol;

export function CalculateBestMove(grid: number[], playerSymbol: ePlayerSymbol) {
    checkedMoves.clear();

    currentPlayerSymbol = playerSymbol;
    currentOpponentSymbol = (1 - playerSymbol) as ePlayerSymbol;   // this only applies because we know theres only 2 symbols "X" and "O", need to change if we want to add more symbols in the future

    if (grid.every(element => element === -1))   // if the grid is empty
    {
        return Math.random() * grid.length;    // return a random spot on the grid
    }

    let gridDimension = Math.sqrt(grid.length);
    return MiniMax(grid, gridDimension, playerSymbol).index;
}

function GetEmptyIndices(grid: number[]): number[] {
    let indiceArray: number[] = new Array(grid.length);

    // fill it with the indices
    for (let i = 0; i < indiceArray.length; i++) {
        indiceArray[i] = i;
    }

    // filter which indices are empty
    let emptyindices = indiceArray.filter((index) => grid[index] === -1);

    return emptyindices;
}

function MiniMax(newGrid: number[], gridDimension: number, playerSymbol: ePlayerSymbol): Move {
    if (IsWin(newGrid, gridDimension, currentOpponentSymbol)) // other player won
    {
        return new Move(-1, LOSE_SCORE);
    }

    if (IsWin(newGrid, gridDimension, currentPlayerSymbol)) // this player won
    {
        return new Move(-1, WIN_SCORE);
    }

    let emptyindices = GetEmptyIndices(newGrid);
    if (emptyindices.length === 0) {
        return new Move(-1, DRAW_SCORE);
    }

    // a list to collect all the possible moves for this grid
    const movesList: Move[] = [];

    // loop through available spots
    for (let i = 0; i < emptyindices.length; i++) {
        //create an object for each spot and store the index of that spot 
        let move = new Move(emptyindices[i]);

        // set the empty spot to the player symbol
        newGrid[emptyindices[i]] = playerSymbol;

        // calculate the score from the other players move - save the result to dictionary so we can save iterations, thus lowering runtime of the calculation for large/empty grids
        let result: Move;
        if (checkedMoves.has((newGrid.join(", ") + `, ${(1 - playerSymbol)}`))) {
            result = checkedMoves[newGrid.join(", ") + `, ${(1 - playerSymbol)}`];
        }
        else    // key doesn't exist
        {
            result = MiniMax(newGrid, gridDimension, (1 - playerSymbol) as (ePlayerSymbol));
            checkedMoves.set(newGrid.join(", ") + `, ${(1 - playerSymbol)}`, result);
        }

        move.score = result.score + STEP_SCORE; // substract score for any move that doesn't lead to a win - thus making us search for the shortest route to win

        // reset the spot to empty
        newGrid[emptyindices[i]] = -1;

        // push the object to the list
        movesList.push(move);
    }

    // Debug.Log($"moves list {string.Join(", ", movesList.ConvertAll((m) => (m.index, m.score)))}");

    let bestMove = new Move();
    if (currentPlayerSymbol === playerSymbol) // if it is the computer's turn loop over the moves and choose the move with the highest score
    {
        bestMove.score = Number.MIN_VALUE;   // start with low number and go up to best score possible

        for (let i = 0; i < movesList.length; i++) {
            if (movesList[i].score > bestMove.score) {
                bestMove = movesList[i];
            }
        }
    }
    else // else (opponent turn) loop over the moves and choose the move with the lowest score
    {
        bestMove.score = Number.MAX_VALUE; // start with high number and go to lowest score possible
        for (let i = 0; i < movesList.length; i++) {
            if (movesList[i].score < bestMove.score) {
                bestMove = movesList[i];
            }
        }
    }

    // return the chosen move (object) from the moves array
    return bestMove;
}

export function IsWin(grid: number[], gridDimension: number, playerSymbol: ePlayerSymbol) {
    let matchesNumberHorizontal = 0;
    let matchesNumberVertical = 0;
    let matchesNumberDiagonal = 0;
    let matchesNumberReverseDiagonal = 0;

    //  check horizontal and vertical lines
    for (let i = 0; i < gridDimension; i++) {
        matchesNumberHorizontal = 0;
        matchesNumberVertical = 0;
        for (let j = 0; j < gridDimension; j++) {
            // 0 1 2
            // 3 4 5
            // 6 7 8
            if (grid[i * gridDimension + j] === playerSymbol) {
                matchesNumberHorizontal++;
            }

            // 0 3 6
            // 1 4 7
            // 2 5 8
            if (grid[j * gridDimension + i] === playerSymbol) {
                matchesNumberVertical++;
            }

            //  player won
            if (matchesNumberHorizontal === gridDimension || matchesNumberVertical === gridDimension) {
                return true;
            }
        }
    }

    let diagonalIndex = 0;

    //  check diagonal line
    for (let i = 0; i < gridDimension; i++) {
        if (i === 0) {
            diagonalIndex = 0;
        }
        else {
            diagonalIndex = i * gridDimension + i;
        }

        if (grid[diagonalIndex] === playerSymbol) {
            matchesNumberDiagonal++;
        }

        //  player won
        if (matchesNumberDiagonal === gridDimension) {
            return true;
        }
    }

    //  check reverse diagonal line
    for (let i = gridDimension - 1; i >= 0; i--) {
        if (i === 0) {
            diagonalIndex = gridDimension - 1;
        }
        else {
            diagonalIndex = i * gridDimension + gridDimension - i - 1;
        }

        if (grid[diagonalIndex] === playerSymbol) {
            matchesNumberReverseDiagonal++;
        }

        //  player won
        if (matchesNumberReverseDiagonal === gridDimension) {
            return true;
        }
    }

    return false;
}