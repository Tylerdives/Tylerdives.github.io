
let cellSize;
let rows = 10;
let cols = 10;
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createCanvas(600, 600);
  cellSize = width / cols;
  grid = createRandom2dArray(cols, rows);
}

function draw() {

  background(255);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === false) {
        fill(0);
      }
      else {
        fill(255);
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
        randomGrid[y].push(false);
      }
      else {
        randomGrid[y].push(true);
      }
    }
  }
  return randomGrid;
}

function mouseClicked() {
  let xSquare = floor(mouseX/cellSize);
  let ySquare = floor(mouseY/cellSize);

  grid[ySquare][xSquare] = !grid[ySquare][xSquare];
}
