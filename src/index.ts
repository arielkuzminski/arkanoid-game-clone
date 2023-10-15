class Box {
  public positions: number[][];
  constructor(
    private ctx: CanvasRenderingContext2D,
    public id: string,
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

const canvasWidth = 640;
const canvasHeight = 480;

let mouseX = 0;
const padding = 50;

let ballX = 0;
let ballY = 0;

let vectorX = 1;
let vectorY = 1;

let paddlePos: [number, number] = [0, 0];
let blockPos: [number, number] = [20, 20];

const destroyedBlocks: string[] = [];
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  alert("brack contextu");
  throw new Error("No canvas available");
}

let blockToRender = [
  new Box(ctx, "box1", 0, 100, 20, 20),
  new Box(ctx, "box2", 120, 100, 20, 20),
  new Box(ctx, "box3", 220, 100, 20, 20),
  new Box(ctx, "box4", 320, 100, 20, 20),
  new Box(ctx, "box5", 420, 100, 20, 20),
  new Box(ctx, "box6", 520, 100, 20, 20),
  new Box(ctx, "box7", 620, 100, 20, 20),
];
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
  const ballDiv = document.getElementById("ball") as HTMLCanvasElement;
  const mouseDiv = document.getElementById("mouse") as HTMLCanvasElement;
  const canDiv = document.getElementById("can") as HTMLCanvasElement;
  ballDiv.innerHTML = `X: ${ballX} Y: ${ballY}`;
  mouseDiv.innerHTML = `X: ${mouseX}`;
  canDiv.innerHTML = (mouseX - canvas.getBoundingClientRect().left).toString();

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ballX = Math.floor(ballX);
  ballY = Math.floor(ballY);

  if (blockToRender.length === 0) {
    clearInterval(myInterval);
    alert("Wygrałeś!");
    window.location.reload();
  }

  blockToRender.forEach((el) => {
    el.draw();
    if (!destroyedBlocks.includes(el.id)) {
      const isCollision = el.calculateCollision(ballX, ballY);
      if (isCollision) {
        vectorY = vectorY >= 1 ? -1 : 1;
        vectorX = vectorX >= 1 ? -1 : 1;
        destroyedBlocks.push(el.id);
        blockToRender = blockToRender.filter((block) => block.id !== el.id);
      }
    }
  });

  if (mouseX > canvasWidth + padding / 2) {
    mouseX = canvasWidth + padding / 2;
  }

  if (mouseX < 0 + padding + padding / 2) {
    mouseX = 0 + padding + padding / 2;
  }

  paddlePos[0] = mouseX - padding - 50 / 2;
  paddlePos[1] = paddlePos[0] + 50;

  ctx.fillStyle = "black";
  ctx.fillRect(mouseX - padding - 50 / 2, canvasHeight - 10, 50, 10);

  if ((ballX < paddlePos[0] - 9 || ballX > paddlePos[1] - 9) && ballY >= 130) {
    if (ballY >= canvasHeight - 10) {
      vectorY = -1;
      clearInterval(myInterval);
      alert("game over");
      window.location.reload();
    }
  } else {
    if (ballY >= canvasHeight - 10 - 7.5) {
      vectorY = -1;
    }
  }

  if (ballX >= canvasWidth - 10) {
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
