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
let x,y
let velocity = 1.01;