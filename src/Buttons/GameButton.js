import React from "react";

function GameButton({ value, onButtonClick }) {
    return <button disabled={!!value} className="board-button" onClick={onButtonClick}>{value ?? ""}</button>;
}

export default GameButton;