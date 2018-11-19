// Pair Programming Game
// Tyler Boechler & Quincy Fast
// November 16th, 2018;
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Raindrop  {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = 0.01;
    this.dy = 8;
    this.radius = random(3, 7);
    this.color = color(0, random(60), 255 - random(50), 255 - random(150));
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
      this.dy = 8;
    }
    else {
      this.dy += 0.2;
      // this.x += this.dx;
      this.y += this.dy;
    }

  }

}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = 0;
    this.dy = 1;
    this.size = random(40, 60);
    this.color = color(random(200, 255));
    this.touchingGround = false;
    this.shape = ["x", "*", "+", "#"];
  }

  display() {
    fill(this.color);
    textSize(this.size);
    text(random(this.shape), this.x, this.y);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight + this.size) {
      this.y = random(-1000, -10);
      this.dy = 1;
    }
    this.dy += 0.001;
    this.y += this.dy;
  }


}

// let weatherLists.weather = [];

let dropCounter = 0;
let collectionHeight;
// let buffer = 31;

let weather;
let noRain;
let noSnow;

let weatherLists = {
  rain: [],
  noRain: true,
  snow: [],
  noSnow: true,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
  // noRain = true;
}

function draw() {
  background(0);
  if (weather === "rain") {
    if (weatherLists.noRain) {
      generatePrecipitation(weatherLists.rain, weatherLists.noRain);
    }
    displayPrecipitation(weatherLists.rain);
    // displayPrecipitation(weatherLists.snow);
  }

  else if (weather === "snow") {
    if (weatherLists.noSnow) {
      generatePrecipitation(weatherLists.snow, weatherLists.noSnow);
    }

    displayPrecipitation(weatherLists.snow);
    displayPrecipitation(weatherLists.rain);
    // displaySnow();
  }
}

// function mousePressed() {
//   //rain
//   generateRain();
// }

function displayPrecipitation(precip) {
  collectionHeight = height - dropCounter * 0.0001;
  for (let i=precip.length-1; i>0; i--) {
    precip[i].fall();
    precip[i].display();
    touchingGround(i, precip);
  }

  elementalCollection("rain");
}

function touchingGround(i, precip) {
  if (precip[i].touchingGround) {
    dropCounter++;

    // weatherLists.weather.splice(i, 1);
  }
}

function generatePrecipitation(precip, noPrecip) {
  for (let i = 0; i < 400; i++) {
    let somePrecip = new Raindrop();
    precip.push(somePrecip);
  }
  noPrecip = false;
}



function elementalCollection(element) {
  if (element === "rain") {
    fill(0, 0, 255, 150);
  }

  rect(0, collectionHeight, width, dropCounter * 0.0001);
}
