//Puff Sprite
const puff = document.getElementById('puffs');
const gun = document.getElementById('gun');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 1;

const keysPressed = {};

let puffVelocityX = 0;
let puffVelocityY = 0;

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function updatePuffPos() {
    puff.style.left = `${puffX}px`;
    puff.style.top = `${puffY}px`;

    // Update gun rotation
    const puffRect = puff.getBoundingClientRect();
    const puffCenterX = puffRect.left + puffRect.width / 2;
    const puffCenterY = puffRect.top + puffRect.height / 2;

    const dx = mouseX - puffCenterX;
    const dy = mouseY - puffCenterY;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    gun.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
}

//event listener to know when keys are pressed
document.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
    console.log(`Key down: ${event.key}`);
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
        puffVelocityY -= puffSpeed;
    }
    if (keysPressed["arrowdown"] || keysPressed["s"]) {
        puffVelocityY += puffSpeed;
    }
    if (keysPressed["arrowright"] || keysPressed["d"]) {
        puffVelocityX += puffSpeed;
      }
    if (keysPressed["arrowleft"] || keysPressed["a"]) {
        puffVelocityX -= puffSpeed;
    }

    // Collision
    if (puffX < 0) puffX = 0;
    if (puffY < 0) puffY = 0;
    if (puffX > screenWidth - puffWidth) puffX = screenWidth - puffWidth;
    if (puffY > screenHeight - puffHeight) puffY = screenHeight - puffHeight;

      puffVelocityX *= 0.95;
      puffVelocityY *= 0.95;
      puffX += puffVelocityX;
      puffY += puffVelocityY;

    updatePuffPos();
    requestAnimationFrame(gameLoop);
}
updatePuffPos();
gameLoop();
