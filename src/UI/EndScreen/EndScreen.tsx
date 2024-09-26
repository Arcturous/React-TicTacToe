import React from "react";

export function EndScreen({ isWin }): React.JSX.Element {
    return <div color="white">{isWin ? "You Win!" : ""}</div>
}