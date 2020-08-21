function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = -PI / 2;
  this.rotation = 0;
  this.vel = createVector(0, 0)
  this.isBoosting = false;
  // this.isDismiss = false;
  this.explodeTime = 0;
  this.isExploding = false;
  this.isRender = true;

  this.boosting = function(b) {
    this.isBoosting = b;
  }


  this.update = function() {
    if(this.explodeTime > 0) {
      this.isExploding = true;
    }
    if (this.isBoosting) {
      this.boost();
    }
    if(!this.isExploding){
      this.pos.add(this.vel);
    }
    this.vel.mult(0.99);
    this.explodeTime--;
  }

  
  this.boost = function() {
    if(!this.isExploding){
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(0.1);
      this.vel.add(force);
    }
    
  }

this.hits = function(asteroid){
  var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
  if(d < this.r + asteroid.r){
    this.explode;
    return true;
    
  } else {
    return false;
  }
}

  this.explode = function() {
    this.explodeTime = Math.ceil(SHIP_EXPLODE_TIME * FPS);
  }

  this.render = function() {
    if(this.isRender == true){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    if(this.isExploding == false){
      push();
      fill(0);
      stroke(255);
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      if(SHOW_CENTER_CIRCLE == true){
      ellipse(0, 0, this.r * 0.5);
      console.log("RENDER");
      }
      pop();
      if(this.isBoosting == true){
      push();
      // translate(this.pos.x, this.pos.y);
      // rotate(this.heading + PI / 2);
      fill(50);
      stroke(255);
      triangle(-this.r * 0.5, this.r, this.r * 0.5, this.r, 0, this.r*2);
      pop();
      console.log(this.isBoosting);
      }
      
    } else {
      push();
      noStroke();
      scale(1.5);
      fill(139, 0, 0);
      ellipse(0, 0 , this.r * 1.7);
      fill(255, 0, 0);
      ellipse(0, 0 , this.r * 1.4);
      fill(255, 165, 0);
      ellipse(0, 0 , this.r * 1.1);
      fill(255, 255, 0);
      ellipse(0, 0 , this.r * 0.8);
      fill(255, 255, 255);
      ellipse(0, 0 , this.r * 0.5);
      pop();
    }
    pop();
  
  if(SHOW_BOUNDING){
    push();
    translate(this.pos.x, this.pos.y);
    stroke(0, 225, 0);
    noFill();
    ellipse(0, 0 , this.r * 2);
    pop();
  }
}

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }


  this.setRotation = function(a) {
    this.rotation = a
  }

  this.turn = function() {
    this.heading += this.rotation;
  }
}
}