let size = 50;
function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  frameRate(50);
  rectMode(CENTER);
}

function draw() {
  background(0);
  //create grid of squares
  for(let i=0; i<width; i=i+size){
    for (let j=0; j<height ; j=j+size) {
      push();
      translate(i,j);
      rotate(frameCount);
      noStroke();
      fill(255,0,255);
      //rect(0,0,size/2,size/2);
      rect(0,0,size/2,size/2);
      pop();
    }
  }
}
