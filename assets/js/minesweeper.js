const container = document.getElementById('container');
let gameBoard = [];

const loop2D = (cb, size = 10, row = 0, col = 0) => {
  if (row === size) return;
  if (col === size) return loop2D(cb, size, row + 1, 0);
  cb(row, col);
  return loop2D(cb, size, row, col + 1);
};

const findNeighbors = (oi, oj) => {
  const neighbors = [];
  if (gameBoard[oi - 1]) {
    gameBoard[oi - 1][oj - 1] && neighbors.push(gameBoard[oi - 1][oj - 1]);
    gameBoard[oi - 1][oj] && neighbors.push(gameBoard[oi - 1][oj]);
    gameBoard[oi - 1][oj + 1] && neighbors.push(gameBoard[oi - 1][oj + 1]);
  }
  gameBoard[oi][oj - 1] && neighbors.push(gameBoard[oi][oj - 1]);
  gameBoard[oi][oj + 1] && neighbors.push(gameBoard[oi][oj + 1]);
  if (gameBoard[oi + 1]) {
    gameBoard[oi + 1][oj - 1] && neighbors.push(gameBoard[oi + 1][oj - 1]);
    gameBoard[oi + 1][oj] && neighbors.push(gameBoard[oi + 1][oj]);
    gameBoard[oi + 1][oj + 1] && neighbors.push(gameBoard[oi + 1][oj + 1]);
  }
  return neighbors;
};

const checkGameOver = () => {
  let numberOfRevealedBoxes = 0;
  loop2D((row, col) => {
    if (!gameBoard[row][col].isHidden()) numberOfRevealedBoxes++;
  });
  return numberOfRevealedBoxes === 90;
};

function Square(row, col) {
  this.row = row;
  this.col = col;
  this.mine = false;

  const minesweeperSquare = document.createElement('div');
  container.appendChild(minesweeperSquare);
  minesweeperSquare.className = 'block hidden';
  minesweeperSquare.onclick = () => {
    if (this.mine) {
      minesweeperSquare.classList.add('mine');
      minesweeperSquare.innerHTML = `💣`;
      confirm('You Lose. Play again?') && startGame();
    } else {
      this.reveal();
      checkGameOver() && confirm('You win. Play again?') && startGame();
    }
  };

  minesweeperSquare.oncontextmenu = e => {
    e.preventDefault();
    e.target.classList.add('mine');
  };

  this.setMine = () => {
    this.mine = true;
  };

  this.isHidden = () => minesweeperSquare.classList.contains('hidden');

  this.reveal = () => {
    if (!this.isHidden() || this.mine) return;
    minesweeperSquare.classList.remove('hidden');
    const neighbors = findNeighbors(this.row, this.col);
    const mines = neighbors.filter(e => e.mine).length;
    if (mines === 0) neighbors.forEach(e => e.reveal());
    else minesweeperSquare.innerText = mines;
  };
}

const setGameBoard = (mines = 0) => {
  if (mines === 10) return;
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  if (gameBoard[row][col].mine) return setGameBoard(mines);
  gameBoard[row][col].setMine();
  return setGameBoard(mines + 1);
};

const startGame = () => {
  gameBoard = [];
  container.innerHTML = '';
  loop2D((row, col) => {
    if (!gameBoard[row]) gameBoard.push([]);
    gameBoard[row][col] = new Square(row, col);
  });
  setGameBoard();
};

startGame();
