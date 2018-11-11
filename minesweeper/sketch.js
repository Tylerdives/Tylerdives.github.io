// Grid based game (minesweeper)
// Tyler Boechler
// Oct 26th, 2018
//
// Extra for Experts:
// Floodfill(ish),

let grid;

let underGrid;

let cols = 25;
let rows = 25;

let cellSize;

const NUMBER_OFFSET = 0.09554140127388536;

let mine, flag, square, crossedMine, redMine;

let clickedMine;

let gameState = 1;

let totalMines = 0;
let theoreticalMines;

let mineX, mineY;

// let canvas;

function preload() {
  mine = loadImage("assets/minesweeperbomb.PNG");
  flag = loadImage("assets/minesweeperflag.PNG");
  square = loadImage("assets/minesweepersquare.PNG");
  crossedMine = loadImage("assets/minesweepercrossedbomb.PNG");
  redMine = loadImage("assets/minesweeperclickedbomb.PNG");
}

function setup() {
  if (windowHeight > windowWidth) {
    cellSize = floor(windowWidth / cols);
  }

  else {
    cellSize = floor(windowHeight / cols);
  }

  createCanvas(windowWidth, windowHeight);

  // canvas = createCanvas(windowWidth, windowHeight);

  // canvas.position(width/2 - cols/2 * 30, 0);

  grid = generateBlankGrid(cols, rows);

  underGrid = generateUnderGrid(cols, rows);
  theoreticalMines = totalMines;
  underGrid = fillNumbers(cols, rows);

  textSize(cellSize/1.9);
  textAlign(LEFT);

  clickedMine = false;


}

function draw() {
  if (gameState === 1) {
    background(0);
    drawGrid();
    displayMinesLeft();

    if(didWin()) {
      gameState = 2;
      textAlign(CENTER);
      textSize(50);
      fill(0, 255, 0);
      text("YOU WIN!", width/1.8, height/3);
    }

    if (clickedMine) {
      deadAnimation();
    }
  }

  //Win
  else if(gameState === 2){
    textSize(40);
    fill(0, 255, 0);
    text("Congradulations! Press 'r' or shake to restart", width/1.5, height/1.2);
  }
  //GameOver
  else if (gameState === 3) {
    textSize(50);
    textStyle(BOLD);
    fill(255, 0, 0);
    text("Game over!, press 'r' or shake to restart!", width/5, height/2);
  }



}

function displayMinesLeft() {
  fill(255, 0, 0);
  textSize(40);
  text(theoreticalMines.toString(), width/1.5, height/1.5);
  textSize(cellSize/1.9);
}

function resetGame() {
  totalMines = 0;
  grid = generateBlankGrid(cols, rows);

  underGrid = generateUnderGrid(cols, rows);
  theoreticalMines = totalMines;
  underGrid = fillNumbers(cols, rows);

  textSize(cellSize/1.9);
  textStyle(NORMAL);
  textAlign(LEFT);

  clickedMine = false;
  gameState = 1;
}

function keyTyped() {
  if (key === "r") {
    resetGame();
  }
}

function deviceShaken() {
  resetGame();
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
      //mines will be a x, not a mine will be a -1 for now
      if (random(100) <= 16) {
        startUnderGrid[y].push("x");
        totalMines++;
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




function mousePressed() {
  if (mouseButton === LEFT) {
    updateGrid();
  }
  else if (mouseButton === RIGHT) {
    drawFlag();
  }
  else {
    updateGrid();
  }
}


function updateGrid() {
  let xSquare = floor(mouseX/cellSize);
  let ySquare = floor(mouseY/cellSize);

  if (grid[ySquare][xSquare] !== "f") {
    grid[ySquare][xSquare] = underGrid[ySquare][xSquare];
  }

  mineX = xSquare;
  mineY = ySquare;

}

function drawFlag() {
  let xSquare = floor(mouseX/cellSize);
  let ySquare = floor(mouseY/cellSize);

  if (grid[ySquare][xSquare] === -1) {
    grid[ySquare][xSquare] = "f";
    theoreticalMines--;
  }
  else if (grid[ySquare][xSquare] === "f"){
    grid[ySquare][xSquare] = -1;
    theoreticalMines++;
  }

}


function drawGrid() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let drawRect = true;
      let number;

      if (grid[y][x] === -1) {
        image(square, x * cellSize, y * cellSize, cellSize, cellSize);
        drawRect = false;
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
        fill(255);
        drawRect = false;
        clickedMine = true;
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        image(mine, x * cellSize + 1, y * cellSize + 1, cellSize-1, cellSize-1);

        if (x === mineX && y === mineY) {
          image(redMine, x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }

      else if (grid[y][x] === "xf") {
        fill(255);
        drawRect = false;
        clickedMine = true;
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        image(crossedMine, x * cellSize + 1, y * cellSize + 1, cellSize-1, cellSize-1);

      }

      else if (grid[y][x] === "f") {
        drawRect = false;
        image(flag, x * cellSize, y * cellSize, cellSize, cellSize);

      }

      if (drawRect) {
        stroke(159);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }

      textStyle(NORMAL);
      fill(0);
      if (number === 1) {
        fill("blue");
        text("1", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 2) {
        fill("green");
        text("2", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 3) {
        fill("red");
        text("3", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 4) {
        fill(0, 0, 125);
        textStyle(BOLD);
        text("4", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 5) {
        fill(130, 0, 10);
        textStyle(BOLD);
        text("5", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 6) {
        textStyle(BOLD);
        fill(126, 177, 186);
        text("6", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 7) {
        textStyle(BOLD);
        fill(0);
        text("7", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

      else if (number === 8) {
        textStyle(BOLD);
        fill(200);
        text("8", x * cellSize + cellSize/2 - cellSize * NUMBER_OFFSET, y * cellSize + cellSize/2 + cellSize * NUMBER_OFFSET);
      }

    }
  }

}



function deadAnimation() {
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      if(underGrid[i][j] === "x") {
        if (grid[i][j] !== "f") {
          grid[i][j] = underGrid[i][j];
        }
        else {
          grid[i][j] = "xf";
        }

        gameState = 3;
      }
    }
  }
  drawGrid();
}

function openSquares(x, y) {
  for(let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows){
        if (underGrid[y+j][x+i] !== "x" && grid[y+j][x+i] !== "f") {
          //Does a flag act as a mine with fill?
          grid[y+j][x+i] = underGrid[y+j][x+i];
          // openSquares(x+i, y+j);
        }
      }
    }
  }
}

function didWin() {
  let win = 0;
  let checkMines = totalMines;
  for(let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] !== -1 && win !== false){
        if (grid[i][j] === "f" && underGrid[i][j] === "x") {
          checkMines --;
        }
      }

      else {
        win = false;
      }

    }
  }
  if(checkMines === 0 && win === 0) {
    win = true;
  }
  else {
    win = false;
  }

  return win;
}
