function Bullet()
{
    this.x;
    this.y;
    this.width = 8;
    this.height = 12;
    this.shown = false;
}

Bullet.prototype.draw = function(context)
{
    context.fillStyle = "lime";
    context.fillRect(this.x, this.y, this.width, this.height)
}

Bullet.prototype.update = function()
{
    if (this.shown)
    {
        this.y -= 5;
        //If bullet goes offscreen stop showing it
        if (this.y < -(this.height))
        {
            this.shown = false;
        }
    }
}

Bullet.prototype.shoot = function(x,y)
{
    this.shown = true;
    this.x = x;
    this.y = y;
}
