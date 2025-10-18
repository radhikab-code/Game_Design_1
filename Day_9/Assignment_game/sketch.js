// I want to make a pixilated beach background consisting of sand on left and ocean waves on right
//On the left I want the turtle egg to hatch(1D sprite)
//after the egg hatched i want the baby tuttle to walk till the ocean water(2D sprite)

let speed = 50;
let ydist = 0;
let xdist = 0;
let gameState = 1;
let tileSize = 8;
let beachLimit = 4000;
let h = [];
let s = [];
let b = [];
let opacity = 255;
let Image1, Image2, image3, image4;


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
  image1 = loadImage('images/plastic_bottle.png');
  image2 = loadImage('images/can_trash_50.png');
  image3 = loadImage('images/apple.png');
}
let sWidth
let sHeight

let sWidth1
let sHeight1

let gTrash;





function setup() {

  gTrash = new Trash(3);


  frameRate(8);
  createCanvas(5000, 800);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  //noLoop();
  setupBackground();
  drawBackground();
  angleMode(DEGREES);



  // turtle walk
  sWidth1 = spriteImage.width / sCols1;
  sHeight1 = spriteImage.height / sRows1;


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
        h.push(lerp(foamH, oceanH, tt));
        s.push(lerp(foamS, oceanS, tt));
        b.push(lerp(foamB, oceanB, tt));
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

  fill(0);
  textSize(38);
  textAlign(LEFT, TOP);
  text("AVOID TRASH! USE ARROW KEYS TO MOVE THE TURTLE.", 50, 50);

  if (keyIsDown(RIGHT_ARROW)) {
    drawBackground();
    fill(0);
    textSize(38);
    textAlign(LEFT, TOP);
    text("AVOID TRASH! USE ARROW KEYS TO MOVE THE TURTLE.", 50, 50);
    turtleWalk(1, 0, 90);
  }
  else if (keyIsDown(LEFT_ARROW)) {
    drawBackground();
    fill(0);
    textSize(38);
    textAlign(LEFT, TOP);
    text("AVOID TRASH! USE ARROW KEYS TO MOVE THE TURTLE.", 50, 50);
    turtleWalk(-1, 0, 270);
  }
  else if (keyIsDown(UP_ARROW)) {
    drawBackground();
    fill(0);
    textSize(38);
    textAlign(LEFT, TOP);
    text("AVOID TRASH! USE ARROW KEYS TO MOVE THE TURTLE.", 50, 50);
    turtleWalk(0, -1, 0);
  }
  else if (keyIsDown(DOWN_ARROW)) {
    drawBackground();
    fill(0);
    textSize(38);
    textAlign(LEFT, TOP);
    text("AVOID TRASH! USE ARROW KEYS TO MOVE THE TURTLE.", 50, 50);
    turtleWalk(0, 1, 180);
  }

  gTrash.show();
}

function keyPressed() {


}


function turtleWalk(xdir, ydir, rotateAngle) {
  //egg hatch
  if (gameState == 1) {
    count++;
    push();
    translate(sWidth / 2 + 300, sHeight / 2);
    rotate(90);
    scale(0.5);
    image(sprites[count % (sprites.length)], -sWidth / 2, -sHeight / 2, sWidth, sHeight);
    scale(1);
    pop();
    if (count == 7) {
      gameState = 2;
      count = 0;
    }
  }
  //turtle walk
  else if (gameState == 2) {

    count++;
    push();
    translate(sWidth1 / 2 + 300 + xdist, ydist + (sHeight1 / 2));
    rotate(rotateAngle);
    scale(0.5);
    tint(255, opacity);
    image(sprites1[count % (sprites1.length)], -sWidth1 / 2, -sHeight1 / 2, sWidth1, sHeight1);
    scale(1);
    pop();
    xdist += speed * xdir;
    ydist += speed * ydir;
    if (gTrash.detectCollision(sWidth1 / 2 + 300 + xdist, ydist + (sHeight1 / 2), sWidth1)) {
      xdist -= speed * xdir;
      ydist -= speed * ydir;
    }

    turtleVanish(sWidth1 / 2 + 300 + xdist);
  }

}

function textVanish() {
  fill(0);
  textSize(50);
  textAlign(RIGHT, BOTTOM);
  text("Every year, many turtles hatch, but few survive as plastic pollution threatens their journey to the sea..", 4850, 750);

}


function turtleVanish(xpos) {
  if (xpos <= 4000) {
    opacity = 255;
  }
  else if (xpos > 4000 && xpos < 4800) {
    opacity = map(xpos, 4000, 4800, 255, 0);
  }
  else {
    opacity = 0;
    textVanish();
  }

}


