// set canvas size
$(document).ready(function(){
    var canvas = $("#canvas").get(0);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

(function(global){
    global.ctx = $("#canvas").get(0).getContext("2d");
})(window);



function drawLine(points){
    if(!points){
        return false;
    }

    ctx = window.ctx;
    for(var i = 0, len = points.length -1; i < len; i++){
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i+1].x, points[i+1].y);
        ctx.closePath();
        ctx.stroke();
    }

}
function Point(x, y){
    this.x = x;
    this.y = y;
}
$(document).ready(function(){
    var list = [];
    list.push(new Point(20, 40));
    list.push(new Point(200, 240));
    list.push(new Point(400, 120));
    list.push(new Point(180, 600));    
    drawLine(list);
});