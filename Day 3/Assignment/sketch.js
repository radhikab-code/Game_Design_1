let size=50;
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(2);
}

function draw() {
background(0);

  //creates multiple rows

  for(let i=0; i<width; i=i+size) {
    for(let j= 0; j<height; j= j+size){
    stroke(random(100,255),random(100,255),random(100,255));
    strokeWeight(3);
    

    choice= random(0,1)

  //if less than 0.5, draw "/", else draw "\"
if (choice < 0.5) { rect (i +size, j, i, j+ size);
} else { 
  rect(i,j, i+size, j+size);
    }
fill(random(100,255),random(100,255),random(100,255));
    if (choice < 0.5) { ellipse (i +size, j, 20);
} else { 
  ellipse(i,j, 20);
    }
  }
}
  
}
