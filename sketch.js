var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var health = 3;
const MAX_HEALTH = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for(var i = 0; i < 5; i++){
  asteroids.push(new Asteroid());
  }
  pixelDensity(1);
  // noCursor();
}

function draw() {
  background(0);
  
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])){
      health--;
      if(health > 0){
        ship = new Ship();
      }else {
        ship.isDismiss = true;
      }
      
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
          //score++;
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

  if(ship.isDismiss == false){
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }
 
  
  if(asteroids.length == 0){
    gameover();
  }
  if(health <= 0){
    gameover();
  }
  
  push();
  textSize(35);
  fill(255);
  textAlign(CENTER, CENTER);
  text(score, 40, 30); //Score counter
  pop();

  //Health counter
  push();
  translate((MAX_HEALTH * 0.5 * ship.r) + (health * -ship.r * 0.5) + 0.5*ship.r + 10, 60);
  for (i = 0; i < health; i++) {
    push();
    translate(ship.r * i, 0);
    fill(0);
    stroke(255);
    scale(0.4);
    triangle(-ship.r, ship.r, ship.r, ship.r, 0, -ship.r);
    pop();
  }
  pop()

}

function gameover(){
  push();
  textSize(windowWidth * 0.1);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  text("GAME OVER",0 , height/2, width);
  pop();
}


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
    if(ship.isDismiss == false){
      lasers.push(new Laser(ship.pos, ship.heading));
    }
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