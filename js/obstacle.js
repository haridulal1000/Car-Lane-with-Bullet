function Obstacle() {
  this.index = Math.round(random(0, 2));
  this.image = new Image();
  this.image.src = `./images/car${Math.round(random(1, 4))}.png`;
  this.xVel = 0;
  this.yVel = obstacleSpeed;
  this.x = this.index * laneWidth + laneWidth / 2;
  this.y = -100;
  this.width = 100;
  this.height = 200;
  this.crossed = false;
  this.show = function () {
    context.drawImage(
      this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  };
  this.update = function () {
    this.y += this.yVel;
  };
  this.edge = function () {
    if (this.y > width) {
      return true;
    }
    return false;
  };
  this.pointUp = function (player) {
    if (this.crossed === true) {
      return false;
    }
    if (this.y > player.y) {
      this.crossed = true;
      return true;
    }
    return false;
  };
}
