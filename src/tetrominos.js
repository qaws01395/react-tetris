export const TETROMINOS = {
  0: { shape: [[0]], color: '0,0,0'},
  I: { 
    shape: [
              [0, 'I', 0, 0],
              [0, 'I', 0, 0],
              [0, 'I', 0, 0],
              [0, 'I', 0, 0]
            ], 
    color: '123,20,50'
  },
  J: {
    shape: [
      [0,   'J', 0],
      [0,   'J', 0],
      ['J', 'J', 0],
    ], 
    color: '34,124,63'
  },
  L: {
    shape: [
      [0, 'L',  0],
      [0, 'L',  0],
      [0, 'L', 'L'],
    ], 
    color: '34,20,163'
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O']
    ], 
    color: '34,200,200'
  },
  S: {
    shape: [
      [0,   'S', 'S'],
      ['S', 'S',  0],
      [0,    0 ,  0],
    ], 
    color: '134,10,103'
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0,   'T',  0],
      [0,    0,   0]
    ], 
    color: '100,100,100'
  },
  Z: {
    shape: [
      ['Z', 'Z',  0],
      [0,   'Z', 'Z'],
      [0,    0 ,  0],
    ], 
    color: '123,123,63'
  },
}

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = 
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
}