let player;
let friends = [];
let numFriends = 15;
let allLit = false;
let fireworks = [];
let skyFirework;
let fireworkLaunched = false;
let fireworkExploded = false;
let gathering = false;
let gathered = false;
let centerX, centerY;
let speed = 5;
let gameState = 1;
let explosionSound;
let explosionSoundEnd;
let kidsSound;
let sparkleSound;


function preload() {
  explosionSoundEnd = loadSound("asset/firework_explosion_1.wav");
  explosionSound = loadSound("asset/multiple_fireworks_explosions.wav");
  kidsSound = loadSound("asset/laughing_children_indoors.wav");
  sparkleSound = loadSound("asset/sparkles.wav");
}


function setup() {
  noCursor();
  createCanvas(innerWidth, innerHeight);
  centerX = width / 2;
  centerY = height / 2;
  player = new Sparkler(100, height / 2, true);
  for (let i = 0; i < numFriends; i++) {
    let x = random(200, width - 150);
    let y = random(height / 2 - 150, height / 2 + 150);
    friends.push(new Sparkler(x, y, false));
  }
}

function draw() {
  if (gameState == 1){
    background(15, 20, 40);
    fill(255);
    textAlign(CENTER);
    textSize(22);
    text(" 🪔 IT'S DIWALI 🪔 ", width / 2, 300);
    text(" 🌟  Press ENTER to start  🌟", width / 2, height/2);
  }
  else if(gameState == 2){
      background(15, 20, 40);
      drawStars();

      fill(255);
      textAlign(CENTER);
      textSize(22);

      //if (keyIsDown(LEFT_ARROW))player.moveLeft();

      if (!allLit) {
        text("🪔 Move your mouse and light everyone's sparklers 🌟", width / 2, 50);
      } else if (gathering && !fireworkLaunched) {
        text("Everyone’s sparkler glows — let’s come together 💛", width / 2, 50);
      }

      // Player movement
      player.update();
      player.display();
      if(!allLit){
        player.followMouse();
      }
      

      // Friends behavior
      for (let f of friends) {
        f.update();
        f.display();

        if (!f.lit && dist(player.x, player.y, f.x, f.y) < 70) {
          f.lit = true;
          fireworks.push(new Firework(f.x, f.y - 50));
          sparkleSound.play();
        }
      }

      // Spark effects
      for (let fw of fireworks) {
        fw.update();
        fw.display();
      }
      fireworks = fireworks.filter(fw => !fw.done);

      // Check if all are lit
      if (!allLit && friends.every(f => f.lit)) {
        allLit = true;
        gathering = true;
      }

      // Gather to center
      if (gathering && !gathered) {
        let allArrived = true;
        for (let i = 0; i < friends.length; i++) {
          let angle = TWO_PI / numFriends * i;
          let targetX = centerX + cos(angle) * 200;
          let targetY = centerY + sin(angle) * 200;
          friends[i].x = lerp(friends[i].x, targetX, 0.02);
          friends[i].y = lerp(friends[i].y, targetY, 0.02);
          if (dist(friends[i].x, friends[i].y, targetX, targetY) > 2) {
            allArrived = false;
          }
        }
        player.x = lerp(player.x, centerX, 0.02);
        player.y = lerp(player.y, centerY, 0.02);
        if (allArrived && dist(player.x, player.y, centerX, centerY) < 3) {
          gathered = true;
          gathering = false;
          setTimeout(() => launchSkyFirework(), 2000);
        }
      }

      // Sky firework logic
      if (fireworkLaunched && !fireworkExploded) {
        skyFirework.y -= 8;
        noStroke();
        fill(255, 220, 150);
        ellipse(skyFirework.x, skyFirework.y, 12);
        // small trail
        fill(255, 180, 80, 150);
        ellipse(skyFirework.x, skyFirework.y + 20, 8);
        if (skyFirework.y < height / 2.5) {
          fireworkExploded = true;
          explosionSoundEnd.play();
          for (let i = 0; i < 12; i++) {
            fireworks.push(new SkyBurst(skyFirework.x, skyFirework.y));
          }
        }
      }

      if (fireworkExploded) {
        fill(255);
        textSize(28);
        text("🌟 Joy grows when shared 🌟", width / 2, height - 80);
      }
  }
}
  

