let size=30;
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(5);
}

function draw() {
background(220);

  //creates multiple rows

  for(let i=0; i<width; i=i+size) {
    for(let j= 0; j<height; j= j+size){
    stroke(random(0,255),random(0,255),random(0,255));
    strokeWeight(3);
    //fill(random(0,255),random(0,255),random(0,255))
    //ellipse(i+size/2,size/2,size);
    //ellipse(size/2,i+size/2,size);
    //ellipse(i,j,size);

    choice= random(0,1)

  //if less than 0.5, draw "/", else draw "\"
if (choice < 0.5) { line (i +size, j, i, j+ size);
} else { 
  line(i,j, i+size, j+size);
    }
  }
}
  
}
