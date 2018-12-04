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
    this.dy = random(4, 5);
    this.radius = random(3, 10);
    this.color = color(0, random(60), 255 - random(50), 255 - random(0, 200));
    this.touchingGround = false;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
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

      if(random(100) > 30 && this.dx < 15) {
        this.dx += random(0.1, 1);
      }
      else {
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
    if (this.y + this.dy >= collectionHeight + 15) {
      this.touchingGround = true;
      this.y = random(0, -10);
      this.dy = random(5, 6);
      this.dx = random(-2, 2);
    }
    else {
      this.touchingGround = false;
      this.dy += 0.01;
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
  constructor() {
    this.x = random(100, width - 100);
    this.y = -25;
    this.steps = ceil(random(15, 25));
    this.stepSize = ceil(height/this.steps);
    this.color = color(random(220, 255), random(220, 255), random(150, 220));
    this.size = floor(random(3, 7));
  }

  display() {
    let nextY = this.y + this.stepSize;
    let nextX = this.x + random(-25, 25);
    strokeWeight(this.size);
    stroke(this.color);
    line(this.x, this.y, nextX, nextY);

    this.x = nextX;
    this.y = nextY;
  }
}

class Steam {
  constructor() {
    this.x = random(width);
    this.y = collectionHeight;
    this.dx = 0.01;
    this.dy = 5;
    this.radius = random(3, 8);
    this.color = color(150, 150, 160, 140);
    this.touchingGround = false;
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  fall() {
    this.y -= this.dy;

    if (this.y < 0 + this.radius * 2) {
      this.touchingGround = true;
    }
    else {
      this.touchingTop = false;
    }

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
  constructor(type, image, x, selected) {
    this.x = x;
    this.y = 0;
    this.size = 100;
    this.tint = color(75, 0, 75);
    this.image = image;
    this.weather = type;
    this.hovering = false;
    this.selected = selected;
  }

  display() {
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
      this.hovering = true;
      if (mouseIsPressed) {
        if(this.weather === "rain" && weather !== "rain" || this.weather === "thunder" && weather !== "thunder") {
          noRain = true;
        }
        else if (this.weather === "snow" && weather !== "snow") {
          noSnow = true;
        }

        weather = this.weather;
        this.selected = true;

      }
    }
    else {
      this.hovering = false;
    }
  }
}


class Sun {
  constructor() {
    this.x = width;
    this.y = 0;
    this.diameter = random(400, 500);
    this.color = color(random(175, 255), random(175, 255), 0);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);

  }
}

let dropCounter = 0;
let snowCounter = 0;
let collectionHeight, snowCollectionHeight;
let weather;
let noRain;
let noSnow;
let lightning;
let lightningRarity = 1;
let temp = 255;
let changeCooldown;

//+ values are melted shows darker colors (+255 max)
//- values are frozen refers to lightness (0 min)
let heatLimit = 255;
let coldLimit = 0;



//sounds!
let thunderSound;
let rainDrop;
let birds;
let wind;

//Images !
let rainImage, snowImage, sunImage, thunderImage;

let rainButton, sunnyButton, snowButton, thunderButton;

let weatherLists = {
  rain: [],
  snow: [],
  steam: [],
};

function preload() {
  thunderSound = loadSound("assets/thunder.wav");
  rainDrop = loadSound("assets/rain.wav");

  rainImage = loadImage("assets/rainImage.JPG");
  snowImage = loadImage("assets/snowImage.JPG");
  sunImage = loadImage("assets/sunImage.JPG");
  thunderImage = loadImage("assets/thunderImage.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
  noRain = true;
  noSnow = true;
  changeCooldown = 2000;

  rainButton = new GuiButton("rain", rainImage, 0, true);
  sunnyButton = new GuiButton("sunny", sunImage, 100, false);
  snowButton = new GuiButton("snow", snowImage, 200, false);
  thunderButton = new GuiButton("thunder", thunderImage, 300, false);
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
  waterCollection();
  displayGui();
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

function rain() {
  if (noRain) {
    generatePrecipitation(weatherLists.rain, noRain, 300);
  }

  background(temp-80, temp-50, 254);
  displayPrecipitation(weatherLists.rain, "rain");
  displayPrecipitation(weatherLists.snow, "snow");
  displayPrecipitation(weatherLists.steam, 0);
}

function thunder() {
  if (noRain) {
    generatePrecipitation(weatherLists.rain, noRain, 450);
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
    generatePrecipitation(weatherLists.snow, noSnow, 300);
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

function deviceShaken() {
  if(weather === "rain") {
    weather = "snow";
  }
  else if(weather === "snow") {
    weather = "sunny";
  }
  else if (weather === "sunny") {
    weather = "thunder";
  }
  else if (weather === "thunder") {
    weather = "rain";
  }
}

function displayPrecipitation(precip, type) {
  collectionHeight = height - dropCounter * 0.01;
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
    dropCounter++;
    if (weather !== type || precip.length > 400) {
      // console.log("here!");
      precip.splice(i, 1);
    }

  }
}

function generatePrecipitation(list, type, amount) {
  if (weather === "rain" || weather === "thunder") {
    for (let i = 0; i < amount; i++) {
      let somePrecip = new Raindrop();
      list.push(somePrecip);
    }
    noRain = false;
  }
  else if (weather === "snow") {
    for (let i = 0; i < amount; i++) {
      let somePrecip = new Snowflake();
      list.push(somePrecip);
    }
    noSnow = false;
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
