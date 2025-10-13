let tileSize = 8;
let beachLimit = 3000; 

function setup() {
  createCanvas(5000, 800);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  noLoop();
  drawBackground();
}

function drawBackground() {
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
      let h, s, b;
      if (t < 0.5) {
        // From sand to foam
        let tt = map(t, 0, 0.5, 0, 1);
        h = lerp(sandH, foamH, tt);
        s = lerp(sandS, foamS, tt);
        b = lerp(sandB, foamB, tt);
      } else {
    
        let tt = map(t, 0.5, 1, 0, 1);
        h = lerp(foamH, oceanH, tt);
        s = lerp(foamS, oceanS, tt);
        b = lerp(foamB, oceanB, tt);
      }

      fill(h, s, b);
      rect(x, y, tileSize, tileSize);
    }
  }
}
