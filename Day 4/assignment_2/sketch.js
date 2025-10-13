let spriteImg;
let sRows = 4, sCols = 6;
let sprites = []
let count = 0;

function preload() {
  spriteImg = loadImage("images/cat_spritesheet.png");
}
function setup() {
  frameRate(8);
  createCanvas(innerWidth, innerHeight);

  let sWidth = spriteImg.width / sCols;
  let sHeight = spriteImg.height / sRows;
  //console.log("test")

  //loop the sprite image and store it in a 1D array sprites
  for (let i = 0; i < sRows; i += 1) {
    for (let j = 0; j < sCols; j += 1) {
      //get that slice of the sprite
      //strore it in the array sprites
      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);

    }
  }
}
console.log(sprites);

function draw() {
  background(0);
  // if(isKeyPressed) {
  //   count++;
  image(sprites[frameCount%(sprites.length)], 0, 0);
  }
  

