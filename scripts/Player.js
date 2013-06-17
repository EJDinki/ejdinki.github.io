function Player()
{
    this.x = 0;
    this.y = 480 - 64;
};

Player.prototype.draw = function(context)
{
    context.fillStyle = "lime";
    context.fillRect(this.x, this.y + 16, 32, 16);
    context.fillRect(this.getCenterX(), this.getCenterY(), 8, 8);
};

Player.prototype.getCenterX = function()
{
    return this.x + 12;
};

Player.prototype.getCenterY = function()
{
    return this.y + 8;
};

Player.prototype.moveLeft = function()
{
    if (this.x > 0)
    {
        this.x -= 5;
    }
};

Player.prototype.moveRight = function()
{
    if (this.x < (640-32))
    {
        this.x += 5;
    }
};

Player.prototype.update = function()
{
    if (Key.isDown(Key.LEFT)) this.moveLeft();
    if (Key.isDown(Key.RIGHT)) this.moveRight();
};
