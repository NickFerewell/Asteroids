var ship;
var asteroids = [];
var lasers = [];
var score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for(var i = 0; i < 5; i++){
  asteroids.push(new Asteroid());
  }
  pixelDensity(1);
  noCursor();
}

function draw() {
  background(0);
  
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])){
      console.log("Ooops!")
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()){
      lasers.splice(i, 1);
    } else {
    for (var j = asteroids.length - 1; j >= 0; j--) {
      if(lasers[i].hits(asteroids[j])){
        if(asteroids[j].r > 10){
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }else{
          //increase the score
          // score++;
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        score++;
        break;
      }
    }
  }
  }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  
  if(asteroids.length == 0){
    gameover();
  }
  
  push();
  textSize(35);
  fill(255);
  textAlign(CENTER, CENTER);
  text(score, 30, 30); //Score counter
  pop();
}

function gameover(){
  push();
  textSize(windowWidth * 0.1);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  text("GAME OVER",0 , height/2, width);
  console.log(width);
  pop();
}
  push();
  textSize(100);
  fill(255);
  text(score, 10, 30);
  pop();

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
  ship.setRotation(0);
} else if (keyCode == LEFT_ARROW) {
  ship.setRotation(0);
} else if (keyCode == UP_ARROW) {
  ship.boosting(false);
}
}

function keyPressed() {
  if(key == " "){
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if (keyCode ==76){ //asteroid cheat 'L'
    asteroids.length = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}