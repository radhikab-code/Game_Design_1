let size = 50; genImage=[]; noImage=4;
//g0,g1,g2,g3;

function preload() {
  for(let i=0; i<noImage; i++) {
    let name = "images/img"+i+".png";
    genImage[i]= loadImage(name);
  }
 /* g0 = loadImage("images/img0.png");
  g1 = loadImage("images/img1.png");
  g2 = loadImage("images/img2.png");
  g3 = loadImage("images/img3.png");*/
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(3);
  
}

function draw() {
  background(0);
  //create grid of squares
  for(let i=0; i<width; i=i+size){
    for (let j=0; j<height ; j=j+size) {
     
      //select 1 of 4 choice
      let choice =  floor(random(0,noImage));
      image(genImage[choice],i,j,size,size);
      // if(choice==0) {
      //   image(g0,i,j,size,size);
      // } else if (choice==1){
      //   image(g1,i,j,size,size);
      // } else if(choice=2) {
      //   image(g2,i,j,size,size);
      // } else{
      //   image(g3,i,j,size,size);
      // }
    }
  }
}