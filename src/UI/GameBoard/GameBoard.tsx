import { useState } from "react";
import { GameButton } from "../";
import { IsWin } from "../../GameLogic";
import React from "react";

export function GameBoard({ handleWin }): React.JSX.Element {
    const [squares, setSquares] = useState(Array(9).fill(null));
    let [player, setPlayer] = useState(0);

    function handleClick(i: number, player: number) {
        const nextSquares = squares.slice();
        nextSquares[i] = player === 0 ? "X" : "O";
        setPlayer(player === 0 ? 1 : 0);
        setSquares(nextSquares);

        if (IsWin(squares, 3, player as 1 | 0)) {
            handleWin();
        }
    }

    return <>
        <div className="board-row">
            <GameButton value={squares[0]} onButtonClick={() => handleClick(0, player)} />
            <GameButton value={squares[1]} onButtonClick={() => handleClick(1, player)} />
            <GameButton value={squares[2]} onButtonClick={() => handleClick(2, player)} />
        </div>
        <div className="board-row">
            <GameButton value={squares[3]} onButtonClick={() => handleClick(3, player)} />
            <GameButton value={squares[4]} onButtonClick={() => handleClick(4, player)} />
            <GameButton value={squares[5]} onButtonClick={() => handleClick(5, player)} />
        </div>
        <div className="board-row">
            <GameButton value={squares[6]} onButtonClick={() => handleClick(6, player)} />
            <GameButton value={squares[7]} onButtonClick={() => handleClick(7, player)} />
            <GameButton value={squares[8]} onButtonClick={() => handleClick(8, player)} />
        </div>
    </>
}