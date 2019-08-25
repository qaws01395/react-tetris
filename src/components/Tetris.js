import React, { useState } from 'react';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

// Customized Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage, checkCollision } from '../gameHelpers';

import { randomQuotes } from '../gameOverText';


const Tetris = () => {
  const [dropTime, setDroptime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');

  const movePlayer = dir => {
    if ( !checkCollision(player, stage, {x: dir, y: 0}) ) 
      updatePlayerPos({ x: dir, y: 0});
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDroptime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  const drop = () => {
    // increase the level when the user has cleared 10 rows
    if (rows > (level + 1) * 10 ) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDroptime(1000 / (level + 1) + 200 );
    }

    if ( !checkCollision(player, stage, {x: 0, y: 1}) ) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over
      if(player.pos.y < 1) {
        console.log('Game Over');
        setGameOver(true);
        setDroptime(null);
      }

      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const pushToBottom = () => {
    let offset = 1;
    while(!checkCollision(player, stage, {x: 0, y: offset})) {
      offset += 1;
    }
    updatePlayerPos({ x: 0, y: offset - 1, collided: false });
    // BUG if you hit it too fast the block will disappear
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) { // down
        setDroptime(1000 / (level + 1) + 200);
      }
    }
  }
  
  const dropPlayer = () => {
    setDroptime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) { // left
        movePlayer(-1);
      } else if (keyCode === 39) { // right
        movePlayer(1);
      } else if (keyCode === 40) { // down
        dropPlayer();
      } else if (keyCode === 38) { // up
        playerRotate(stage, 1);
      } else if (keyCode === 32 ) { // white space
        pushToBottom();
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);
  
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={ stage }/>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text={randomQuotes()} /> 
            ) : (
            <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
          </div>
          )}
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris;