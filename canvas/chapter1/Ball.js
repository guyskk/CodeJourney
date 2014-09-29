function Ball(radius, color) {
    if (radius === undefined) {
        radius = 40;
    }
    if (color === undefined) {
        color = "#f00";
    }
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.color = color;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
}
Ball.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.beginPath();
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();

};

function Cricle(x, y) {
    if (x == undefined) {
        x = 0;
    }
    if (y == undefined) {
        y = 0;
    }
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.width = 20;
    this.height = 20;
}
Cricle.prototype.draw = function(context) {
    // context.save();
    // this.x += 2;
    // this.y += 2;
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
    this.rgba = "rgba(" + this.r + "," + this.g + "," + this.b + ",1)";
    
    //画园
    context.fillStyle = this.rgba;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    // 画方
    /*        context.strokeStyle = this.rgba;
        context.strokeRect(this.x, this.y, this.width, this.height);*/

}
