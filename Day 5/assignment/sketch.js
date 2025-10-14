// I want to make a pixilated beach background consisting of sand on left and ocean waves on right
//On the left I want the turtle egg to hatch(1D sprite)
//after the egg hatched i want the baby tuttle to walk till the ocean water(2D sprite)

let speed=50; 
let distance=0;
let gameState= 1;
let tileSize = 8;
let beachLimit = 3000; 
let h =[];
let s =[];
let b= [];
//turtle walking 
let spriteImage;
let sRows1 = 2, sCols1 = 4;
let sprites1 = []
let count1 = 0;


//egg hatch sprite 
let spriteImg;
let sRows = 2, sCols = 4;
let sprites = []
let count = 0;

function preload() {
  spriteImg = loadImage("images/turtle_egg.png");
  spriteImage = loadImage('images/turtle_walk.png');
}
let sWidth
let sHeight 

let sWidth1
let sHeight1

function setup() {

  frameRate(8);
  createCanvas(5000, 800);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  noLoop();
  setupBackground();
  drawBackground();
  angleMode(DEGREES);

// turtle walk
  sWidth1 = spriteImage.width / sCols1;
  sHeight1 = spriteImage.height / sRows1;
  //console.log("test")

  //loop the sprite image and store it in a 1D array sprites
  for (let i = 0; i < sRows1; i += 1) {
    for (let j = 0; j < sCols1; j += 1) {
      //get that slice of the sprite
      //strore it in the array sprites
      sprites1[sprites1.length] = spriteImage.get(j * sWidth1, i * sHeight1, sWidth1, sHeight1);

    }
  }

console.log(sprites1);
 

//egg hatch sprite

  sWidth = spriteImg.width / sCols;
  sHeight = spriteImg.height / sRows;
  //console.log("test")

  //loop the sprite image and store it in a 1D array sprites
  for (let i = 0; i < sRows; i += 1) {
    for (let j = 0; j < sCols; j += 1) {
      //get that slice of the sprite
      //strore it in the array sprites
      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);

    }
  }
console.log(sprites);
}


function setupBackground() {
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {

      // Transition factor: 0 = sand, 0.5 = foam, 1 = ocean
      let t = constrain(map(x, beachLimit - 150, beachLimit + 150, 0, 1), 0, 1);

      // Sand (light beige/brown)
      let sandH = random(30, 40);   // yellow-brown hue
      let sandS = random(25, 40);   // low saturation
      let sandB = random(85, 100);  // bright, soft tone

      // Foam (whitish / light blue tint) 
      let foamH = random(180, 200); //  blue-white hue
      let foamS = random(5, 20);    //  white tint
      let foamB = random(95, 100);  // very bright = white-like

      // Ocean (aqua blue) 
      let oceanH = random(185, 195); // aqua blue hue 
      let oceanS = random(45, 70);   // bright saturation
      let oceanB = random(80, 100);  // light and vivid

      // Blend in two phases:
      // 0 → 0.5 : sand → foam
      // 0.5 → 1 : foam → ocean
      if (t < 0.5) {
        // From sand to foam
        let tt = map(t, 0, 0.5, 0, 1);
        h.push(lerp(sandH, foamH, tt));
        s.push(lerp(sandS, foamS, tt));
        b.push(lerp(sandB, foamB, tt));
      } else {
    
        let tt = map(t, 0.5, 1, 0, 1);
        h.push (lerp(foamH, oceanH, tt));
        s.push (lerp(foamS, oceanS, tt));
        b.push (lerp(foamB, oceanB, tt));
      }
    }
  }
}

function drawBackground() {
  let count = 0;
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {

      fill(h[count], s[count], b[count]);
      count++
      rect(x, y, tileSize, tileSize);
    }
  }
}


function draw() {

}

function keyPressed(){
  drawBackground();
     turtleWalk();
  }


  function turtleWalk(){
    if (gameState==1){
    count++;
     push();
     translate( sWidth/2 +300, sHeight/2);
     rotate(90);
  image(sprites[count%(sprites.length)], 0, 0);
  pop();
   if(count==7){
    gameState = 2;
    count=0;
   }
    }
    else if(gameState==2){
      count++;
     push();
     translate( sWidth1/2 +300 + distance, sHeight1/2);
     rotate(90);
  image(sprites1[count%(sprites1.length)], 0, 0);
  distance +=speed;
  pop();
   }
  }
  
  