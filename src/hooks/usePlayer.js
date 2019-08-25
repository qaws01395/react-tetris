import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_HEIGHT, STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  // destructuring and initialize init state
  const [player, setPlayer] = useState({
    pos: {x: 0, y: 0},
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const updatePlayerPos = ({x , y, collided}) => {
    setPlayer(prev => ({
      ...prev,
      pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
      collided
    }))
  }

  const rotate = (matrix, clockwise) => {
    // make the row become column (transpose)
    const transposedMatrix = matrix.map((_, index) => 
      matrix.map(col => col[index])
    )
    // Reverse each row
    if (clockwise > 0) 
      return transposedMatrix.map(row => row.reverse());
    else return transposedMatrix.reverse();
  }

  const playerRotate = (stage, clockwise) => {
    // deep copy
    const clonedPlayer = JSON.parse(JSON.stringify(player)); 
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, clockwise);
    // check collision of rotated player
    const pos = clonedPlayer.pos.x;
    console.log('original clonedPlayer.pos.x', clonedPlayer.pos.x);
    let offset = 1;
    // find the offset to put the player when it collides
    while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      console.log('clonedPlayer.pos.x', clonedPlayer.pos.x);
      // when offset is larger than the tetromino array size
      // don't place it (that will be too far), give up rotate.. 
      // or you might get stuck in infinity loops
      if(offset > clonedPlayer.tetromino[0].length) {
        // reset player
        rotate(clonedPlayer.tetromino, -clockwise);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: {x: STAGE_WIDTH / 2 - 2, y: 0 }, // in the middle
      tetromino: randomTetromino().shape,
      collided: false
    })
  }, [])
  
  return [player, updatePlayerPos, resetPlayer, playerRotate];
}