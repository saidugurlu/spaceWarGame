const gameArea = document.querySelector(".gameArea");
const spaceShip = document.querySelector(".spaceShip");
const pScore = document.querySelector(".score p");

//sounds effects
let laser = new Audio("./sounds/laser-shot.mp3");
let rockExplosion = new Audio("./sounds/rock-explosion.wav");
let shipExplosion = new Audio("./sounds/ship-explosion.wav");

// game variables
let move;
let score = 0;
let x, y;
let velocity = 1.01;

// create stars for backround
for (let a = 1; a <= 1000; a++) {
  const star = document.createElement("div");
  let x = Math.floor(Math.random() * window.innerWidth);
  let y = Math.floor(Math.random() * window.innerHeight);
  star.style.top = y + "px";
  star.style.left = x + "px";
  star.classList.add("stars");
  let starSize = Math.floor(Math.random() * 3);
  star.style.width = starSize + "px";
  star.style.height = starSize + "px";
  star.style.background = starSize < 4 ? "lightgray" : "white";
  gameArea.appendChild(star);
}
