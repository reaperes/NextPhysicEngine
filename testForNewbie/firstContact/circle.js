/**
 * Created by ozt on 2014-09-02.
 */

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var FCEngine = {};


FCEngine.Circle = function(Vx, Vy, theta, radius, mess, pendulem){
    this.m_radius = radius;
    this.m_mess = mess;
    this.m_velX = Vx;
    this.m_velY = Vy;
    this.m_theta = theta;
    this.m_posX = pendulem.m_radius * Math.cos(theta);
    this.m_posY = pendulem.m_radius * Math.sin(theta);
    this.m_pendulum = pendulem;
    this.dx = pendulem.m_radius * theta;
    this.dVx = Math.sqrt(Vx^2 + Vy^2);
    this.k = 20000;
    this.distance = 0;
};

FCEngine.Pendulum = function(x, y, radius){
    this.m_posX = x;
    this.m_posY = y;
    this.m_radius = radius;
};

FCEngine.Circle.prototype.thetaUpdate = function(deltaT){
    this.dVx +=  - 9.8 * Math.sin(this.m_theta) * deltaT;
    this.dx += this.dVx * deltaT;
    this.m_theta = this.dx / this.m_pendulum.m_radius;
};

FCEngine.Circle.prototype.positionUpdate = function(){
    var realTheta = this.m_theta + Math.PI*1.5;
    this.m_posX = this.m_pendulum.m_radius * Math.cos(realTheta);
    this.m_posY = this.m_pendulum.m_radius * Math.sin(realTheta);
};

FCEngine.Circle.prototype.update = function(deltaT){
    this.thetaUpdate(deltaT);
    this.positionUpdate();
};

FCEngine.Circle.prototype.render = function(color){

    context.beginPath();
    context.moveTo(this.m_pendulum.m_posX + this.m_posX, this.m_pendulum.m_posY- this.m_posY);
    context.lineTo(this.m_pendulum.m_posX,  this.m_pendulum.m_posY);
    context.lineWidth = 5;
    context.stroke();
    context.closePath();

    context.beginPath();
    context.arc(this.m_pendulum.m_posX + this.m_posX, this.m_pendulum.m_posY - this.m_posY, this.m_radius, 0, Math.PI * 2 , false);
    context.fill();
    context.fillStyle = 'white';
    context.lineWidth = 5;
    context.stroke();
    context.closePath();

};

FCEngine.Circle.prototype.collisionCheck = function(other){
    var distance = Math.sqrt( (this.m_posX - other.m_posX)^2 + (this.m_posY - other.m_posY)^2 );
    return (distance > this.m_radius + other.m_radius);
};

FCEngine.Circle.prototype.collision = function(other, deltaT){
    var distance = Math.sqrt((this.m_posX - other.m_posX)^2 + (this.m_posY -other.m_posY)^2);
    this.dVx += (-this.k * distance / this.m_mess) * deltaT;
    other.dVx += (this.k * distance / other.m_mess) * deltaT;
};

FCEngine.CircleWorld = function()
{
    this.List = [];
    this.addList = function(circle){
        this.List.push(circle);
    }
};

FCEngine.CircleWorld.prototype.update = function(deltaT){
    for(var i = 0 ; i < this.List.length; ++i){
        for(var j = i ; j < this.List.length; ++j){
            if(this.List[i].collisionCheck(this.List[j])){
                this.List[i].collision(this.List[j], deltaT);
            }
        }
    }


    for(var i = 0 ; i < this.List.length ; ++i)
    {
       this.List[i].update(deltaT);
    }
};

FCEngine.CircleWorld.prototype.render = function(){
    for(var i = 0 ; i < this.List.length ; ++i)
    {
        this.List[i].render();
    }
};




var pendul = new FCEngine.Pendulum(500, 0, 400);
var circle1 = new FCEngine.Circle(0, 0, (30/180)*Math.PI, 50, 5, pendul);
var circle2 = new FCEngine.Circle(10, 0, (0/180)*Math.PI, 50, 5, pendul);
var World = new FCEngine.CircleWorld;
World.addList(circle1);
World.addList(circle2);




var deltaT = 0.1;

window.setInterval(function()
{
    context.fillRect(0, 0, 1000, 1000);
    World.update(deltaT);
    World.render();

}, deltaT );
