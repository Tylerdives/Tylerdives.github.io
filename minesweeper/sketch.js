// Grid based game (minesweeper)
// Tyler Boechler
// Oct 26th, 2018
//
// Extra for Experts:
//

let grid;

let underGrid;

let cols = 5;
let rows = 5;

let cellSize;

function setup() {
  if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
    cellSize = windowWidth / cols - 1;
  }
  else {
    createCanvas(windowHeight, windowHeight);
    cellSize = windowHeight / cols - 1;
  }

  grid = generateBlankGrid(cols, rows);

  underGrid = generateUnderGrid(cols, rows);
  // underGrid = fillNumbers(cols, rows);
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
      startGrid[y].push(0);
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
        startUnderGrid[y].push(-1);
      }
      else {
        startUnderGrid[y].push(0);
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
            if (underGrid[y][x] === 0) {
              notMine = true;
              if (underGrid[y+j][x+i] === -1) {
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
        numberedGrid[y].push(-1);
      }
    }
  }
  return numberedGrid;
}

// function updateGrid() {
//   let xSquare = floor(mouseX/cellSize);
//   let ySquare = floor(mouseY/cellSize);
//
//   grid[ySquare][xSquare] = underGrid[ySquare][xSquare];
// }



function drawGrid() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {

      if (grid[y][x] === 0) {
        fill(225);
      }


      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}


function mouseClicked() {

}
