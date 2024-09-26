import React, { useState } from 'react';
import './GameScreen.css';
import { GameBoard } from '../';
import { EndScreen } from '../';

export function GameScreen(): React.JSX.Element {
  const [isWin, setIsWin] = useState(false);

  const handleWin = () => {
    setIsWin(true);
  }

  return (
    <div className="game-screen">
      <header className="game-screen-header">
        <EndScreen isWin={isWin}></EndScreen>
        <GameBoard handleWin={handleWin}></GameBoard>
      </header>
    </div>
  );
}
