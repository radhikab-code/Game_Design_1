let x,y, size;
function setup() {
  createCanvas(1000, 1000);
  background(0);
  x=0;
  y=0;
  size=20;

}

function draw() {
  stroke(random(0,255),random(0,255),random(0,255));
  strokeWeight(4);
  //pick a random numbet between 0 and 1
  choice= random(0,1);

  //if less than 0.5, draw "/", else draw "\"
if (choice < 0.5) { line (x +size, y, x, y+ size);
} else{ 
  line(x,y, x+size, y+size);
  
}

  //move the point to right
x= x+size

//if it walks off the screen, x=o, y=y+size
if(x>width){
  x=0;
  y=y+size;
}


}
