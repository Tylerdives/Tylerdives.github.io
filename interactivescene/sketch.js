// Interactive scene
// Tyler Boechler
//
//
// Extra for Experts:
// - timers, sounds, collide2d, millis(), text
//--------------------------------------------------

//All dot coordinates and movement variables
let playerX, playerY;
let dx, dy;

//Music and sounds
let gameMusic;
let circleSound;
let player1winSound;
let bounceSound;

//The backdrop
let backgroundImage;

//A variable that determines if the game is PvP or PvC and starts the games
let numberOfPlayers;

//These time variables are used for the trap animation of drawing the circle
let initialTime;
let finalTime;
let cooldown;

//A varable that makes the circle animation happen
let playerClicked;

//Variables for the starting buttons position and colour changes
let pvcColourChange, pvpColourChange;
let startButtonsOffset;
let buttonCoordinates;

//Starting position and detection for the difficulty buttons
let levelButtonOffet;
let easyBox, medBox, hardBox, extremeBox;
let levelDifficulty;
//How big the trap gets depending on the difficulty
let trapSizeIncrease;


function preload(){
  //My music and sounds loaded
  gameMusic = loadSound("assets/catchyGameBeat.flac");
  bounceSound = loadSound("assets/bounce.wav");
  player1winSound = loadSound("assets/player1wins.wav");
  circleSound = loadSound("assets/trapclick.wav");
  //Loading the background image
  backgroundImage = loadImage("assets/cloudbackground.JPG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //sets the dot's x and y and speed
  playerX = random(5, 10);
  playerY = random(5, 10);
  dx = random(15, 25);
  dy = random(15, 25);

  numberOfPlayers = 0;

  //sets the volume of the music/sounds
  bounceSound.setVolume(0.30);
  gameMusic.setVolume(0.40);
  circleSound.setVolume(0.55);

  finalTime = 0;
  playerClicked = false;
  cooldown = false;
  //sets my detection variables to false/0
  pvcColourChange = false;
  pvpColourChange = false;
  //Giving my offset values, values
  startButtonsOffset = 150;
  buttonCoordinates = width/2 - startButtonsOffset;


  levelButtonOffet = height - 200;
  //Starts at easy difficulty as default
  trapSizeIncrease = 25;
  //None of the buttons are selected except for Easy
  easyBox = true;
  medBox = false;
  hardBox = false;
  extremeBox = false;
  levelDifficulty = "EASY";

  //Starts the music
  gameMusic.loop();
}

function draw() {
  //Draws the image in the background first
  image(backgroundImage, 0, 0, width, height);
  //If the player hasn't chosen the gamemode yet, the player count is at none, which makes the starting screen
  if (numberOfPlayers === 0) {
    strokeWeight(2);

    //If the mouse is hovering over a box, then that box will change colour, each box has a corresponding variable-
    //-That will come back as true when the mouse is over it and change it's colour here
    //PVC button
    if (pvcColourChange) {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    //Draws the button with the selected fill
    rect(buttonCoordinates, 400, 300, 100);

    //PVP button
    if (pvpColourChange) {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    //Draws the button with it's fill
    rect(buttonCoordinates, 550, 300, 100);

    //Thicker edges for this button for style
    strokeWeight(5);

    //If a player selects/hovers button for difficulty, it will stay a different colour
    //Easy button logic
    if (easyBox || levelDifficulty === "EASY") {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    //Drawx EASY button
    rect(100, levelButtonOffet, 110, 60);

    //Medium button logic
    if (medBox || levelDifficulty === "MEDIUM") {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    //Draws MEDIUM button
    rect(220, levelButtonOffet, 110, 60);

    //HARD button logic
    if (hardBox || levelDifficulty === "HARD") {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    //draws HARD button
    rect(340, levelButtonOffet, 110, 60);

    //Extreme button logic
    if (extremeBox || levelDifficulty === "EXTREME") {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    //draws EXTREME button
    rect(width - 360, levelButtonOffet, 110, 60);

    //Changes the colour to black to put text in the boxes
    fill(0);
    textStyle(NORMAL);
    //No bold from later in the loop
    textAlign(CENTER);
    textSize(20);

    //Shows easy, medium, or hard in the box
    text("EASY", 155, levelButtonOffet + 40);
    text("MEDIUM", 275, levelButtonOffet + 40);
    text("HARD", 395, levelButtonOffet + 40);
    text("EXTREME", width - 305, levelButtonOffet + 40);
    //Displays the mode of the game in the box
    text("Player vs Computer", buttonCoordinates, 440, 300, 100);
    text("Player vs Player", buttonCoordinates, 590, 300, 100);

    //Changes the text to the instructions text
    textStyle(BOLD);
    textSize(20);
    fill(0, 20, 0);

    //text of the game
    text("In player vs computer, the dot flies around the screen, and you have to try to trap it by clicking!", width/2, 120);
    text("In player vs player mode, one person controlls the dot, and the other tries to trap the the other player.", width/2, 160);
    text("The dot's controls are WASD for movement and SPACE for a random direction, but, every time you hit space, the trap gets bigger!", width/2, 200);
    text("When trying to catch the dot, move the mouse over the dot, then click to trap it, if you miss, the dot will move in a new pattern!", width/2, 240);
    text("The difficulty relates to the trap size. Good Luck!", width/2, 310);
    text("By: Tyler B.", width/2, 360);

    textSize(55);
    //heading size
    text("CLICK THE DOT", width/2, 60);

    //Checks if the player is hovering/clicking on the PVC box
    if (collidePointRect(mouseX, mouseY, buttonCoordinates, 400, 300, 100)) {
      pvcColourChange = true;
      if (mouseIsPressed) {
        numberOfPlayers = 1;
        //Starts the game in the PVC mode
      }
    }
    else {
      pvcColourChange = false;
    }

    //Checks if the player is hovering/clicking the PVP box
    if (collidePointRect(mouseX, mouseY, buttonCoordinates, 550, 300, 100)) {
      pvpColourChange = true;
      if (mouseIsPressed) {
        numberOfPlayers = 2;
        //Starts the game in the PVP mode
      }
    }
    else {
      pvpColourChange = false;
    }
    //Difficulty box detection of the mouseButton
    //EASY
    if (collidePointRect(mouseX, mouseY, 100, levelButtonOffet, 110, 60)) {
      easyBox = true;
      if (mouseIsPressed) {
        levelDifficulty = "EASY"
        trapSizeIncrease = 25;
      }
    }
    else {
      easyBox = false;
    }
    //MEDIUM
    if (collidePointRect(mouseX, mouseY, 220, levelButtonOffet, 110, 60)) {
      medBox = true;
      if (mouseIsPressed) {
        levelDifficulty = "MEDIUM"
        trapSizeIncrease = 10;
      }
    }
    else {
      medBox = false;
    }
    //HARD
    if (collidePointRect(mouseX, mouseY, 340, levelButtonOffet, 110, 60)) {
      hardBox = true;
      if (mouseIsPressed) {
        levelDifficulty = "HARD";
        trapSizeIncrease = -5;
      }
    }
    else {
      hardBox = false;
    }

    if (collidePointRect(mouseX, mouseY, width - 360, levelButtonOffet, 110, 60)) {
      extremeBox = true;
      if (mouseIsPressed) {
        levelDifficulty = "EXTREME";
        trapSizeIncrease = -20;
      }
    }
    else {
      extremeBox = false;
    }

  }

  else {
    strokeWeight(1);
    cooldown = true;

    moveComputer();

    if (playerClicked && (finalTime - initialTime) <= 1000) {
      fill(255, 90, 70);
      ellipse(mouseX, mouseY, 40 + trapSizeIncrease, 40 + trapSizeIncrease);
      finalTime = millis();
      cooldown = true;
    }
    else {
      playerClicked = false;
      finalTime = 100;
      cooldown = false;
    }

      if (dx <= 5 && dx >= -5 && numberOfPlayers === 1) {
        movePlayerRandomly();
      }
  }
}


function movePlayerRandomly(){
  dx = random(-25, 25);
  dy = random(-25, 25);
}

function moveComputer(){
  fill(35, 252, 57);
  ellipse(playerX, playerY, 15, 15)
  if (playerX + 7.5 > width || playerX < 0) {
    bounceSound.play()
    dx = dx * -1;
  }
  if (playerY + 7.5 > height || playerY < 0) {
    bounceSound.play()
    dy = dy * -1;
  }

  playerX += dx;
  playerY += dy;
}

function keyPressed(){
  //Moves the dot aka player when someone plays 2 player mode
  if (numberOfPlayers === 2) {
    if (key === "w" || key === "W") {
      dx = 3;
      dy = random(-20, -28);
    }

    else if (key === "s" || key === "S") {
      dx = 3;
      dy = random(20, 28);
    }

    else if (key === "a" || key === "A") {
      dx = random(-20, -28);
      dy = 3;
    }

    else if (key === "d" || key === "D") {
      dx = random(20, 28);
      dy = 3;
    }

    if (keyCode === 32) {
      movePlayerRandomly();
      trapSizeIncrease += 2;
    }
  }
}

  function mouseClicked(){
    if (numberOfPlayers === 1 || numberOfPlayers === 2) {
      if (!cooldown) {
        circleSound.play();
        initialTime = millis();
        playerClicked = true;
        if(collidePointCircle(playerX, playerY, mouseX, mouseY, 80 + (trapSizeIncrease * 2))) {
          player1winSound.play();
          finalTime = 0;
          initialTime = millis();
          numberOfPlayers = 0;
          if (numberOfPlayers === 2) {
            if (levelDifficulty === "EASY") {
              trapSizeIncrease = 25;
            }
            if (levelDifficulty === "MEDIUM") {
              trapSizeIncrease = 10;
            }
            if (levelDifficulty === "HARD") {
              trapSizeIncrease = -5;
            }
            if (levelDifficulty === "EXTREME") {
              trapSizeIncrease = -20;
            }
          }
        }
        movePlayerRandomly();
      }
    }
  }
