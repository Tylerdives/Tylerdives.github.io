// Pair Programming Game
// Tyler Boechler & Quincy Fast
// November 16th, 2018;
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//h iits quincy, i made the cloud, doesnt work as planned, i also made the sun and we both did the rain generation and displaying functions and class. Also prvided supports

//Making classes

class Raindrop  {
  constructor() {
    //All the stuff that defines a raindrop
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = 0.01;
    this.dy = random(4, 5);
    this.radius = random(3, 10);
    this.color = color(0, random(60), 255 - random(50), 255 - random(0, 200));
    this.touchingGround = false;
  }

  display() {
    //Displays each raindrop
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  fall() {
    //Animates the raindrop falling with wind effects
    if (this.y + this.dy >= collectionHeight + this.radius/2) {
      //If the riandrop is touching the bottom of the screen, it will reapear at the top
      this.touchingGround = true;
      this.y = random(-1000, -10);
      this.dy = 10;
    }
    else {
      this.touchingGround = false;
      this.dy += 0.1;
      this.y += this.dy;

      //Makes the wind effects
      if(random(100) > 30 && this.dx < 15) {
        //More likely to move right
        this.dx += random(0.1, 1);
      }
      else {
        this.dx -= random(0.1, 1);
      }

      //Regenerates the drop if they go off screen
      if (this.x > width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = width;
      }
      this.x += this.dx;
    }

  }
}

class Snowflake {
  //All the snowflake stuffs
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = random(-10, 10);
    this.dy = random(5, 6);
    this.size = random(20, 40);
    this.color = color(random(200, 255));
    this.touchingGround = false;
    this.shape = "*";
    //Very similar to raindrop
  }

  display() {
    //displays the snowflakes
    fill(this.color);
    textSize(this.size);
    text(this.shape, this.x, this.y);
  }

