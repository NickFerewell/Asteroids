var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var health = 3;
const MAX_HEALTH = 3;
SHOW_BOUNDING = false; //show or hide collision bounding
const FPS = 60;
const SHIP_EXPLODE_TIME = 0.3;
const SHOW_CENTER_CIRCLE = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  health = MAX_HEALTH;
  for(var i = 0; i < 5; i++){
  asteroids.push(new Asteroid());
  }
  pixelDensity(1);
  frameRate(FPS);
  // noCursor();
}

console.log(asteroids);

function draw() {
  background(0);
  
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])){
      health--;
      if(health > 0){
        
          ship = new Ship();
          console.log("NEW SHIP");
        
       
        
      }else {
        // ship.isDismiss = true;
        // ship.isExploding = true;
      }
      
      console.log("Ooops!")
    }
    
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = 0; i < asteroids.length; i++) {
    for( var j = 0; j < asteroids.length; j++){
      if(asteroids[i].hits(asteroids[j])){
        if(i != j){
          // rand = random();
          // if(rand <0.25){
            asteroids[i].vel = p5.Vector.random2D();
            let v = asteroids[i].vel.copy();
            asteroids[j].vel = v.mult(-1);
            // } while(пересечение векторов скоростей);
            console.log("collision");
          
        
        
        }
      }
    }
    
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


  // console.log(lasers.length);

  // if(ship.isDismiss == false){
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  // }
 
  
  if(asteroids.length == 0){
    gameover();
  }
  if(health <= 0){
    ship.isRender = false;
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
    if(ship.isExploding == false){
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
  } else if (keyCode ==114){ //turn bounding 'F3'
  SHOW_BOUNDING = !SHOW_BOUNDING;
  console.log(SHOW_BOUNDING);
  return false;
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}