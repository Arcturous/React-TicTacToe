import { useState } from "react";
import GameButton from "../Buttons/GameButton";

function GameBoard() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    let [player, setPlayer] = useState(true);

    function handleClick(i, player) {
        const nextSquares = squares.slice();
        nextSquares[i] = player ? "X" : "O";
        setPlayer(!player);
        setSquares(nextSquares);
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

export default GameBoard;