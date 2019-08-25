import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { log } from 'util';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsClear, setRowsClear] = useState(0);

  useEffect(() => {
    setRowsClear(0);
    const sweepRows = newStage => 
      newStage.reduce((accumulator, row) => {
        // all cell on the row is filled
        if(row.findIndex(cell => cell[0] === 0) === -1 ) {
          console.log('suspected sweep');
          
          setRowsClear(prev => prev + 1);
          // create fresh new rows on the top of the stage
          // unshift add new element to the beginning of the array
          accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return accumulator;
        }
        // returns the row as it is
        accumulator.push(row);
        return accumulator;
      }, [])
    
    const updateStage = prevStage => {
      // First flush the stage
      const newStage = prevStage.map(row => 
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value, 
              `${player.collided? 'merged' : 'clear'}`]
          }
        }) 
      })
      // Then check if collided
      if(player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    }

    setStage(prev => updateStage(prev))

  }, [player, resetPlayer])

  return [stage, setStage, rowsClear];
}