  fall() {
    //Does the animation of snow falling
    if (this.y + this.dy >= collectionHeight + 15) {
      //Same touching ground logic as rain
      this.touchingGround = true;
      this.y = random(0, -10);
      this.dy = random(5, 6);
      this.dx = random(-2, 2);
    }

    else {
      this.touchingGround = false;
      this.dy += 0.01;

      //Makes the snow look more sporatic
      if(random(100) > 50 && this.dx < 25) {
        this.dx++;
      }
      else if (this.dx >= -6){
        this.dx--;
      }

      if (this.x > width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = width;
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }
}


class LightningBolt {
  //Makes a lightning bolt on the screen
  constructor() {
    this.x = random(100, width - 100);
    this.y = -25;
    //devides the height of the screen into steps, where the bolt changes angles
    this.steps = ceil(random(15, 25));
    this.stepSize = ceil(height/this.steps);
    this.color = color(random(220, 255), random(220, 255), random(150, 220));
    this.size = floor(random(3, 7));
    //thickness
  }

  display() {
    //shows the lightning bolt in 1 step, and is repeated the number of total steps
    let nextY = this.y + this.stepSize;
    let nextX = this.x + random(-25, 25);

    strokeWeight(this.size);
    stroke(this.color);
    //Draws a line from the starting spot, then the next spot
    line(this.x, this.y, nextX, nextY);

    this.x = nextX;
    this.y = nextY;
  }
}


class Steam {
  //VERY similar to rain, but moves up
  constructor() {
    this.x = random(width);
    this.y = collectionHeight;
    this.dx = 0.01;
    this.dy = 5;
    this.radius = random(3, 8);
    this.color = color(180, 180, 190, 80);
    this.touchingGround = false;
    //I mean touching top, but to reuse functions, it had to be called this :(
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  fall() {
    //Had to be called fall for a function sorry :(
    this.y -= this.dy;
    //Same logic as rain except less wind
    if (this.y < 0 + this.radius * 2) {
      this.touchingGround = true;
    }
    else {
      this.touchingTop = false;
    }

    //winds
    if(random(100) > 50 && this.dx < 5) {
      this.dx += random(0.1, 1);
    }
    else if (this.dx >= -1) {
      this.dx -= random(0.1, 1);
    }

    if (this.x > width) {
      this.x = 0;
    }
    else if (this.x < 0) {
      this.x = width;
    }

    this.x += this.dx;

  }
}

class GuiButton {
  //Makes a gui button, (who would have thought!)
  constructor(type, image, x, selected) {
    //User gives the type of button, the image on it, it's position and if it's being selected first
    this.x = x;
    this.y = 0;
    this.size = 100;
    this.tint = color(75, 0, 75);
    //hovering/selected color
    this.image = image;
    this.weather = type;
    this.hovering = false;
    this.selected = selected;
  }

  display() {
    //displays the button and tint
    if(this.selected || this.hovering) {
      tint(this.tint);
    }

    else {
      noTint();
    }

    stroke(255, 0, 0);
    fill(255);
    rect(this.x, this.y, this.size, this.size);
    image(this.image, this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    noTint();
  }

  clicked() {
    if(mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size) {
      //If the mouse is inside the button's square
      this.hovering = true;
      if (mouseIsPressed) {
        //If they click, change the weather and set the button to be selected
        if(this.weather === "rain" && weather !== "rain" || this.weather === "thunder" && weather !== "thunder") {
          noRain = true;
          //If the weather of the button isn't corresponding to the precipitation, then make new precipitation
        }
        else if (this.weather === "snow" && weather !== "snow") {
          noSnow = true;
        }

        //Change the weather
        weather = this.weather;
        this.selected = true;
        noMusic = true;

      }
    }

    else {
      this.hovering = false;
    }
  }
}

// makes cloud cover
class Cloud {
  constructor(img) {
    //loacation of cloud and setting the img... size too
    this.x = 0;
    this.width = img.width * 3.25;
    this.height = img.height * 1.75;
    this.y = 0;
    this.img = img;

  }

  display() {
    //changing the tint of clouds depending on weather
    if(weather ==="sunny") {
      noTint();
      if(this.dx > 0){
        image(this.img,this.x,this.y,this.width,this.height);
      }
    }

    else {
      tint(100);
      if(this.dx > 0){
        image(this.img,this.x,this.y,this.width,this.height);
      }
    }

  }
}

//makes  a big mr sunshine
class Sun {
  constructor(){
    //characteristics of the sun
    this.x = width;
    this.y = 100;
    this.radius = 500;
    this.color = color(random(225, 255), random(225, 255), 0);
  }

  display(){
    //changing the color of sun depedning on weather
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.radius,this.radius);
  }

  move() {
    //moves the sun out when not sunny weather and moves in during sun
    if(this.x - this.radius/2 <= width && weather !== "sunny") {
      this.x += 2;
    }
    else if (this.x + this.radius/2 >= width && weather === "sunny") {
      this.x -= 2;
    }
  }


}


//here are some variables
let dropCounter = 0;
let collectionHeight;
let weather;
let noRain;
let noSnow;
let lightning;
let lightningRarity = 2;
let temp = 255;
let changeCooldown;
let sun;

//+ values are melted shows darker colors (+255 max)
//- values are frozen refers to lightness (0 min)
let heatLimit = 255;
let coldLimit = 0;



//sounds!
let noMusic;
let thunderSound;
let lightRain, heavyRain;
let sunnyBirds;
let christmasMusic;


//Images !
// let cloud;


let rainImage, snowImage, sunImage, thunderImage;

let rainButton, sunnyButton, snowButton, thunderButton;

let weatherLists = {
  rain: [],
  snow: [],
  steam: [],
  // cloud: [],
};

function preload() {
  thunderSound = loadSound("assets/thunder.wav");
  lightRain = loadSound("assets/lightRain.wav");
  heavyRain = loadSound("assets/heavyRain.wav");
  sunnyBirds = loadSound("assets/birds.mp3");
  christmasMusic = loadSound("assets/winterMusic.wav");

  rainImage = loadImage("assets/rainImage.JPG");
  snowImage = loadImage("assets/snowImage.JPG");
  sunImage = loadImage("assets/sunImage.JPG");
  thunderImage = loadImage("assets/thunderImage.jpg");

  // cloud = loadImage("assets/cloud.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
  noRain = true;
  noSnow = true;
  noMusic = true;

  rainButton = new GuiButton("rain", rainImage, 0, true);
  sunnyButton = new GuiButton("sunny", sunImage, 100, false);
  snowButton = new GuiButton("snow", snowImage, 200, false);
  thunderButton = new GuiButton("thunder", thunderImage, 300, false);
  sun = new Sun();

  // generatePrecipitation(weatherLists.cloud, 2, "cloud");
}

function draw() {
  if (weather === "rain") {
    rain();
  }
  else if (weather === "thunder") {
    thunder();
  }
  else if (weather === "snow") {
    snow();
  }
  else if (weather === "sunny") {
    sunny();
  }

  if (noMusic) {
    playMusic();
  }

  waterCollection();
  sun.move();
  sun.display();

  // displayClouds();

  displayGui();

}

function playMusic() {
  if (weather === "rain") {
    lightRain.stop();
    sunnyBirds.stop();
    heavyRain.stop();
    christmasMusic.stop();
    lightRain.setVolume(0.4);
    lightRain.loop();
  }

  else if (weather === "thunder") {
    lightRain.stop();
    sunnyBirds.stop();
    heavyRain.stop();
    christmasMusic.stop();
    heavyRain.setVolume(0.6);
    heavyRain.loop();
  }

  else if (weather === "sunny") {
    lightRain.stop();
    sunnyBirds.stop();
    heavyRain.stop();
    christmasMusic.stop();
    sunnyBirds.setVolume(0.4);
    sunnyBirds.loop();
  }

  else if (weather === "snow"){
    lightRain.stop();
    sunnyBirds.stop();
    heavyRain.stop();
    christmasMusic.stop();
    christmasMusic.setVolume(0.6);
    christmasMusic.loop();
  }

  noMusic = false;
}

function displayGui() {

  rainButton.display();
  snowButton.display();
  sunnyButton.display();
  thunderButton.display();

  rainButton.clicked();
  snowButton.clicked();
  sunnyButton.clicked();
  thunderButton.clicked();

  if(rainButton.selected && weather !== "rain") {
    rainButton.selected = false;
  }
  if(snowButton.selected && weather !== "snow") {
    snowButton.selected = false;
  }
  if(sunnyButton.selected && weather !== "sunny") {
    sunnyButton.selected = false;
  }
  if(thunderButton.selected && weather !== "thunder") {
    thunderButton.selected = false;
  }
  noTint();
  noStroke();
}

function displayClouds() {
  //Clouds aren't working atm
  for(let i = weatherLists.cloud.length-1; i > 0; i--) {
    // weatherLists.cloud[i].update();
    weatherLists.cloud[i].display();
    // if(weatherLists.cloud[i].xp <= 0 || weatherLists.cloud[i].x>=width){
    //   //delete this cloud -- already hidden
    //   weatherLists.cloud.splice(i,1);
    //   generatePrecipitation(weatherLists.cloud, 1, "cloud");
    // }
  }
}

function rain() {
  if (noRain) {
    generatePrecipitation(weatherLists.rain, 300, weather);
  }

  background(temp-80, temp-50, 254);
  displayPrecipitation(weatherLists.rain, "rain");
  displayPrecipitation(weatherLists.snow, "snow");
  displayPrecipitation(weatherLists.steam, 0);
}

function thunder() {
  if (noRain) {
    generatePrecipitation(weatherLists.rain, 450, weather);
  }

  if (random(300) > 300 - lightningRarity) {
    lightning = new LightningBolt();
    for(let i = 0; i < lightning.steps; i++) {
      lightning.display();
    }
    thunderSound.setVolume(random(0.5, 1));
    thunderSound.play();
  }


  else {
    background(temp-80, temp-50, 254);
    displayPrecipitation(weatherLists.rain, "thunder");
    displayPrecipitation(weatherLists.snow, "snow");
    displayPrecipitation(weatherLists.steam, 0);
  }
}

function snow() {
  background(temp-80, temp-50, 230);
  if(temp < 120) {
    background(temp-80, temp-50, 230-temp);
  }
  //Transition
  if (noSnow) {
    generatePrecipitation(weatherLists.snow, 300, weather);
  }

  displayPrecipitation(weatherLists.snow, "snow");
  displayPrecipitation(weatherLists.rain, "rain");
  displayPrecipitation(weatherLists.steam, 0);
}

function sunny() {
  background(temp-80, temp-50, 254);
  displayPrecipitation(weatherLists.snow, "snow");
  displayPrecipitation(weatherLists.rain, "rain");
  displayPrecipitation(weatherLists.steam, 0);
}


function displayPrecipitation(precip, type) {
  collectionHeight = height - dropCounter * 0.01;
  for (let i=precip.length-1; i>0; i--) {
    precip[i].fall();
    precip[i].display();
    touchingGround(i, precip, type);
  }
}


function touchingGround(i, precip, type) {
  if (precip[i].touchingGround) {
    // console.log("in here...");
    dropCounter++;
    if (weather !== type || precip.length > 400) {
      // console.log("here!");
      precip.splice(i, 1);
    }

  }
}

function generatePrecipitation(list, amount, type) {
  if (type === "rain" || type === "thunder") {
    for (let i = 0; i < amount; i++) {
      let someRain = new Raindrop();
      list.push(someRain);
    }
    noRain = false;
  }
  else if (type === "snow") {
    for (let i = 0; i < amount; i++) {
      let someSnowflake = new Snowflake();
      list.push(someSnowflake);
    }
    noSnow = false;
  }
  //Clouds aren't working properly, they don't show up and lag
  else if (type === "cloud") {
    for (let i = 0; i < amount; i++) {
      let someCloud = new Cloud(cloud);
      list.push(someCloud);
    }
  }
}





function waterCollection() {
  if (weather === "rain" || weather === "thunder" && floor(temp-1) < heatLimit) {
    if(temp < heatLimit - 80) {
      temp += 0.4;
    }
    else {
      temp -= 0.2;
    }
  }
  else if (weather === "sunny" && floor(temp) <= heatLimit) {
    temp += 0.3;
    if (dropCounter > 0 && temp > 200) {
      dropCounter -= 10;
      let steam = new Steam();
      weatherLists.steam.push(steam);
    }
  }

  else if (weather === "snow" && ceil(temp) >= coldLimit) {
    temp -= 0.5;
  }

  else {
    if(weather === "sunny") {
      temp --;
      temp = floor(temp);
    }
  }


  noStroke();
  if (temp < 125) {
    fill(255 - temp, 255 - temp, 255, 125);
  }
  else {
    fill(255 - temp, 255 - temp, 255, 255);
  }

  rect(0, collectionHeight, width,dropCounter * 0.01);
}


function keyTyped () {
  //Wind logic
  if (key === "a") {
    if (weather === "rain" || weather === "thunder") {
      for (let i=weatherLists.rain.length-1; i>0; i--) {
        if (weatherLists.rain[i].dx > -50) {
          weatherLists.rain[i].dx -= 5;
        }
      }
    }
    else if (weather === "snow") {
      for (let i=weatherLists.snow.length-1; i>0; i--) {
        if (weatherLists.snow[i].dx > -50) {
          weatherLists.snow[i].dx -= 5;
        }
      }
    }
  }
  else if (key === "d") {
    if (weather === "rain" || weather === "thunder") {
      for (let i=weatherLists.rain.length-1; i>0; i--) {
        if (weatherLists.rain[i].dx < 50) {
          weatherLists.rain[i].dx += 5;
        }
      }
    }
    else if (weather === "snow") {
      for (let i=weatherLists.snow.length-1; i>0; i--) {
        if (weatherLists.snow[i].dx < 50) {
          weatherLists.snow[i].dx += 5;
        }
      }
    }
  }
}
