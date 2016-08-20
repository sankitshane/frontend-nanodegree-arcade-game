// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.rate = 100 + Math.floor(Math.random()*150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);
    if(this.x >500)
    {
      this.x = -100;
    }
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20))
    {
      star.reset();
      player.reset();
      selector.stat = false;
      star.count = 0;
    }
};

Enemy.prototype.reset = function() {
  this.x = 0 - Math.random()*200;
};

Enemy.prototype.increaseRate = function() {
  this.rate += 50;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y){
  this.play ='images/char-boy.png';
  this.x = x;
  this.y = y;

};

player.prototype.reset = function() {
  this.play ='images/char-boy.png';
  this.x = 200;
  this.y = 380;
  selector.reset();
};

player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    document.getElementsByClassName('score')[0].innerHTML = star.count;
};

player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.play), this.x, this.y);
};

player.prototype.handleInput= function(key){
  switch(key)
  {
    case 'left' : this.x = this.x - 101;
          break;
    case 'up' : this.y = this.y -80;
          break;
    case 'down' : this.y = this.y +80;
          break;
    case 'right':this.x = this.x + 101;
          break;
  }

  if(this.x <0)
  {
    this.x =0;
  }
  if(this.x >405)
  {
    this.x = 405;
  }
  if(this.y <80)
  {
    this.y = 60;
  }
  if(this.y > 400)
  {
    this.y = 380;
  }
};

var star = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/Star.png';
  this.count = 0;
};

star.prototype.update = function() {
  if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20))
  {
    this.count++;
    this.reset();
    if(star.count %2 ==0 && star.count != 0 )
    selector.stat = true;
  }
};

star.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

star.prototype.reset = function() {
  this.x = xVals[Math.floor(Math.random() *5)];
  this.y = yVals[Math.floor(Math.random() *3)];
  this.sprite = 'images/Star.png';
};

var selector = function(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Selector.png';
  this.stat = false;
};

selector.prototype.update = function() {
  if (this.y == player.y - 10 && (this.x > player.x - 50 && this.x < player.x + 50))
  {
    player.play = chart[Math.floor(Math.random()*5)];
    this.stat = false;
    this.reset();
  }
};

selector.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

selector.prototype.reset = function() {
    this.x = xselVals[Math.floor(Math.random() *5)];
    this.y = yselVals[Math.floor(Math.random() *3)];
    this.sprite = 'images/Selector.png';
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new player(200,380) ;
var chart = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
var yVals = [300,220, 140];
var xVals = [3,100,200,305,405];
var yselVals = [290,210, 130];
var xselVals = [0,101,202,303,404];

for(var i = 0;i<5;i++)
{
  var x = Math.floor((Math.random() * -200) + 1);
  var y = yVals[Math.floor(Math.random() *3)];
  var bug = new Enemy(x,y);
  allEnemies.push(bug);

}

var starx = xVals[Math.floor(Math.random() *5)];
var stary = yVals[Math.floor(Math.random() *3)];
var star = new star(starx,stary);

var selx = xselVals[Math.floor(Math.random() *5)];
var sely = yselVals[Math.floor(Math.random() *3)];
var selector = new selector(selx,sely);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
