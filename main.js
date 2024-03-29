const gameArea = document.querySelector(".gameArea");
const spaceShip = document.querySelector(".spaceShip");
const pScore = document.querySelector(".score p");
const modal = document.querySelector(".modal");
const startButton = document.querySelector(".startGame");
let isPlaying = false;
const scoreList = document.querySelector(".listGroup");
document.addEventListener("DOMContentLoaded", addScoresToUI);

//sounds effects
let laser = new Audio("../sounds/laserShot.wav");
let rockExplosion = new Audio("../sounds/rockExplosion.wav");
let shipExplosion = new Audio("../sounds/shipExplosion.wav");

// global game variables
let move;
let x, y;
let score = 0;
let velocity = 1.01;

// create stars for backround------------------------------------------------------------
for (let a = 1; a <= 1000; a++) {
  const star = document.createElement("div");
  x = Math.floor(Math.random() * window.innerWidth);
  y = Math.floor(Math.random() * window.innerHeight);
  star.style.top = y + "px";
  star.style.left = x + "px";
  star.classList.add("stars");
  let starSize = Math.floor(Math.random() * 3);
  star.style.width = starSize + "px";
  star.style.height = starSize + "px";
  star.style.background = starSize < 2 ? "lightgray" : "white";
  gameArea.appendChild(star);
}

// Ship movements-----------------------------------------------------------------------
gameArea.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY;
  spaceShip.style.left = x + "px";
  if (y > window.innerHeight / 3) {
    spaceShip.style.top = y + "px";
  }
});

// Creation of a laser gun-----------------------------------------------------------------
const createBullet = () => {
  velocity = velocity + 0.5;
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = x + "px";
  bullet.style.top = y - 40 + "px";
  gameArea.appendChild(bullet);
  laser.play();
  laser.currentTime = 0;

  // Meet checking with roks and bullet-----------------------------------------------------
  setInterval(() => {
    let rocks = document.querySelectorAll(".rock");
    for (let i = 0; i < rocks.length; i++) {
      let rock = rocks[i];
      let rockBounds = rock.getBoundingClientRect();
      let bulletBounds = bullet.getBoundingClientRect();
      if (
        bulletBounds.left >= rockBounds.left &&
        bulletBounds.right <= rockBounds.right &&
        bulletBounds.top <= rockBounds.top &&
        bulletBounds.bottom <= rockBounds.bottom
      ) {
        gameArea.removeChild(bullet);
        setTimeout(() => {
          gameArea.removeChild(rock);
          score = score + 10;
          pScore.textContent = score;
        }, 500);
        rockExplosion.play();
        rockExplosion.currentTime = 0;
        rock.style.backgroundImage = "url(./images/rockExplosion.png)";
      }
    }

    let bulletTop = parseInt(
      window.getComputedStyle(bullet).getPropertyValue("top")
    ); // px out
    bullet.style.top = bulletTop - 6 + "px";
    if (bulletTop < 0) {
      gameArea.removeChild(bullet); // so that HTML does not slow down
    }
  });
};
gameArea.addEventListener("click", () => {
  createBullet();
});

window.addEventListener("keydown", (e) => {
  if (isPlaying && e.key === " ") {
    createBullet();
  }
});

// Bullet clear--------------------------------------------------------------
// function bulletClear() {

//   console.log(bullets)
//   console.log([...bullets])

//   if ([...bullets].length > 5) {
//     window.removeChild([...bullets][0]);
//   }
// }
// bulletClear();

// Creating rocks, and rocks moves-------------------------------------------------------------
const rockMove = () => {
  move = setInterval(() => {
    let rock = document.createElement("div");
    let imgNumber = Math.floor(Math.random() * 3) + 1;
    rock.classList.add("rock");
    rock.style.background = `url(./images/meteorite-${imgNumber}.png) no-repeat`;
    rock.style.backgroundSize = "cover";
    let left = Math.floor(Math.random() * window.innerWidth);
    rock.style.left = left + "px";
    rock.style.top = -50 + "px";
    gameArea.appendChild(rock);

    let rockCount = document.querySelectorAll(".rock");
    for (let i = 0; i < rockCount.length; i++) {
      let rockTop = parseInt(
        window.getComputedStyle(rockCount[i]).getPropertyValue("top")
      );
      let rockBottom = parseInt(
        window.getComputedStyle(rockCount[i]).getPropertyValue("top")
      );

      rockCount[i].style.top = rockTop + 20 + "px";
      let mainFrame = gameArea.getBoundingClientRect();
      if (rockBottom > mainFrame.bottom - 50) {
        setTimeout(() => {
          gameArea.removeChild(rockCount[i]);
          modal.classList.remove("closeModal");
        }, 600);
        rockExplosion.play();
        rockExplosion.currentTime = 0;
        rockCount[i].style.backgroundImage = "url(./images/rockExplosion.png)";
        isPlaying = false;
        gameOver();
        clearInterval(move);
      }
    }
    checkCraftCollition();
    // checkCraftCollition1();
  }, 450 / velocity);
};

