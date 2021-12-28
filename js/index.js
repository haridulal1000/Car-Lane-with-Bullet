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
let bulletTime = 0;
let ammo = new Image();
let ammoDim = 50;
let reload = false;
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
let player;
let obstacles;
let bullets;
let animation;
let gameState = 0;
let road;

let temp = localStorage.getItem("highScore2");
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
  bullets = [];
  obstacleSpeed = 5;
  scoreboard.style.display = "block";
  scoreboard.innerHTML = `${point}`;
  canvas.style.display = "block";
  player = new Player();
  obstacles.push(new Obstacle());
  ammo.src = "./images/ammo.png";
  loop();
}

function draw() {
  road.moveRoad();
  if (frameCount - bulletTime > reloadTime) {
    context.drawImage(ammo, ammoDim / 2, ammoDim / 2, ammoDim, ammoDim);
    reload = true;
  }
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
  if (obstacles.length !== 0) {
    if (obstacles[obstacles.length - 1].y > 500) {
      obstacles.push(new Obstacle());
    }
  } else {
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

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].show();
    bullets[i].update();
    if (bullets[i].edge()) {
      bullets.splice(i, 1);
    }
  }
  for (let i = obstacles.length - 1; i >= 0; i--) {
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (bullets[j].collides(obstacles[i])) {
        let crash = new Audio("./sounds/crash.mp3");
        crash.play();
        bullets.splice(j, 1);
        obstacles.splice(i, 1);
        point++;
        scoreboard.innerHTML = `${point}`;
      }
    }
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
    localStorage.setItem("highScore2", point);
  } else {
    localStorage.setItem("highScore2", highScore);
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
  if (e.key === " " && gameState === 1) {
    if (reload) {
      bullets.push(new Bullet(player.x, player.y));
      bulletTime = frameCount;
      reload = false;
    }
  }
});
