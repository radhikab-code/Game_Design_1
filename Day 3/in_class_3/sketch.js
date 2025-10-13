let petals=18;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawFlower(10,0,100);
  drawFlower(20,200,100);
  drawFlower(8,300,350);
}



  function drawFlower(petals,x,y) { 
      push();
  //move origin
  translate(x,y);

//centre of flower
noStroke();
fill("yellow");
ellipse(0,0,50,50);
rotate(frameCount);

//petals
for(let i=0; i<petals; i=i+1) {
  noStroke();
  fill(200,60,100,100);
  ellipse(80,0,100,50); 
  rotate(360/petals);
}
   
  pop();

  }
  


