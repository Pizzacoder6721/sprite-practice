//Puff Sprite
const puff = document.getElementById('puffs');
//movement
let puffX = 0;
let puffY = 0;
const puffSpeed = 5;
//update puff pos
function updatePuffPos(){
  puff.style.left = `${puffX}px`;
  puff.style.top = `${puffY}px`;
} 

//Annoying event listener
document.addEventListener("keydown", (event) => {
  switch (event.key){
    case "ArrowUp":
    case "w":
      puffY -= puffSpeed;
      break;
    
    case "ArrowDown":
    case "s":
      puffY += puffSpeed;
      break;

    case "ArrowLeft":
    case "a":
      puffX -= puffSpeed;
      break;

    case "ArrowRight":
    case "d":
      puffX += puffSpeed;
      break;
  }
  updatePuffPos();
});
updatePuffPos();
