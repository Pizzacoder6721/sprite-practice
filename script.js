//Puff Sprite
const puff = document.getElementById('puffs');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 0.5;
let jumpForce = -10;

const keysPressed = {};

let puffVelocityX = 0;
let puffVelocityY = 0;

let gravity = 0;

let onGround = false;
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


    if ((keysPressed["arrowup"] || keysPressed["w"]) && onGround) {
        gravity = jumpForce;
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
    if (puffY > screenHeight - puffHeight) {puffY = screenHeight - puffHeight; onGround = true;}

    const platform = document.getElementById('platform');
    
    // Platform collision
    if (isOverlapping(puff, platform)) {
        const puffRect = puff.getBoundingClientRect();
        const platformRect = platform.getBoundingClientRect();
        if (puffRect.bottom >= platformRect.top && gravity >= 0) {
            puffY = platformRect.top - puff.offsetHeight; // Land on top
            gravity = 0;
            onGround = true;
        }
    }     
    else{
        onGround = false;
    }
    if (!onGround){
        gravity += 0.3;
    }
    puffVelocityX *= 0.95;
    puffVelocityY = gravity;
    puffX += puffVelocityX;
    puffY += puffVelocityY;

    updatePuffPos();
    requestAnimationFrame(gameLoop);
    console.log(gravity);
    console.log(onGround);
    console.log(puffVelocityY);
}
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
updatePuffPos();
gameLoop();
