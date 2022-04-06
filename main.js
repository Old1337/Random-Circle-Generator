let canvas = document.getElementById("canvas"),
  theContext = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", resize);
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}

window.addEventListener("mousemove", mousemove);

let mouse = {
  x: 0,
  y: 0,
};

let maxRadius = 40;

let colorArray = ["#8C1F28", "#591C21", "#044040", "#D92525", "#F28705"];

function mousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

theContext.globalAlpha = 0.8;
canvas.style.webkitFilter = "blur(1px)";

class Circle {
  constructor(x, y, dx, dy, radius, color, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.minRadius = minRadius;
    this.draw = function () {
      theContext.beginPath();
      theContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      theContext.fillStyle = color;
      theContext.fill();
    };
    this.update = function () {
      this.x += this.dx;
      this.y += this.dy;
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      this.draw();
    };
  }
}

let circleArray = [];
for (i = 0; i < 2000; i++) {
  let radius = Math.floor(Math.random() * 10);
  let minRadius = radius;
  let x = Math.random() * (canvas.width - radius * 2) + radius;
  let y = Math.random() * (canvas.height - radius * 2) + radius;
  let dx = Math.random() - 0.5; // x velocity
  let dy = Math.random() - 0.5; // y velocity;
  let color = colorArray[Math.floor(Math.random() * colorArray.length)];
  circleArray.push(new Circle(x, y, dx, dy, radius, color, minRadius));
}
function init() {
  circleArray = [];
  for (i = 0; i < 2000; i++) {
    let radius = Math.floor(Math.random() * 10);
    let minRadius = radius;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = Math.random() - 0.5; // x velocity
    let dy = Math.random() - 0.5; // y velocity;
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    circleArray.push(new Circle(x, y, dx, dy, radius, color, minRadius));
  }
}
function animate() {
  theContext.clearRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(animate);
  circleArray.forEach((element) => {
    element.update();
  });
}

animate();
