import React from "react";

export function EndScreen({ isWin, player }): React.JSX.Element {
    return <div color="white">{isWin ? `Player ${player} wins!` : ""}</div>
}