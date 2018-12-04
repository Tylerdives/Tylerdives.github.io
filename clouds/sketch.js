// timer
// quincy fast
// november 21st
//

class Cloud {
  constructor(width,img,wind) {
    this.xp = random(width,width+1000);
    this.xn = random(0,-10000);
    this.dx = wind;
    this.width = img.width;
    this.height = img.height;
    this.y = random(-50,60);
    this.img = img;
    this.screen = width;
  }

  display() {
    if(weather==="clear") {
      if(this.dx > 0){
         image(this.img,this.xn,this.y,this.width,this.height);
      }
      if(this.dx < 0){
        image(this.img,this.xp,this.y,this.width,this.height);
     }
    }

    else if(weather==="rain") {
      tint(100);
      if(this.dx > 0){
        image(this.img,this.xn,this.y,this.width,this.height);
      }
      if(this.dx < 0){
       image(this.img,this.xp,this.y,this.width,this.height);
      }
    }

  }

  update() {
    if(this.dx>0){
      this.xn += this.dx;
    }
    else if(this.dx<0){
      this.xp-=this.dx;
    }
  }

}

let weather;
let cloud;
let clouds = [];
let makeCloud = false;
let wind;
let newCloud;

function preload() {
  cloud = loadImage("assets/cloud.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // wind = 5;
  weather = "rain";
  wind = 5;
  newCloud = true;

  generateClouds(5);
}

function draw() {
  if (newCloud) {
    generateClouds(1);
    newCloud = false;
  }
  background(200);
  for(let i = clouds.length-1; i>=0; i--){
    if(clouds[i].xp <= 0 || clouds[i].xn>=width){
      //delete this cloud -- already hidden
      clouds.splice(i,1);
      newCloud = true;
    }
    else {
      clouds[i].display();
      clouds[i].update();
    }
  }
  if(clouds.length === 0){
    generateClouds();
  }
}

function generateClouds(amount) {
  for (let i=0; i<amount; i++) {
    let someCloud = new Cloud(windowWidth,cloud,wind);
    clouds.push(someCloud);
  }
}
