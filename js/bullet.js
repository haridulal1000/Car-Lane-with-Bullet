function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.yVel = bulletSpeed;
  this.width = 40;
  this.height = 80;
  this.image = new Image();
  this.image.src = "./images/missile.png";
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
  this.collides = function (obstacle) {
    if (
      Math.abs(this.y - obstacle.y) <= this.height / 2 + obstacle.height / 2 &&
      Math.abs(this.x - obstacle.x) <= this.width / 2 + obstacle.width / 2
    ) {
      return true;
    }
    return false;
  };
  this.edge = function () {
    if (this.y - this.height / 2 < 0) {
      return true;
    }
    return false;
  };
}
