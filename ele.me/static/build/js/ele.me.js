(function(exports) {

    var ele = {};

    // ele.addClass=function(){

    // };

    exports.ele = ele;

})(window);


(function() {

    // input

    function inputToggle() {
        var search_input = document.getElementById("search_input"),
            parent = search_input.parentNode;
        search_input.onfocus = function() {
            parent.className += " focus";
        }
        search_input.onblur = function() {
            parent.className = parent.className.replace(/(?:^|\s)focus(?!\S)/g, "");
        }
    }

    // banner

    function 


    window.onload = function() {

        inputToggle();


    }
})();
