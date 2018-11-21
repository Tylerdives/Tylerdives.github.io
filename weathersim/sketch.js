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
    this.dy = 6;
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
      this.dy = 10;
    }
    else {
      this.touchingGround = false;
      this.dy += 0.2;
      // this.x += this.dx;
      this.y += this.dy;

      // if(random(100) > 50 && this.dx < 10) {
      //   this.dx++;
      // }
      // if (this.x > width) {
      //   this.x = 0;
      // }
      // else if (this.x < 0) {
      //   this.x = width;
      // }
      // this.x += this.dx;
    }

  }

}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = random(-10, 10);
    this.dy = 6;
    this.size = random(20, 60);
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
      this.dy = 6;
    }
    else {
      this.touchingGround = false;
      this.dy += 0.01;
      if(random(100) > 50 && this.dx < 10) {
        this.dx++;
      }
      else {
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

// let weatherLists.weather = [];

let dropCounter = 0;
let collectionHeight;
// let buffer = 31;

let weather;
let noRain;
let noSnow;

let weatherLists = {
  rain: [],
  snow: [],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "snow";
  noRain = true;
  noSnow = true;
}

function draw() {
  background(0);
  if (weather === "rain") {
    if (noRain) {
      generatePrecipitation(weatherLists.rain, noRain);
    }
    displayPrecipitation(weatherLists.rain, "rain");
    displayPrecipitation(weatherLists.snow, "snow");
  }

  else if (weather === "snow") {
    if (noSnow) {
      generatePrecipitation(weatherLists.snow, noSnow);

    }
    displayPrecipitation(weatherLists.snow, "snow");
    displayPrecipitation(weatherLists.rain, "rain");
  }
}

// function mousePressed() {
//   //rain
//   generateRain();
// }

function displayPrecipitation(precip, type) {
  collectionHeight = height - dropCounter * 0.0001;
  for (let i=precip.length-1; i>0; i--) {
    precip[i].fall();
    precip[i].display();
    touchingGround(i, precip, type);
  }

  elementalCollection(weather);

}


function touchingGround(i, precip, type) {
  if (precip[i].touchingGround) {
    // console.log("in here...");
    dropCounter++;
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



function elementalCollection(element) {
  if (element === "rain") {
    fill(0, 0, 255, 150);
  }
  else if (element === "snow") {
    fill(200, 200, 255, 125);
  }

  rect(0, collectionHeight, width, dropCounter * 0.0001);
}
