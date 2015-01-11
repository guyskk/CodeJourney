// set canvas size
$(document).ready(function() {
    var canvas = $("#canvas").get(0);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

(function(global) {
    global.ctx = $("#canvas").get(0).getContext("2d");
    global.POINTLIST = [];
})(window);

ToolKits = {};
ToolKits.convertHextoRGB = function(hex) {

};

ToolKits.getPoints = function() {

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
        ctx.strokeStyle = color;
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

    var canvas = $("#canvas").get(0);
    canvas.onclick = function(event) {
        var point = new Point(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        POINTLIST.push(point);
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fill();
    };

    $("#control-btn-draw").get(0).onclick = function() {
        ToolKits.drawLine(POINTLIST, 'silver');
        if(POINTLIST.length < 2){
            alert("多搞几个点噻！");
        }
        var result = ToolKits.DeCasteljauBezier(POINTLIST, 1);
        ToolKits.drawLine(result, 'orange');
        window.POINTLIST = [];
    }
    $("#control-btn-clean").get(0).onclick = function() {
        var canvas = $("#canvas").get(0);
        window.POINTLIST = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }
});
