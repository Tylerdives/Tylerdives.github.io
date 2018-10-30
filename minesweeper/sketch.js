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

  textSize(cellSize/1.9);
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
      if (random(100) <= 16) {
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

function mousePressed() {
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

      else if (grid[y][x] === 4) {
        number = 4;
        fill(255);
      }

      else if (grid[y][x] === 5) {
        number = 5;
        fill(255);
      }

      else if (grid[y][x] === 6) {
        number = 6;
        fill(255);
      }

      else if (grid[y][x] === 7) {
        number = 7;
        fill(255);
      }

      else if (grid[y][x] === 8) {
        number = 8;
        fill(255);
      }

      else if (grid[y][x] === "x") {
        fill(0);
      }


      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      textStyle(NORMAL);
      fill(0);
      if (number === 1) {
        fill("blue");
        text("1", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 2) {
        fill("green");
        text("2", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 3) {
        fill("red");
        text("3", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 4) {
        fill(0, 0, 125);
        textStyle(BOLD);
        text("4", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 5) {
        fill(130, 0, 10);
        textStyle(BOLD);
        text("5", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 6) {
        textStyle(BOLD);
        fill(126, 177, 186);
        text("6", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 7) {
        textStyle(BOLD);
        fill(0);
        text("7", x * cellSize + cellSize/2 - cellSize * numberOffset, y * cellSize + cellSize/2 + cellSize * numberOffset);
      }

      else if (number === 8) {
        textStyle(BOLD);
        fill(200);
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
