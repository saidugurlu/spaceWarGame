const gameArea = document.querySelector(".gameArea");
const spaceShip = document.querySelector(".spaceShip");
const pScore = document.querySelector(".score p");

//sounds effects
let laser = new Audio("./sounds/laser-shot.mp3");
let rockExplosion = new Audio("./sounds/rock-explosion.wav");
let shipExplosion = new Audio("./sounds/ship-explosion.wav");

// game variables
let move, x, y , starSize;
let score = 0;
let velocity = 1.01;

// create stars for backround
for (let a = 1; a <= 1000; a++) {
  const star = document.createElement("div");
  x = Math.floor(Math.random() * window.innerWidth);
  y = Math.floor(Math.random() * window.innerHeight);
  star.style.top = y + "px";
  star.style.left = x + "px";
  star.classList.add("stars");
  starSize = Math.floor(Math.random() * 3);
  star.style.width = starSize + "px";
  star.style.height = starSize + "px";
  star.style.background = starSize < 2 ? "lightgray" : "white";
  gameArea.appendChild(star);
}

//  Ship movements
gameArea.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY;
  spaceShip.style.left = x + "px";
  if (y > window.innerHeight / 4) {
    spaceShip.style.top = y + "px";
  }
});

// Creation of a laser gun
gameArea.addEventListener("click", () => {
  velocity = velocity + 0.5;
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = x + 42 + "px";
  bullet.style.top = y - 11 + "px";
  gameArea.appendChild(bullet);
  setInterval(() => {
    let bulletTop = parseInt(window.getComputedStyle(bullet).getPropertyValue("top"));
    bullet.style.top = bulletTop - 5 + "px";
    if (bulletTop < 0) {
      gameArea.removeChild(bullet);
    }
  });
});
