// Grid based game (minesweeper)
// Tyler Boechler
// Oct 26th, 2018
//
// Extra for Experts:
//

let grid;

let underGrid;

let cols = 20;
let rows = 20;

let cellSize;

let numberOffset = 0.09554140127388536;

function setup() {
  if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
    cellSize = floor(windowWidth / cols);
  }
  else {
    createCanvas(windowHeight, windowHeight);
    cellSize = floor(windowHeight / cols);
  }

  grid = generateBlankGrid(cols, rows);

  underGrid = generateUnderGrid(cols, rows);
  underGrid = fillNumbers(cols, rows);

  textSize(cellSize/2);
}

function draw() {
  background(255);
  drawGrid();
}


function generateBlankGrid(cols, rows) {
  let startGrid = [];
  for (let y = 0; y < cols; y++) {
    startGrid.push([]);
    for (let x = 0; x < rows; x++) {
      startGrid[y].push(-1);
    }
  }
  return startGrid;
}


function generateUnderGrid(cols, rows) {
  let startUnderGrid = [];
  for (let y = 0; y < cols; y++) {
    startUnderGrid.push([]);
    for (let x = 0; x < rows; x++) {
      //mines will be a -1, not a mine will be a 0 for now
      if (random(100) < 10) {
        startUnderGrid[y].push("x");
      }
      else {
        startUnderGrid[y].push(-1);
      }

    }
  }
  return startUnderGrid;
}

function fillNumbers() {
  let numberedGrid = [];
  let notMine;
  for (let y = 0; y < cols; y++) {
    numberedGrid.push([]);
    for (let x = 0; x < rows; x++) {

      let minesAround = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

          if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows) {
            if (underGrid[y][x] === -1) {
              notMine = true;
              if (underGrid[y+j][x+i] === "x") {
                minesAround++;
              }

            }

            else {
              notMine = false;
            }

          }
        }
      }
      if (notMine) {
        numberedGrid[y].push(minesAround);
      }
      else {
        numberedGrid[y].push("x");
      }
    }
  }
  return numberedGrid;
}

function updateGrid() {
  let xSquare = floor(mouseX/cellSize);
  let ySquare = floor(mouseY/cellSize);

  grid[ySquare][xSquare] = underGrid[ySquare][xSquare];
}

function mouseClicked() {
  updateGrid();
}

function drawGrid() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let number;

      if (grid[y][x] === -1) {
        fill(100);
      }

      else if (grid[y][x] === 0) {
        fill(255);
        openSquares(x, y);
      }

      else if (grid[y][x] === 1) {
        number = 1;
        fill(255);
      }

      else if (grid[y][x] === 2) {
        number = 2;
        fill(255);
      }

      else if (grid[y][x] === 3) {
        number = 3;
        fill(255);
      }

      else if (grid[y][x] === "x") {
        fill(0);
      }


      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      fill(0);
      if (number === 1) {
        text("1", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 2) {
        text("2", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 3) {
        text("3", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 4) {
        text("4", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 5) {
        text("5", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 6) {
        text("6", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 7) {
        text("7", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 8) {
        text("8", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

    }
  }
}

function openSquares(x, y) {
  for(let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if(x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows){
        if (underGrid[y+j][x+i] !== "x") {
          grid[y+j][x+i] = underGrid[y+j][x+i];
          // openSquares(x+i, y+j);
        }
      }
    }
  }
}
