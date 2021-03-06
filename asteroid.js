function Asteroid(pos, r) {
  if(r){
    this.r = r * 0.5;
  }else{
    this.r = random(15, 50);
  }

  if(pos){
    this.pos = pos.copy();
  } else {
    do{
      this.pos = createVector(random(width), random(height));
    } while(dist(ship.pos.x, ship.pos.y, this.pos.x, this.pos.y) < this.r * 2 + ship.r);
  }
  
  this.vel = p5.Vector.random2D();
  
  this.total = floor(random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r*0.5, this.r*0.5);
  }

  this.update = function(){
    this.pos.add(this.vel);
  }


  this.render = function() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y)
    // ellipse(0, 0, this.r * 2)
    beginShape()
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    if(SHOW_BOUNDING){
      stroke(0, 225, 0);
      noFill();
      ellipse(0, 0 , this.r * 2);
    }
    pop();
    if(SHOW_BOUNDING){
      velo = this.vel.copy();
      drawArrow(this.pos, velo.mult(this.r), 'red');
      // push();
      // translate(this.pos.x, this.pos.y);
      // stroke('red');
      // strokeWeight(3);
      // line(0, 0, this.vel.x * this.r, this.vel.y * this.r);
      // pop();
    }
  }

  

  this.breakup = function(){
    var newA = [];
    var newPosA = this.pos.copy();
    var newPosA = this.pos.copy();
    newA[0] = new Asteroid(newPosA.add(-(4 + this.r)), this.r);
    newA[1] = new Asteroid(newPosA.add(4 + this.r), this.r);
    return newA;
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
  this.hits = function(ast){
    var d = dist(this.pos.x, this.pos.y, ast.pos.x, ast.pos.y);
    if(d < this.r + ast.r){
        return true;
        console.log("HIT!");
    } else {
        return false;
    }
}
}
