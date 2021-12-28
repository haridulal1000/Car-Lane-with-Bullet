function Player() {
  this.index = 1;
  this.xVel = 0;
  this.x = this.index * laneWidth + laneWidth / 2;
  this.y = 550;
  this.width = 100;
  this.height = 200;
  this.state = 0;
  this.image = new Image();
  this.image.src = "./images/player.png";
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
    if (this.state === 0) {
      this.xVel = 0;
    }
    if (this.state === 1) {
      if (this.x > (this.index - 1) * laneWidth + laneWidth / 2) {
        this.xVel = -playerXSpeed;
      } else {
        this.xVel = 0;
        this.state = 0;
        this.index--;
        this.x = this.index * laneWidth + laneWidth / 2;
      }
    }
    if (this.state === 2) {
      if (this.x < (this.index + 1) * laneWidth + laneWidth / 2) {
        this.xVel = playerXSpeed;
      } else {
        this.xVel = 0;
        this.state = 0;
        this.index++;
        this.x = this.index * laneWidth + laneWidth / 2;
      }
    }
    this.x += this.xVel;
  };
  this.steerLeft = function () {
    if (this.index === 0) {
      return;
    } else {
      this.state = 1;
    }
  };
  this.steerRight = function () {
    if (this.index === 2) {
      return;
    } else {
      this.state = 2;
    }
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
}
