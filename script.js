//Puff Sprite
const puff = document.getElementById('puffs');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 5;
//update puff pos
function updatePuffPos(){
  puff.style.left = `${x}px`;
  puff.style.top = `${y}px`;
} 

//Annoying event listener
document.addEventListener("keyDown", (event) => {
  switch (event.key){
    case "ArrowUp":
    case "w":
      puffY -= speed;
      break;
    
    case "ArrowDown":
    case "s":
      puffY += speed;
      break;

    case "ArrowLeft":
    case "a":
      puffX -= speed;
      break;

    case "ArrowRight":
    case "d":
      puffX += speed;
      break;
  }
  updatePuffPos();
});
updatePuffPos();
