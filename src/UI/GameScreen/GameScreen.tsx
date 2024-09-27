import React, { useState } from 'react';
import './GameScreen.css';
import { GameBoard } from '../';
import { EndScreen } from '../';
import { ePlayerSymbol } from '../../Enums/ePlayerSymbol';

export function GameScreen(): React.JSX.Element {
  const [isWin, setIsWin] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleWin = (player: ePlayerSymbol) => {
    setIsWin(true);
    setWinner(player);
  }

  return (
    <div className="game-screen">
      <header className="game-screen-header">
        <EndScreen isWin={isWin} player={winner}></EndScreen>
        <GameBoard handleWin={handleWin}></GameBoard>
      </header>
    </div>
  );
}
