function Sprite(x,y)
{
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 32;
};

function Sprites()
{
    this.sprites = [];
    this.velocity = 1;
    //A step is the distance to move down after reaching the side
    //of the screen
    this.step = 5;
    //wait is the amount of updates to wait before updating movement
    this.wait = 60;
    this.currentUpdate = 0;
};

Sprites.prototype.initialize = function(startY)
{
    for (j = 0; j < 5; j++)
    {
        for (k = 0; k < 11; k++)
        {
            //KEY
            //40: Sprite is 32px wide with 8px gap inbetween
            //4: small x offset so that they never actually hit
            //side of screen but get within 4px on each side
            //64: randomly chosen Y offset so they don't all start
            //at top edge of screen
            var s = new Sprite((k*40)+4,(j*40)+startY);
            this.sprites.push(s);
        }
    }
};

Sprites.prototype.draw = function(context)
{
    for (i = 0; i < this.sprites.length; i++)
    {
        context.fillStyle = "white";
        context.fillRect(this.sprites[i].x, this.sprites[i].y,
                         this.sprites[i].width, this.sprites[i].height);
    }
};

Sprites.prototype.update = function()
{
    if (this.currentUpdate === this.wait)
    {
        this.shift((20 * this.velocity),0);
        this.currentUpdate = 0;
        if (this.checkSideCollision())
        {
            this.velocity = this.velocity * -1;
            //shift everyone down a step
            this.shift((20 * this.velocity),+10);
            this.currentUpdate = 0;
        }
    }
    else
    {
        this.currentUpdate++;
    }
};

Sprites.prototype.shift = function(x,y)
{
    for (i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].x += x;
        this.sprites[i].y += y;
    }
};

Sprites.prototype.bulletCollision = function(bullet)
{
    for (i = 0; i < this.sprites.length; i++)
    {
        var x = this.sprites[i].x;
        var y = this.sprites[i].y;
        var width = this.sprites[i].width;
        var height = this.sprites[i].height;
        if ((x < bullet.x && x + width > bullet.x)
            || (x < (bullet.x + bullet.width)
                && x + width > bullet.x + bullet.width))
        {
            if ((y < bullet.y && y + height > bullet.y)
                || (y < (bullet.y + bullet.height)
                    && y + height > bullet.y + bullet.height))
            {
                //there is a collision
                //remove sprite and return true
                this.sprites.splice(i,1);
                return true;
            }
        }
    }
    //no collision
    return false;
}

//Return true if we hit side of screen, false otherwise
Sprites.prototype.checkSideCollision = function()
{
    //if (this.currentUpdate === 0)
    //    return;
    //Screen side is hit if any sprites' x is negative
    //or if any x is > (640 - sprite.width);
    for (i = 0; i < this.sprites.length; i++)
    {
        if (this.sprites[i].x < 0
            || this.sprites[i].x > (640 - this.sprites[i].width))
            return true;
    }
    return false;
};

Sprites.prototype.hitBottom = function()
{
    for (i = 0; i < this.sprites.length; i++)
    {
        if ((this.sprites[i].y + this.sprites[i].height) >= (480-64))
            return true;
    }
    return false;
}
