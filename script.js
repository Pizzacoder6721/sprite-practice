// Puff Sprite
const puff = document.getElementById('puffs');
const platform = document.getElementById('platform');

// Movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 0.5;
let jumpForce = -10;

const keysPressed = {};

let puffVelocityX = 0;
let puffVelocityY = 0;
let gravity = 0;
let onGround = false;

// Update Puff Position
function updatePuffPos() {
  puff.style.left = `${puffX}px`;
  puff.style.top = `${puffY}px`;
}

// Event listeners
document.addEventListener("keydown", (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

// Overlap check
function isOverlapping(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Game loop
function gameLoop() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const puffWidth = puff.offsetWidth;
  const puffHeight = puff.offsetHeight;

  // Controls
  if ((keysPressed["arrowup"] || keysPressed["w"]) && onGround) {
    gravity = jumpForce;
    onGround = false;
  }
  if (keysPressed["arrowright"] || keysPressed["d"]) {
    puffVelocityX += puffSpeed;
  }
  if (keysPressed["arrowleft"] || keysPressed["a"]) {
    puffVelocityX -= puffSpeed;
  }

  // Apply gravity
  if (!onGround) gravity += 0.3;

  puffVelocityX *= 0.95;
  puffVelocityY = gravity;
  puffX += puffVelocityX;
  puffY += puffVelocityY;

  // Screen bottom collision
  if (puffY > screenHeight - puffHeight) {
    puffY = screenHeight - puffHeight;
    gravity = 0;
    onGround = true;
  }

  // Platform collision
  if (isOverlapping(puff, platform)) {
    const puffRect = puff.getBoundingClientRect();
    const platformRect = platform.getBoundingClientRect();
  
    if (puffRect.bottom == platformRect.top) {
      gravity = 0;
      onGround = true;
    }
  } else if (puffY < window.innerHeight - puff.offsetHeight) {
    // Not on platform or ground → start falling
    onGround = false;
  }

  // Screen edges
  if (puffX < 0) puffX = 0;
  if (puffX > screenWidth - puffWidth) puffX = screenWidth - puffWidth;

  updatePuffPos();
  requestAnimationFrame(gameLoop);
}

updatePuffPos();
gameLoop();
