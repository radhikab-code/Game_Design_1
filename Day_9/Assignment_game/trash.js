class Trash {
  constructor(countT) {
    this.x = [];
    this.y = [];
    this.countT = countT;
    this.randomImage = [];
    this.width = [];
    this.height = [];

    this.setup();


  }

  setup() {
    for (let i = 0; i < this.countT; i++) {
      this.x.push(random(800, 3800));
      this.y.push(random(100, 700));
      let randomImage = floor(random(1, 4));

      if (randomImage == 1) {
        this.randomImage.push(image1);
        this.height.push(360);
        this.width.push(797);

      } else if (randomImage == 2) {

        this.randomImage.push(image2);
        this.height.push(394);
        this.width.push(650);
      } else {

        this.randomImage.push(image3);
        this.height.push(331);
        this.width.push(218);
      }
    }
    console.log(this.x, this.y);
  }

  show() {
    for (let i = 0; i < this.countT; i++) {
      push();
      translate(this.x[i], this.y[i]);
      scale(0.35);
      image(this.randomImage[i], 0, 0);
      pop();
    }
  }

  detectCollision(tx, ty, tw) {
    for (let i = 0; i < this.countT; i++) {
      let distance = dist(
        tx, ty,
        this.x[i] + (this.width[i] * 0.35) / 2,
        this.y[i] + (this.height[i] * 0.35) / 2
      );

      let minDist = ((this.height[i] * 0.35) / 2) + (tw / 2);

      if (distance < minDist) {
        return true;
      }
    }

    return false;
  }
}