// Meet checking with roks and ship, ship and bottom------------------------------------------------
const checkCraftCollition = () => {
  let rocks = document.querySelectorAll(".rock");
  {
    for (let i = 0; i <= rocks.length; i++) {
      let rock = rocks[i];
      let rockBounds = rock.getBoundingClientRect(); //gives location
      let shipBounds = spaceShip.getBoundingClientRect();
      if (
        shipBounds.left <= rockBounds.left &&
        shipBounds.right >= rockBounds.right &&
        shipBounds.top <= rockBounds.top &&
        shipBounds.bottom >= rockBounds.bottom
      ) {
        setTimeout(() => {
          modal.classList.remove("closeModal");
        }, 450);
        shipExplosion.play();
        shipExplosion.currentTime = 0;
        spaceShip.style.backgroundImage = "url(./images/shipExplosion.png)";
        isPlaying = false;
        gameOver();
        clearInterval(move);
      }
    }
  }
};

// const checkCraftCollition1 = () => {
//   let rocks = document.querySelectorAll(".rock");
//   {
//     for (let i = 0; i <= rocks.length; i++) {
//       let rock = rocks[i];
//       let rockBounds = rock.getBoundingClientRect(); //gives location
//       let shipBounds = spaceShip.getBoundingClientRect();
//       const rockCenterx = (rockBounds.left + rockBounds.right) / 2;
//       const rockCentery = (rockBounds.top + rockBounds.bottom) / 2;
//       const shipCenterx = (shipBounds.left + shipBounds.right) / 2;
//       const shipCentery = (shipBounds.top + shipBounds.bottom) / 2;

//       if (
//         Math.abs(rockCenterx - shipCenterx) <= 1.5 ||
//         Math.abs(rockCentery - shipCentery) <= 1.5
//       ) {
//         setTimeout(() => {
//           modal.classList.remove("closeModal");
//         }, 450);
//         shipExplosion.play();
//         shipExplosion.currentTime = 0;
//         spaceShip.style.backgroundImage = "url(./images/shipExplosion.png)";
//         clearInterval(move);
//         isPlaying = false;
//       }
//     }
//   }
// };

// Start Button------------------------------------------------------------------------------------------
startButton.addEventListener("click", () => {
  document.querySelectorAll(".rock ").forEach((item) => {
    gameArea.removeChild(item);
  });
  spaceShip.style.left = "50%";
  spaceShip.style.bottom = "-30px";
  velocity = 1.01;
  modal.classList.add("closeModal");
  score = 0;
  pScore.textContent = score;
  spaceShip.style.backgroundImage = "url(./images/spaceShip.png)";
  isPlaying = true;
  rockMove();
});
// Score from localStorage to UI--------------------------------------------------------------------------

function addScoresToUI() {
  let scores = getScoresFromStorage();
  scores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.className = "listItem";
    listItem.innerHTML = score;
    scoreList.appendChild(listItem);
  });
}

// Game Over----------------------------------------------------------------------------------
function gameOver() {
  // add score localStorage----------------------
  addScoreToStorage(score);
  function addScoreToStorage(e) {
    let scores = getScoresFromStorage();
    scores.push(e);
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  // Delete from localStorage ------------------------------
  let scores = getScoresFromStorage();
  deleteScoreFromStorage(scores);

  function deleteScoreFromStorage(scores) {
    scores.forEach(function (score, i) {
      if (scores.length > 3) {
        scores.splice(Math.min(score)[i], 1);
        scores.sort(function (a, b) {
          return b - a;
        });
      }
    });
    localStorage.setItem("scores", JSON.stringify(scores));
  }
}
// get from localStorage ----------------------
function getScoresFromStorage() {
  let scores;
  if (localStorage.getItem("scores") === null) {
    scores = [];
  } else {
    scores = JSON.parse(localStorage.getItem("scores"));
  }
  return scores;
}
