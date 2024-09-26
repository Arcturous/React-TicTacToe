import React from "react";

export function GameButton({ value, onButtonClick }): React.JSX.Element {
    return <button disabled={!!value} className="board-button" onClick={onButtonClick}>{value ?? ""}</button>;
}

