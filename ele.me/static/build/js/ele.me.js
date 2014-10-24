(function(exports) {

    var ele = {};

    ele.getCSSStyle = function(elem, prop) {
        if (elem.currentStyle) {
            var result = elem.currentStyle[prop];
        } else if (window.getComputedStyle) {
            var result = document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
        }
        return result;
    };
    ele.animate = function(elem, props, t, callback) {
        var bengin_sty = {};
        for (var sty in props) {
            bengin_sty[sty] = document.defaultView.getComputedStyle(elem, null)[sty]
        }
        var star_date = new Date(); //开始执行动画时间
        var timer = window.setInterval(function() {
            var cur_date = new Date(); //当前时间

            //遍历要执行动画的所有属性
            for (var sty in props) {
                var end = parseInt(props[sty]); //最终要达到的值
                var begin = parseInt(bengin_sty[sty]); //开始值
                var v = end - begin;
                var s = v / t; //计算动画速度

                var cur_v = begin + (cur_date.getTime() - star_date.getTime()) * s;

                //该变量表示是否完成
                var is_complete = false;
                if (end > begin) {
                    //如果最终要达到的值>=开始值，就判断当前cur_v是否已经>=最终要达到的值
                    is_complete = cur_v >= end;
                } else {
                    //如果最终要达到的值<=开始值，就判断当前cur_v是否已经<=最终要达到的值
                    is_complete = cur_v <= end;
                }
                if (is_complete) {
                    for (var st in props) { //完成所有样式改变
                        elem.style[st] = props[st]
                    }
                    //调用回调函数
                    callback && callback.call(elem);
                    window.clearInterval(timer)

                    break; //动画已经完成  跳出循环
                } else {
                    elem.style[sty] = Math.floor(cur_v) + "px";
                }

            }
        }, 10);
    }

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

    function carousel() {
        var listContainer = document.getElementById("carousel");
        // 复制一份
        listContainer.innerHTML += listContainer.innerHTML;
        var length = listContainer.getElementsByTagName("li").length;

        // 创建鼠标点击方块
        var dot = document.createElement("ul");
        dot.className = "carousel-nav";
        for (var i = 0; i < length / 2; i++) {
            dot.innerHTML += "<li>" + (i + 1) + "</li>";
        }
        listContainer.parentNode.appendChild(dot);

        var height = parseInt(ele.getCSSStyle(listContainer, "height"), 10);

        var count = 0;

        function running() {
            console.log(count);
            if (count >= (length / 2) || count < 0) {
                count = 0;
            }
            if (!listContainer.style.top) {
                listContainer.style.top = 0;
            }

            count++;
            console.log(listContainer.style.top);
            console.log(-height * length / 2);
            if (parseInt(listContainer.style.top, 10) == (-height) * length / 2) {
                listContainer.style.top = 0;
            }
            ele.animate(listContainer, {
                "top": -height * count
            }, 1000);
            var timer = setTimeout(running, 3000);
        };

        var timer = setTimeout(running, 3000);


        // 绑定鼠标点击

        // dot.onclick=function(e){
        //     var e = window.event || e;
        //     var target = e.target || e.srcElement;
        //     if(target.tagName.toLowerCase() == "li"){
        //         clearTimeout(timer);
        //         count = parseInt(target.innerHTML-1, 10);
        //         ele.animate(listContainer, {
        //             "top": -height * count
        //         }, 1000,function(){
        //             var timer = setTimeout(running, 3000);
        //         });
        //         console.log(-height * parseInt(target.innerHTML-1, 10));
        //     }
        // };


    }


    window.onload = function() {

        inputToggle();

        carousel();

    }
})();
