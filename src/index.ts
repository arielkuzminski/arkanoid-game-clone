class Box {
  public positions: number[][];
  constructor(
    private ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.draw();
    this.positions = this.calculatePositions();
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  calculatePositions() {
    return [
      Array.from({ length: this.width }, (_, i) => i + this.x),
      Array.from({ length: this.height }, (_, i) => i + this.y),
    ];
  }

  calculateCollision(ballX: number, ballY: number) {
    return (
      this.positions[0].includes(ballX) && this.positions[1].includes(ballY)
    );
  }
}

let mouseX = 0;
const padding = 50;

let ballX = 0;
let ballY = 0;

let vectorX = 1;
let vectorY = 1;

let paddlePos: [number, number] = [0, 0];
let blockPos: [number, number] = [20, 20];

const destroyedBlocks: string[] = [];
const initialBlocks = 2;
let myInterval: number;

const randomNumber = () => Math.floor(Math.random() * 5) - 2;

const init = () => {
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - padding;
  });
  myInterval = setInterval(() => {
    draw();
  }, 10);
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

  if (initialBlocks === destroyedBlocks.length) {
    clearInterval(myInterval);
    alert("Wygrałeś!");
    window.location.reload();
  }

  if (!destroyedBlocks.includes("box1")) {
    const box1 = new Box(ctx, 20, 20, 20, 20);
    const isCollision = box1.calculateCollision(ballX, ballY);
    if (isCollision) {
      vectorY = vectorY >= 1 ? -1 : 1;
      vectorX = vectorX >= 1 ? -1 : 1;
      destroyedBlocks.push("box1");
    }
  }

  if (!destroyedBlocks.includes("box2")) {
    const box1 = new Box(ctx, 100, 20, 20, 20);
    const isCollision = box1.calculateCollision(ballX, ballY);
    if (isCollision) {
      vectorY = vectorY >= 1 ? -1 : 1;
      vectorX = vectorX >= 1 ? -1 : 1;
      destroyedBlocks.push("box2");
    }
  }

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
      clearInterval(myInterval);
      alert("game over");
      window.location.reload();
    }
  } else {
    if (ballY >= 140 - 10) {
      vectorY = -1;
    }
  }

  if (ballX >= 150 - 10) {
    vectorX = -1;
    ballX = ballX + randomNumber();
    ballY = ballY + randomNumber();
  }

  if (ballX <= 0) {
    vectorX = 1;
    ballX = ballX + randomNumber();
    ballY = ballY + randomNumber();
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
