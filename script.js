//Puff Sprite
const puff = document.getElementById('puffs');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 0.5;

const keysPressed = {};

let puffVelocityX = 0;
let puffVelocityY = 0;

let gravity = 1;
//The point of this is pretty self-explanatiry
function updatePuffPos() {
    puff.style.left = `${puffX}px`;
    puff.style.top = `${puffY}px`;
  }
//event listener to know when keys are pressed
document.addEventListener("keydown", (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});
//game loop so that it constantly updates
function gameLoop() {
    //things for screen collision
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const puffWidth = puff.offsetWidth;
    const puffHeight = puff.offsetHeight;


    if (keysPressed["arrowup"] || keysPressed["w"]) {
        puffY -= puffSpeed;
        puffVelocityY -= puffSpeed;
    }
    if (keysPressed["arrowdown"] || keysPressed["s"]) {
        puffY += puffSpeed;
        puffVelocityY += puffSpeed;
    }
    if (keysPressed["arrowright"] || keysPressed["d"]) {
        puffX += puffSpeed;
        puffVelocityX += puffSpeed;
      }
    if (keysPressed["arrowleft"] || keysPressed["a"]) {
        puffX -= puffSpeed;
        puffVelocityX -= puffSpeed;
    }

    // Collision
    if (puffX < 0) puffX = 0;
    if (puffY < 0) puffY = 0; gravity = 0;
    if (puffX > screenWidth - puffWidth) puffX = screenWidth - puffWidth;
    if (puffY > screenHeight - puffHeight) puffY = screenHeight - puffHeight;

      puffVelocityX *= 0.95;
      puffVelocityY += gravity;
      puffX += puffVelocityX;
      puffY += puffVelocityY;

    updatePuffPos();
    requestAnimationFrame(gameLoop);
}
updatePuffPos();
gameLoop();
