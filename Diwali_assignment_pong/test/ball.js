class Ball {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = 20;
  }

  show() {
    fill(255);
    circle(this.x, this.y, this.size);
  }

  move() {
    this.y += this.ySpeed;
    this.x += this.xSpeed;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random([-5, 5]);
  }

  checkCollisionWall() {
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.ySpeed = -this.ySpeed;
    }
  }

  checkWinner() {
    if (this.x < 0) return "LEFT";
    if (this.x > width) return "RIGHT";
    return null;
  }

  checkCollisionPaddle(paddle) {
    if (
      this.x < paddle.x + paddle.width &&
      this.x > paddle.x &&
      this.y < paddle.y + paddle.height &&
      this.y > paddle.y
    ) {
      pingSound.play();
      this.xSpeed = -this.xSpeed;
    }
  }
}
