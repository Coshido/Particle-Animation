const canvas = document.createElement("canvas");
canvas.classList.add("matrix-canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let body = document.querySelector("body");
body.appendChild(canvas);

let gradient = context.createLinearGradient(
  canvas.width / 2,
  0,
  canvas.width / 2,
  canvas.height
);
gradient.addColorStop(0, "#0AFF0A");
gradient.addColorStop(0.1, "#38FE08");
gradient.addColorStop(0.2, "#67FD07");
gradient.addColorStop(0.3, "#95FC05");
gradient.addColorStop(0.4, "#C4FB04");
gradient.addColorStop(0.5, "#F2FA02");
gradient.addColorStop(0.6, "#F4C802");
gradient.addColorStop(0.7, "#F59702");
gradient.addColorStop(0.8, "#F76502");
gradient.addColorStop(0.9, "#F83402");
gradient.addColorStop(1, "#FA0202");

class Character {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw() {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.99) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasHeight, canvasWidth) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.fontSize = 20;
    this.column = this.canvasWidth / this.fontSize;
    this.character = [];
    this.#initialize();
  }
  #initialize() {
    for (let i = 0; i < this.column; i++) {
      this.character[i] = new Character(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(height, width) {
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.column = this.canvasWidth / this.fontSize;
    this.character = [];
    this.#initialize();
  }
}
const effect = new Effect(canvas.height, canvas.width);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.textAlign = "center";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = gradient; //"#0aff0a";
    context.font = effect.fontSize + "px monospace";
    effect.character.forEach((char) => char.draw(context));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  effect.resize(canvas.height, canvas.width);
});

export default Character;
export { Effect };
