// Pair Programming Game
// Tyler Boechler & Quincy Fast
// November 16th, 2018;
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//p5.gui

class Raindrop  {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = 0.01;
    this.dy = random(5, 6);
    this.radius = random(3, 12);
    this.color = color(0, random(60), 255 - random(50), 255 - random(100, 200));
    this.touchingGround = false;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

    // fill(0);
    // textSize(60);
    // let messages = ["hey", "hi", "hola", "hello"];
    // text(random("hey"), this.x, this.y);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight + this.radius/2) {
      this.touchingGround = true;
      this.y = random(-1000, -10);
      this.dy = 10;
    }
    else {
      this.touchingGround = false;
      this.dy += 0.2;
      // this.x += this.dx;
      this.y += this.dy;

      if(random(100) > 30 && this.dx < 5) {
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

}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = random(-10, 10);
    this.dy = random(5, 6);
    this.size = random(20, 40);
    this.color = color(random(200, 255));
    this.touchingGround = false;
    this.shape = "*";
  }

  display() {
    fill(this.color);
    textSize(this.size);
    text(this.shape, this.x, this.y);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight + this.size) {
      this.touchingGround = true;
      this.y = random(0, -10);
      this.dy = random(5, 6);
      this.dx = random(-2, 2);
    }
    else {
      this.touchingGround = false;
      this.dy += 0.01;
      if(random(100) > 50 && this.dx < 7) {
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
  constructor() {
    this.x = random(100, width - 100);
    this.y = -25;
    this.steps = ceil(random(15, 25));
    this.stepSize = ceil(height/this.steps);
    this.color = color(random(220, 255), random(220, 255), random(150, 220));
    this.size = floor(random(3, 7));
  }

  display() {
    // stroke(5);
    let nextY = this.y + this.stepSize;
    let nextX = this.x + random(-25, 25);
    strokeWeight(this.size);
    stroke(this.color);
    line(this.x, this.y, nextX, nextY);

    this.x = nextX;
    this.y = nextY;
  }
}

// let weatherLists.weather = [];

let dropCounter = 0;
let snowCounter = 0;
let collectionHeight, snowCollectionHeight;
// let buffer = 31;

let weather;
let noRain;
let noSnow;
let lightning;
let lightningRarity = 3;
const TEMP_TO_COLOR = 6.375;
let temp = 255;
let changeCooldown;

//+ values are melted shows darker colors (+255 max)
//- values are frozen refers to lightness (0 min)
let heatLimit = 255;
let coldLimit = 0;

let weatherLists = {
  rain: [],
  snow: [],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
  noRain = true;
  noSnow = true;
  changeCooldown = 2000;
}

function draw() {

  if (weather === "rain") {
    if (noRain) {
      generatePrecipitation(weatherLists.rain, noRain);
    }

    if (random(300) > 300 - lightningRarity) {
      lightning = new LightningBolt();
      for(let i = 0; i < lightning.steps; i++) {
        lightning.display();
      }
    }
    else if (random(500) > 499) {
      background(255);
    }


    else {
      background(16, 39, 102);
      displayPrecipitation(weatherLists.rain, "rain");
      displayPrecipitation(weatherLists.snow, "snow");
    }

    waterCollection();
    snowCollection();
  }

  else if (weather === "snow") {
    background(46, 79, 132);
    //Transition
    if (noSnow) {
      generatePrecipitation(weatherLists.snow, noSnow);
    }

    displayPrecipitation(weatherLists.snow, "snow");
    displayPrecipitation(weatherLists.rain, "rain");
    waterCollection();
    snowCollection();
  }

  else if (weather === "sunny") {
    background(166, 199, 252);
    displayPrecipitation(weatherLists.snow, "snow");
    displayPrecipitation(weatherLists.rain, "rain");
    waterCollection();
  }
}

// function mousePressed() {
//   //rain
//   generateRain();

// }

function mousePressed() {
  if (millis() > changeCooldown) {
    if (weather === "rain") {
      noSnow = true;
      weather === "snow";
      changeCooldown = millis() + 2000;
    }
    else if (weather === "snow") {
      weather === "sunny";
      changeCooldown = millis() + 2000;
    }
    else if (weather === "sunny"){
      noRain = true;
      weather === "rain";
      changeCooldown = millis() + 2000;
    }
  }
}

function displayPrecipitation(precip, type) {
  collectionHeight = height - dropCounter * 0.02;
  snowCollectionHeight = height - snowCounter * 0.05 + collectionHeight;
  for (let i=precip.length-1; i>0; i--) {
    precip[i].fall();
    precip[i].display();
    touchingGround(i, precip, type);
  }
}


function touchingGround(i, precip, type) {
  if (precip[i].touchingGround) {
    // console.log("in here...");
    if (type === "rain") {
      dropCounter++;
    }
    else if (type === "snow") {
      snowCounter++;
    }
    if (weather !== type) {
      // console.log("here!");
      precip.splice(i, 1);
    }

  }
}

function generatePrecipitation(list, type) {
  if (weather === "rain") {
    for (let i = 0; i < 400; i++) {
      let somePrecip = new Raindrop();
      list.push(somePrecip);
    }
    noRain = false;
  }
  else if (weather === "snow") {
    for (let i = 0; i < 400; i++) {
      let somePrecip = new Snowflake();
      list.push(somePrecip);
    }
    noSnow = false;
  }
}





function waterCollection() {
  if (weather === "rain" && temp < heatLimit) {
    temp += 0.1;
  }
  else if (weather === "sunny" && floor(temp) <= heatLimit) {
    temp += 0.2;
    if (dropCounter > 0) {
      dropCounter -= 10;
    }
  }

  else if (weather === "snow" && temp > coldLimit) {
    if (temp > coldLimit) {
      temp -= 0.5;
    }

  }
  else {
    temp--;
    temp = floor(temp);
  }

  noStroke();
  if (weather === "snow" && temp < 125) {
    fill(255 - temp, 255 - temp, 255, temp + 90);
  }
  else {
    fill(255 - temp, 255 - temp, 255, 255);
  }

  rect(0, collectionHeight, width,dropCounter * 0.02);
}



function snowCollection() {
  fill(255, 0 , 0);
  rect(0, snowCollectionHeight, width, snowCounter * 0.05);
}