function keyPressed() {
  let step = 20;
  if (keyCode === ENTER && gameState == 1){
    gameState++;
    kidsSound.play();
  } 
  player.x += step;
  //if (keyIsDown(LEFT_ARROW))player.moveLeft();
  if (keyCode === RIGHT_ARROW) player.x += step;
  if (keyCode === UP_ARROW) player.y -= step;
  if (keyCode === DOWN_ARROW) player.y += step;
}



// Launch sky firecracker from center
function launchSkyFirework() {
  skyFirework = { x: centerX, y: centerY };
  fireworkLaunched = true;
  explosionSound.play();
}

// Sparkler class
class Sparkler {
  constructor(x, y, lit) {
    this.x = x;
    this.y = y;
    this.lit = lit;
  }

  update() {
    if (this.lit && frameCount % 5 === 0) {
      // Emit sparks around the circle head
      for (let i = 0; i < 5; i++) {
        let angle = random(TWO_PI);
        let r = random(10, 25);
        let sx = this.x + cos(angle) * r;
        let sy = this.y - 50 + sin(angle) * r;
        fireworks.push(new YellowSpark(sx, sy, angle));
      }
    }
  }
 
followMouse () {
  this.x = mouseX;
  this.y = mouseY;
}
  //  moveLeft() {
  //   if (this.x > 0) this.x -= speed;
  // }

  display() {
    push();
    stroke(160);
    strokeWeight(5);
    line(this.x, this.y-20, this.x, this.y - 50);
    strokeWeight(1);
    line(this.x, this.y, this.x, this.y - 20);
    pop();
    noStroke();
    if (this.lit) {
      fill(255, 230, 100,random(255,50));
      ellipse(this.x, this.y - 55, 8 * sin(frameCount * 0.1) + 15);
    } else {
      fill(100);
      ellipse(this.x, this.y - 55, 12);
    }
  }
}

// Golden spark particles for sparklers
class YellowSpark {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.vx = cos(angle) * random(1, 3);
    this.vy = sin(angle) * random(1, 3);
    this.life = random(120, 180);
    this.col = color(255, random(200, 230), 80);
    this.done = false;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02;
    this.life -= 3;
    if (this.life <= 0) this.done = true;
  }
  display() {
    noStroke();
    fill(this.col.levels[0], this.col.levels[1], this.col.levels[2], this.life);
    ellipse(this.x, this.y, 3);
  }
}

// Firework spark bursts (used in sparklers)
class Firework {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.particles = []; this.done = false;
    for (let i = 0; i < 36; i++) {
      this.particles.push({
        x: this.x, y: this.y,
        vx: random(-3, 3), vy: random(-3, 3),
        life: random(150, 255),
        col: color(255, random(200, 230), 100)
      });
    }
  }
  update() {
    for (let p of this.particles) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 3;
    }
    this.particles = this.particles.filter(p => p.life > 0);
    if (this.particles.length === 0) this.done = true;
  }
  display() {
    noStroke();
    for (let p of this.particles) {
      fill(red(p.col), green(p.col), blue(p.col), p.life);
      ellipse(p.x, p.y, 4);
    }
  }
}

// Realistic sky firework burst
class SkyBurst {
  constructor(x, y) {
    this.particles = [];
    this.done = false;
    for (let i = 0; i < 80; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 6);
      this.particles.push({
        x: x, y: y,
        vx: cos(angle) * speed,
        vy: sin(angle) * speed,
        life: random(180, 255),
        col: color(random(200, 255), random(150, 255), random(100, 180))
      });
    }
  }
  update() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 2;
    }
    this.particles = this.particles.filter(p => p.life > 0);
    if (this.particles.length === 0) this.done = true;
  }
  display() {
    noStroke();
    for (let p of this.particles) {
      fill(red(p.col), green(p.col), blue(p.col), p.life);
      ellipse(p.x, p.y, 4);
    }
  }
}

// Background stars
function drawStars() {
  for (let i = 0; i < 120; i++) {
    stroke(255, random(50, 200));
    point(random(width), random(height / 2));
  }
}
