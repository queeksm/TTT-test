const MOCKBoard = () => {
  let board = [];
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  const updateBoard = (row, column, token) => {
    if (board[row][column] === '') {
      board[row][column] = token;
      return board;
    }
    return null;
  };

  const cleanBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        board[i][j] = '';
      }
    }
  };

  const isFull = () => {
    const condition = board[0].includes('') || board[1].includes('') || board[2].includes('');
    return condition;
  };

  return {
    board, updateBoard, cleanBoard, isFull,
  };
};


const writeInCellMOCK = (i, j, value) => `The value ${value} was written in the cell [${i}, ${j}]`;

const drawResultMOCK = (text, player) => {
  if (text === 'Victory') {
    return `You win ${player.name}`;
  }

  return 'Draw';
};

const checkVictoryMOCK = (table) => {
  const case1 = (table.board[0][0] === table.board[0][1]) && (table.board[0][1] === table.board[0][2]) && (table.board[0][0] !== '');
  const case2 = (table.board[1][0] === table.board[1][1]) && (table.board[1][1] === table.board[1][2]) && (table.board[1][0] !== '');
  const case3 = (table.board[2][0] === table.board[2][1]) && (table.board[2][1] === table.board[2][2]) && (table.board[2][0] !== '');
  const case4 = (table.board[0][0] === table.board[1][0]) && (table.board[1][0] === table.board[2][0]) && (table.board[0][0] !== '');
  const case5 = (table.board[0][1] === table.board[1][1]) && (table.board[1][1] === table.board[2][1]) && (table.board[0][1] !== '');
  const case6 = (table.board[0][2] === table.board[1][2]) && (table.board[1][2] === table.board[2][2]) && (table.board[0][2] !== '');
  const case7 = (table.board[0][0] === table.board[1][1]) && (table.board[1][1] === table.board[2][2]) && (table.board[1][1] !== '');
  const case8 = (table.board[0][2] === table.board[1][1]) && (table.board[1][1] === table.board[2][0]) && (table.board[1][1] !== '');

  const cases = [case1, case2, case3, case4, case5, case6, case7, case8];
  if (cases.includes(true)) {
    return 'Victory';
  }
  if (!table.isFull()) {
    return 'DRAW';
  }
  return false;
};

const playerUpdateMOCK = (currentPlayer, player1, player2) => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
  return currentPlayer;
};

const playerMovementMOCK = (row, column, player, flagContinue, board) => {
  if (flagContinue) {
    const updatedBoard = board.updateBoard(row, column, player.token);
    if (!updatedBoard) {
      return 'Invalid Movement, try again.';
    }
    if (checkVictoryMOCK(board) === false) {
      return 'The player and the board were updated';
    }
    return 'Game over';
  }
  return 'not Flagged';
};

export {
  writeInCellMOCK,
  drawResultMOCK, MOCKBoard, checkVictoryMOCK, playerMovementMOCK, playerUpdateMOCK,
};
