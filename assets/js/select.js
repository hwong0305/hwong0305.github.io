const container = document.getElementById('container');
const selectionBox = document.querySelector('.container__selection_cursor');
let buttonDown = false;
let startRow = -1;
let startCol = -1;
let endRow = -1;
let endCol = -1;
let originX = 0;
let originY = 0;
const blockMap = [];

const renderBlocks = (i = 0, j = 0) => {
  const startingRow = Math.min(startRow, endRow);
  const endingRow = Math.max(startRow, endRow);
  const startingCol = Math.min(startCol, endCol);
  const endingCol = Math.max(startCol, endCol);
  if (i === 4) return;
  if (j === 5) return renderBlocks(i + 1, 0);
  if (
    i >= startingRow &&
    j >= startingCol &&
    i <= endingRow &&
    j <= endingCol
  ) {
    blockMap[i][j].select();
  } else {
    blockMap[i][j].unselect();
  }
  return renderBlocks(i, j + 1);
};

function Block(row, col) {
  this.row = row;
  this.col = col;

  const blockElement = document.createElement('div');
  blockElement.className = 'block';
  blockElement.dataset.col = this.col;
  blockElement.dataset.row = this.row;
  container.appendChild(blockElement);

  this.select = () => {
    blockElement.className = 'block selected';
  };
  this.unselect = () => {
    blockElement.className = 'block';
  };
}

container.onmousedown = e => {
  if (!e.target.classList.contains('block')) return;
  startRow = e.target.dataset.row;
  startCol = e.target.dataset.col;
  buttonDown = true;
  selectionBox.classList.remove('hidden');
  originX = e.clientX;
  originY = e.clientY;
  selectionBox.style.width = 0;
  selectionBox.style.height = 0;
};

container.onmousemove = e => {
  if (buttonDown) {
    if (e.clientX > originX) {
      selectionBox.style.left = `${originX}px`;
      selectionBox.style.width = `${e.clientX - originX}px`;
    } else {
      selectionBox.style.width = `${originX - e.clientX}px`;
      selectionBox.style.left = `${e.clientX + 3}px`;
    }
    if (e.clientY > originY) {
      selectionBox.style.top = `${originY}px`;
      selectionBox.style.height = `${e.clientY - originY}px`;
    } else {
      selectionBox.style.height = `${originY - e.clientY}px`;
      selectionBox.style.top = `${e.clientY + 3}px`;
    }
    if (e.target.classList.contains('block')) {
      endRow = e.target.dataset.row;
      endCol = e.target.dataset.col;
      renderBlocks();
    }
  }
};

container.onmouseup = () => {
  buttonDown = false;
  selectionBox.classList.add('hidden');
};

container.onmouseleave = () => {
  buttonDown = false;
  selectionBox.className = 'container__selection_cursor hidden';
};

for (let i = 0; i < 4; i++) {
  blockMap.push([]);
  for (let j = 0; j < 5; j++) {
    blockMap[i][j] = new Block(i, j);
  }
}
