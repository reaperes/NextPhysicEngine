/**
 * Created by ozt on 2014-08-23.
 */

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var deltaT = 0.05;

var Physics = {};

Physics.objects = [];
Physics.collisionObjects = [];
Physics.addObject = function(object, isCollision){
    this.objects.push(object);
    if(isCollision){
        this.collisionObjects.push(object);
    }
};

Physics.update = function(deltaT){
  for(var i = 0 ; i < this.objects.length ; ++i){
      var object = this.objects[i];
      if(object.isVisible == false){
          this.objects.splice(i,1);
      }
      else{
          object.update(deltaT);
      }
  }
};

Physics.render = function(){
    context.clearRect(0, 0, 1000, 1000);
    for(var i = 0 ; i < this.objects.length ; ++i){
        this.objects[i].render();
    }
};

Physics.collisionCheck = function(){
  for(var i =0 ;i < this.collisionObjects.length; ++i){
      var object = this.collisionObjects[i];
      if(object.isVisible == false){
          this.collisionObjects.splice(i,1);
      }
      object.forceX = 0;
      object.forceY = 0;
   }

  for(var i = 0 ; i < this.collisionObjects.length ; ++i){
        for(var j = i + 1 ; j < this.collisionObjects.length; ++j){
            var subject = this.collisionObjects[i];
            var object = this.collisionObjects[j];
            var distance = Math.sqrt(Math.pow(subject.positionX - object.positionX, 2 ) + Math.pow(subject.positionY - object.positionY, 2));
            console.log(distance);
            if(distance < subject.radius + object.radius){

                subject.collisionOccur(object);
                object.collisionOccur(subject);
            }
        }
    }
};

var Pendulum = function(radius, centerX, centerY, circle) {
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
    this.positionX = circle.positionX;
    this.positionY = circle.positionY;
    this.elect = 0.45;
};

Pendulum.prototype.update = function(deltaT){
    this.positionX = circle.positionX;
    this.positionY = circle.positionY;
};

Pendulum.prototype.render = function(){
    context.moveTo(this.positionX, this.positionY);
    context.lineTo(this.centerX, this.centerY);
    context.lineWidth = 5;
    context.stroke();
};
var Circle  = function(mess, radius, positionX, positionY, elect) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.forceX = 0;
    this.forceY = 0;
    this.radius = radius;
    this.mess = mess;
    this.forces = [];
    this.elect = 0.1;
    this.isVisible = true;
};

Circle.prototype.positionUpdate = function(deltaT){
    this.positionX += this.velocityX * deltaT;
    this.positionY += this.velocityY * deltaT;
    if(this.positionX > 1000 || this.positionY > 1000){
        this.isVisible = false;
    }
};

Circle.prototype.velocityUpdate = function(deltaT){
    this.velocityX += (this.forceX/this.mess) * deltaT;
    this.velocityY += (this.forceY/this.mess) * deltaT;
};
Circle.prototype.forceUpdate = function(){
    for(var i = 0 ; i < this.forces.length ; ++i){
     this.forceX += this.forces[i].vector(this)[0];
     this.forceY += this.forces[i].vector(this)[1];
    }
};

Circle.prototype.collisionOccur = function(object){
    var distance = Math.sqrt(Math.pow((this.positionX - object.positionX),2) + Math.pow(this.positionY+ object.positionY, 2));
    var theta = Math.atan((this.positionX - object.positionX) / (this.positionY - object.positionY));
    var x = this.radius + object.radius - distance;
    var collisionForceScala = this.elect * x;
    this.forceX +=  theta < 0 ? -collisionForceScala*Math.cos(theta): collisionForceScala*Math.cos(theta) ;
    this.forceY += theta < 0 ? -collisionForceScala* Math.sin(theta): collisionForceScala*Math.sin(theta);
};

Circle.prototype.render = function()
{
    context.beginPath();
    context.arc( this.positionX, this.positionY, this.radius, 0, Math.PI * 2 , false);
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = 'white';
    context.lineWidth = 5;
    context.stroke();
    context.font = "30px Arial";
    context.fillStyle = 'black';
    context.fillText(this.forceX.toString() + "" + this.forceY.toString(),10,50);
    context.closePath();
};

Circle.prototype.update = function(deltaT)
{
    this.forceUpdate(deltaT);
    this.velocityUpdate(deltaT);
    this.positionUpdate(deltaT);
};

var GravityForce = function(){
};

GravityForce.prototype.vector = function(){
    return [0, 9.8];
};

var TensionForce = function( otherObject){
    this.other = otherObject;
};

TensionForce.prototype.vector = function(object){
    var distance = Math.sqrt(Math.pow(object.positionX- this.other.centerX, 2) + Math.pow(object.positionY- this.other.centerY, 2));

    if(distance > this.other.radius){
        var forceScala = this.other.elect*(distance - this.other.radius);
        var theta = Math.atan( (object.positionY - this.other.centerY)  /  (object.positionX - this.other.centerX ));

        var forceX = theta > 0 ? -forceScala*Math.cos(theta): forceScala*Math.cos(theta) ;
        var forceY = theta > 0 ? -forceScala* Math.sin(theta): forceScala*Math.sin(theta);
        return [forceX, forceY];
    }
    else{
        return [0,0];
    }
};


var circle = new Circle(10, 50, 100, 100);
var pen = new Pendulum(400, 500, 0, circle);
var gravity = new GravityForce();
var tension = new TensionForce( pen);
circle.forces.push(gravity);
circle.forces.push(tension);
Physics.addObject(circle, true);
Physics.addObject(pen, false);

var makeCircles = function(){
    var circles = new Circle(3, 20, Math.random()*800, 0, 0.01);
    circles.forces.push(gravity);
    Physics.addObject(circles, true);
};

var circleFactory = {};
circleFactory.accTime = 0;
circleFactory.checkTime = 10;
circleFactory.update = function(deltaT){
    this.accTime += deltaT;
    if(this.accTime > this.checkTime){
        this.accTime = 0;
        makeCircles();
    }
};


window.setInterval(function()
{
    circleFactory.update(deltaT);
    Physics.update(deltaT);
    Physics.collisionCheck();
    Physics.render();
},deltaT);
