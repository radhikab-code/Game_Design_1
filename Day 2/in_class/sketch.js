function setup() {
  createCanvas(500, 1000);
  background(255,255,255);
}

function draw() {
  fill(mouseX/2,mouseY/2,mouseX/4+mouseY/4);
  noStroke();
  //follows the mouse
  ellipse(mouseX,mouseY,30,30);

  //mirrors the mouse along the x axis
  ellipse(width-mouseX, mouseY, 50);

  
  
}