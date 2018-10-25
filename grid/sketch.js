
let cellSize;
let rows = 40;
let cols = 40;
let grid;

function setup() {
  if(windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }


  cellSize = width / cols;
  grid = createRandom2dArray(cols, rows);
}

function draw() {
  frameRate(10);
  background(255);
  displayGrid();
  if (keyIsPressed) {
    if (key === " ") {
      update();
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(255);
      }
      else {
        fill(0);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createRandom2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        randomGrid[y].push(0);
      }
      else {
        randomGrid[y].push(1);
      }
    }
  }
  return randomGrid;
}

function keyTyped() {
  if (key === "r") {
    grid = createRandom2dArray();
  }
  if (key === "c") {
    resetGrid();
  }
  // else if (key === " ") {
  //   update();
  // }
}

function update() {
  let nextTurn = [];
  for (let i = 0; i < rows; i++) {
    nextTurn[i] = [];
  }

  //loop throught the grid
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {

      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x+i >= 0 && x+i < cols && y+j >= 0 && y+j < rows) {
            neighbours += grid[y + j][x + i];
          }
        }
      }


      neighbours -= grid[y][x];

      //apply the rules
      if (grid[y][x] === 1) {//ALIVE
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) {//DEAD
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

    }
  }

  grid = nextTurn;
}

function resetGrid() {
  for(let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      grid[y][x] = 0;
    }
  }
}

function mousePressed() {
  let xSquare = floor(mouseX/cellSize);
  let ySquare = floor(mouseY/cellSize);

  if (grid[ySquare][xSquare] === 0) {
    grid[ySquare][xSquare] = 1;
  }
  else if (grid[ySquare][xSquare] === 1) {
    grid[ySquare][xSquare] = 0;
  }

}
