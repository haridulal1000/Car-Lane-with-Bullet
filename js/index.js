let gameStart = document.getElementById("gameStart");
let highScoreDiv = document.getElementById("score");
let startBnt = document.getElementById("start");
let canvas = document.getElementById("viewPort");
let context = canvas.getContext("2d");
let scoreboard = document.getElementById("scoreboard");
let gameover = document.getElementById("gameOver");
let finalScore = document.getElementById("finalScore");
let currentHS = document.getElementById("currentHS");
let restartBtn = document.getElementById("restart");
let frameCount;
let point;
let highScore;
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
let player;
let obstacles;
let animation;
let gameState = 0;
let road;

let temp = localStorage.getItem("highScore");
if (temp) {
  highScore = temp;
} else {
  highScore = 0;
}
highScoreDiv.innerHTML = `High Score: ${highScore}`;

startBnt.addEventListener("click", function () {
  gameState = 1;
  gameStart.style.display = "none";
  hints.style.display = "none";
  setup();
});

function setup() {
  road = new Road();
  point = 0;
  frameCount = 0;
  obstacles = [];
  obstacleSpeed = 5;
  scoreboard.style.display = "block";
  scoreboard.innerHTML = `${point}`;
  canvas.style.display = "block";
  player = new Player();
  obstacles.push(new Obstacle());
  loop();
}

function draw() {
  road.moveRoad();
  player.show();
  player.update();
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();
    if (player.collides(obstacles[i])) {
      let crash = new Audio("./sounds/crash.mp3");
      crash.play();
      window.cancelAnimationFrame(animation);
      gameState = 2;
      gameOver();
    }
    if (obstacles[i].pointUp(player)) {
      point++;
      scoreboard.innerHTML = `${point}`;
    }
    if (obstacles[i].edge()) {
      obstacles.splice(i, 1);
    }
  }
  if (obstacles[obstacles.length - 1].y > 500) {
    obstacles.push(new Obstacle());
  }
  frameCount++;
  if (frameCount % 200 === 0) {
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].yVel += 1;
    }
    obstacleSpeed += 1;
  }
  if (gameState === 1) {
    loop();
  }
}
function loop() {
  animation = window.requestAnimationFrame(draw);
}
window.addEventListener("keydown", function (e) {
  if (e.key === "a") {
    player.steerLeft();
  }
  if (e.key === "d") {
    player.steerRight();
  }
});
function start() {
  canvas.style.display = "hidden";
}

function gameOver() {
  gameover.style.display = "block";
  restartBtn.style.display = "block";
  scoreboard.style.display = "none";
  finalScore.innerHTML = `Your Score: ${point}`;
  canvas.style.display = "none";
  if (point > highScore) {
    highScore = point;
    localStorage.setItem("highScore", point);
  } else {
    localStorage.setItem("highScore", highScore);
  }
  currentHS.innerHTML = `High Score: ${highScore}`;
}
restartBtn.addEventListener("click", function () {
  gameState = 1;
  gameover.style.display = "none";
  setup();
});
window.addEventListener("keypress", function (e) {
  if (e.key === "h" && gameState === 1) {
    let honk = new Audio("./sounds/honk.wav");
    honk.play();
  }
});
