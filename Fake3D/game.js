const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 800;
context.canvas.width = 1220;

// Start the frame count at 1
let frameCount = 1;
// Set the number of obstacles to match the current "level"
let obCount = frameCount;
// Create a collection to hold the generated x coordinates
const obXCoors = [];

const square = {

  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0

};

const ArrayOfEnemies = [{x:50, y:100}, {x:500, y:300}, {x:134, y:600}, {x:450, y:740}, {x:400, y:0}];

const PlayerPoint = {x:400, y:800};

for(var i = 0; i < 20; i++){
    ArrayOfEnemies.push({x: Math.random() * context.canvas.width , y: Math.random() * context.canvas.height});
}



// Create the obstacles for each frame
const nextFrame = () => {
  // increase the frame / "level" count
  frameCount++;
  
  for (let i = 0; i < obCount; i++) {
    // Randomly generate the x coordinate for the top corner start of the triangles
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }

}

const controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37:// left key
        controller.left = key_state;
        break;
      case 38:// up key
        controller.up = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;

    }

  }

};

const loop = function () {

 
  // Creates the backdrop for each frame
  context.fillStyle = "#201A23";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height); // x, y, width, height


  ArrayOfEnemies.forEach(element => {
         // Creates and fills the cube for each frame
    context.fillStyle = "#FFFFFF"; // hex for cube color
    context.beginPath();
    const distX = Math.abs(element.x - PlayerPoint.x);
    const distY = Math.abs(element.y - PlayerPoint.y);
 
    const totalDistance = Math.sqrt(Math.pow(distX,2) + Math.pow(distY, 2));

    const calcY = 6000 / distY + 200;
    // const calcY = distY;
    context.rect(element.x, calcY, 3000/distY , 3000/distY );
    context.fill();

    let fontsize = 15;
    context.font = fontsize/(distY/100) + "px Arial";
    context.fillText(Math.round(calcY), element.x, calcY);

    if(element.y < 800)
        element.y += 1;
  });


 


  // Create the obstacles for each frame
  // Set the standard obstacle height
//   const height = 200 * Math.cos(Math.PI / 6);

  context.fillStyle = "#FBF5F3"; // hex for triangle color
    context.beginPath();

    context.moveTo(PlayerPoint.x, PlayerPoint.y); // x = random, y = coor. on "ground"
    context.lineTo(PlayerPoint.x + 20, PlayerPoint.y); // x = ^random + 20, y = coor. on "ground"
    context.lineTo(PlayerPoint.x + 10, PlayerPoint.y - 20); // x = ^random + 10, y = peak of triangle
  
    context.closePath();
    context.fill();


  // Creates the "ground" for each frame
//   context.strokeStyle = "#2E2532";
//   context.lineWidth = 30;
//   context.beginPath();
//   context.moveTo(0, 385);
//   context.lineTo(1220, 385);
//   context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);