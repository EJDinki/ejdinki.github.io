var Game = {};

Game.fps = 60;

Game.initialize = function()
{
    this.context = document.getElementById("viewport").getContext("2d");
};

Game.start = function()
{
    Game.player = new Player();
    Game.bullet = new Bullet();
    Game.sprites = new Sprites();
    Game.sprites.initialize(64);
    Game.score = 0;
    this.context = document.getElementById("viewport").getContext("2d");
};

Game.draw = function()
{
    this.context.clearRect(0, 0, 640, 480);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, 640, 480);

    //show score
    this.context.fillStyle = "lime";
    //this.context.lineWidth = 1;
    this.context.font = "bold, 30px, sans-serif";
    this.context.fillText = ("TEXT", 100,100);

    Game.player.draw(Game.context);
    if (Game.bullet.shown)
    {
        Game.bullet.draw(Game.context);
    }
    Game.sprites.draw(Game.context);
};

Game.update = function()
{
    Game.player.update();
    if (Key.isDown(Key.SPACE) && !Game.bullet.shown)
        Game.bullet.shoot(Game.player.getCenterX(), Game.player.getCenterY());

    if (Game.bullet.shown)
        Game.bullet.update();

    Game.sprites.update();

    if (Game.bullet.shown)
    {
        //Run player bullet to sprite collision
        //if this returns true a collision occured
        if(Game.sprites.bulletCollision(Game.bullet))
        {
            Game.bullet.shown = false;
            Game.score += 100;
        }
    }

};

Game.shoot = function()
{
    if (!Game.bullet.shown)
    {
        Game.bullet.shoot(Game.player.getCenterX(), Game.player.getCenterY());
    }
}

Game.addRect = function()
{
    Game.entities.push(new Rect());
};

