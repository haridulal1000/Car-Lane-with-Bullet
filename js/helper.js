function distance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;
    let distSq = x * x + y * y;
    return Math.sqrt(distSq);
  }
  function random(min, max) {
    return min + Math.random() * (max - min);
  }