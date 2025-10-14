let flowers = []; //empty array
function setup() {
  createCanvas(400, 400);
  myFlower = new Flower(200,200);
}

function draw() {
  background(0);
  for(let i=0; i<flowers.length; i++) {
    //check if the current mX and mY IS ON THE FLOWER
    flowers[i].checkMousePosition(mouseX, mouseY);

    //moves and draws the flower
    flowers[i].moveFlower();
    flowers[i].drawFlower();
  }
}

function mousePressed() {
  let tempFlower = new Flower(mouseX, mouseY, random(-5,5), random(-5,5));
  flowers.push(tempFlower);
}

//draw a flower at the point where I click on canvas
//STEPS
//click somewhere -> mousePressed
// create a flower at mouse position -> let variable = new Flower(mouseX, mouseY)