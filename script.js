//Puff Sprite
const puff = document.getElementById('puffs');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 5;

const keysPressed = {};

function updatePuffPos() {
    puff.style.left = `${puffX}px`;
    puff.style.top = `${puffY}px`;
  }

document.addEventListener("keydown", (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

function gameLoop() {
  if(keysPressed["arrowup"] || keysPressed["w"]){
    puffY -= puffSpeed;
  }
  if(keysPressed["arrowdown"] || keysPressed["s"]){
    puffY += puffSpeed;
  }
  if(keysPressed["arrowright"] || keysPressed["d"]){
    puffX += puffSpeed;
  }
  if(keysPressed["arrowleft"] || keysPressed["a"]){
    puffX -= puffSpeed
  }

  updatePuffPos();
  requestAnimationFrame(gameLoop);
}
updatePuffPos();
gameLoop();
