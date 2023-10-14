let mouseX = 0;
const padding = 50;

let ballX = 0;
let ballY = 0;

let vectorX = 1;
let vectorY = 1;

let paddlePos: [number, number] = [0, 0];
let blockPos: [number, number] = [20, 20];

const init = () => {
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - padding;
  });
  setInterval(() => {
    draw();
  }, 30);
  //   window.requestAnimationFrame(draw);
};

const draw = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ballDiv = document.getElementById("ball") as HTMLCanvasElement;
  const mouseDiv = document.getElementById("mouse") as HTMLCanvasElement;
  ballDiv.innerHTML = `X: ${ballX} Y: ${ballY}`;
  mouseDiv.innerHTML = `X: ${mouseX}`;

  ballX = Math.floor(ballX);
  ballY = Math.floor(ballY);

  const ctx = canvas.getContext("2d");
  ctx?.clearRect(0, 0, 150, 150);

  if (!ctx) {
    alert("brack contextu");
    throw new Error("No canvas available");
  }

  ctx.fillStyle = "red";
  ctx.fillRect(blockPos[0], blockPos[1], 20, 20);

  // if (ballX < blockPos[0] - 9 || ballX > blockPos[1] - 9) {
  //   // alert("kolizja");
  // }

  if (mouseX > 100 + padding + padding / 2) {
    mouseX = 100 + padding + padding / 2;
  }

  if (mouseX < 0 + padding + padding / 2) {
    mouseX = 0 + padding + padding / 2;
  }

  paddlePos[0] = mouseX - padding - 50 / 2;
  paddlePos[1] = paddlePos[0] + 50;

  ctx.fillStyle = "black";
  ctx.fillRect(mouseX - padding - 50 / 2, 140, 50, 10);

  if ((ballX < paddlePos[0] - 9 || ballX > paddlePos[1] - 9) && ballY >= 130) {
    if (ballY >= 140) {
      vectorY = -1;
      alert("game over");
    }
  } else {
    if (ballY >= 140 - 10) {
      vectorY = -1;
    }
  }

  if (ballX >= 150 - 10) {
    vectorX = -2.5;
  }

  if (ballX <= 0) {
    vectorX = 2;
  }

  ballX = ballX + vectorX;

  if (ballY <= 0) {
    vectorY = 1;
  }

  ballY = ballY + vectorY;

  ctx.fillStyle = "blue";
  ctx.fillRect(ballX, ballY, 10, 10);
};

init();
