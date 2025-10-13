let size = 70; genImage=[]; noImage=3;

function preload() {
  for(let i=0; i<noImage; i++) {
    //let name = "images/i_"+i+".png";
    let name = "images/line_img"+i+".png";
    genImage[i]= loadImage(name);
  }
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(3);
  }

function draw() {
  background("light brown");
  //create grid of squares
  for(let i=0; i<width; i=i+size){
    for (let j=0; j<height ; j=j+size) {
     
      //select 1 of 4 choice
      let choice =  floor(random(0,noImage));
      image(genImage[choice],i,j,size,size);
       }
  }
}