var utils = {};

utils.captureMouse = function(element) {
    var mouse = {
        x: 0,
        y: 0
    };
    element.addEventListener("mousemove", function(e) {
        var x, y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + docuemnt.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + docuemnt.documentElement.scrollTop;
        }
        
        x -= element.scrollLeft;
        y -= element.scrollTop;

        mouse.x = x;
        mouse.y = y;

    }, false);

    return mouse;
}
