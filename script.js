//Puff Sprite
const puff = document.getElementById('puffs');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 5;

const keysPressed = {};
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
    }
    if (keysPressed["arrowdown"] || keysPressed["s"]) {
        puffY += puffSpeed;
    }
    if (keysPressed["arrowright"] || keysPressed["d"]) {
        puffX += puffSpeed;
      }
    if (keysPressed["arrowleft"] || keysPressed["a"]) {
        puffX -= puffSpeed;
    }

    // Collision
    if (puffX < 0) puffX = 0;
    if (puffY < 0) puffY = 0;
    if (puffX > screenWidth - puffWidth) puffX = screenWidth - puffWidth;
    if (puffY > screenHeight - puffHeight) puffY = screenHeight - puffHeight;

    updatePuffPos();
    requestAnimationFrame(gameLoop);
}
updatePuffPos();
gameLoop();
