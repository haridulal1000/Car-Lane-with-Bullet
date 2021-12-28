function Road() {
  this.road = new Image();
  this.road.src = "images/road.jpg";

  this.y = 0;
  this.moveRoad = function () {
    context.drawImage(this.road, 0, this.y - height, width, height * 2);
    this.y += obstacleSpeed * 2;
    if (this.y >= height) this.y = 0;
  };
}
