// set canvas size
$(document).ready(function() {
    var canvas = $("#canvas").get(0);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

(function(global) {
    global.ctx = $("#canvas").get(0).getContext("2d");
    global.pointList = [];
})(window);

ToolKits = {};
ToolKits.convertHextoRGB = function(hex) {

};

ToolKits.getPoints = function() {
    var canvas = $("#canvas").get(0);
    console.log("canvas.offsetLeft");
    console.log(canvas.offsetLeft);
    console.log("canvas.offsetTop");
    console.log(canvas.offsetTop);
    var list = window.pointList;
    canvas.onclick=function(event){
        list.push(new Point(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop));
        console.log(", " + event.clientY);
    };
};

ToolKits.DeCasteljauBezier = function(points, density, step) {
    var pow = Math.pow;
    //if (points.length < 3) return null;
    console.time('bezier');
    var ps = points.map(function(p) {
            return {
                x: p.x,
                y: p.y
            };
        }),
        results = [],
        len = ps.length,
        epsilon = 0.00001;
    density = density || 20; // 密度，决定了采样精度（曲线平滑程度）
    step = step || 0.00001; // bezier递推步长
    var dest = {
        x: points[points.length - 1].x,
        y: points[points.length - 1].y
    };
    var mindist = pow(density, 2);
    results.push({
        x: ps[0].x,
        y: ps[0].y
    });
    // 递推
    for (var t = 0; t <= 1; t += step) {
        for (var i = 1; i < len; ++i) {
            for (var j = 0; j < len - i; ++j) {
                ps[j].x = ps[j].x * (1 - t) + ps[j + 1].x * t;
                ps[j].y = ps[j].y * (1 - t) + ps[j + 1].y * t;
            }
        }
        var now = {
            x: ps[0].x,
            y: ps[0].y
        }
        if (pow(now.x - dest.x, 2) + pow(now.y - dest.y, 2) < epsilon) {
            break;
        }
        results.push(now);
    }

    // 采样
    var last = results[0];
    var results2 = [last];
    for (var i = 1; i < results.length; ++i) {
        var now = results[i];
        var dist = pow(now.x - last.x, 2) + pow(now.y - last.y, 2);
        if (dist >= mindist) {
            results2.push(now);
            last = now;
        }
    }
    results2.push(dest);
    //console.log(results.length, results2.length);
    console.timeEnd('bezier');
    // console.log(results2);
    return results2;
}

ToolKits.drawLine = function(points, color) {
    if (!points) {
        return false;
    }
    ctx = window.ctx;
    if (color) {
        ctx.strokeStyle();
    }
    // ctx.strokeStyle = "rgb(255, 0, 0)";
    for (var i = 0, len = points.length - 1; i < len; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.closePath();
        ctx.stroke();
    }

}

function getPoints(x, y) {

}

function Point(x, y) {
    this.x = x;
    this.y = y;
}
$(document).ready(function() {
    var list = [];
    ToolKits.getPoints();
    list.push(new Point(25,175));
    list.push(new Point(60,80));
    list.push(new Point(150,30));
    list.push(new Point(170,150));
    // list.push(new Point(180, 400));
    // list.push(new Point(300, 500));
    // list.push(new Point(80, 600));
    $("#control-btn-draw").get(0).onclick=function(){
        ToolKits.drawLine(pointList);
        var result = ToolKits.DeCasteljauBezier(pointList, 1);
        ToolKits.drawLine(result);
    }
});
