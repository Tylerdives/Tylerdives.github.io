class Sun {
  constructor(width){
    this.x = width;
    this.y = 0;
    this.radius = 500;
  }
  display(weather){
    if(weather === "sunny"){
      fill(255,255,0);
    }
    else{
      fill(150,150,0);
    }
    ellipse(this.x,this.y,this.radius,this.radius);
  }
}