let gBall;
let lPaddle, rPaddle;
let player1 = 0; // computer
let player2 = 0; // human 
let pingSound;
let monarchImg;

let roundPoints = 0;
let maxRounds = 6;
let monarchSize = 100;
let message = "";
let gameOver = false;

function preload() {
  pingSound = loadSound("assets/2.mp3");
  monarchImg = loadImage("assets/king.png");
}

function setup() {
  createCanvas(800, 400);
  gBall = new Ball(width / 2, height / 2, 5, 5);

  let pWidth = 10, pHeight = 80;
  lPaddle = new Paddle(0, height / 2 - pHeight / 2, pWidth, pHeight, 5); // computer
  rPaddle = new Paddle(width - pWidth, height / 2 - pHeight / 2, pWidth, pHeight, 5); // human
}

function draw() {
  background(50, 50, 150);

  // --- Draw Monarch ---
  // fill(200, 50, 50);
  // ellipse(width / 2, 80, monarchSize, monarchSize);
  // fill(255);
  // textSize(20);
  // textAlign(CENTER);
  // text("The Monarch", width / 2, monarchSize + 50);

imageMode(CENTER);
image(monarchImg, width / 2, 80, monarchSize, monarchSize);

  // Crown
  // fill(255, 215, 0);
  // triangle(width / 2 - monarchSize / 4, 80 - monarchSize / 2,
  //          width / 2, 80 - monarchSize / 1.2,
  //          width / 2 + monarchSize / 4, 80 - monarchSize / 2);

  // --- Score Info ---
  textSize(18);
  textAlign(LEFT, TOP);
  fill(255);
  text("Rounds: " + roundPoints + " / " + maxRounds, 20, 10);
  text("Computer: " + player1 + "   Player: " + player2, 20, 40);

  // --- Ball behaviour ---
  gBall.move();
  gBall.checkCollisionPaddle(lPaddle);
  gBall.checkCollisionPaddle(rPaddle);
  gBall.checkCollisionWall();
  gBall.show();

  let exitSide = gBall.checkWinner();
  if (exitSide !== null) {
    gBall.reset();

    // ANY point always goes to Player 1 (computer)
    player1++; 
    roundPoints++;

     // Grow Monarch
  monarchSize += 10;

    // Display taunt
    message = "Try harder, child!";
  }

  // --- Computer AI (Player 1) ---
  if (gBall.y < lPaddle.y + lPaddle.height / 2) lPaddle.moveUp();
  else if (gBall.y > lPaddle.y + lPaddle.height / 2) lPaddle.moveDown();

  // --- Human Controls (Player 2) ---
  if (keyIsDown(UP_ARROW)) rPaddle.moveUp();
  if (keyIsDown(DOWN_ARROW)) rPaddle.moveDown();

  lPaddle.show();
  rPaddle.show();

  // --- Check if game over ---
  if (roundPoints >= maxRounds && !gameOver) {
    gameOver = true;
    message = "Game Over! The Monarch prevails.";
  }

  // --- Display message ---
  if (message !== "") {
    textSize(28);
    textAlign(CENTER, CENTER);
    fill(255, 100, 100);
    text(message, width / 2, height / 2);

    if (gameOver) noLoop();
    else setTimeout(() => { message = ""; }, 1000); // short taunt
  }
}
