(function(obj) {
    obj.isRight = function() {
        console.log("isRight!");
    };
    obj.isFunction = function(para) {
        return Object.prototype.toString.call(para) == '[object Function]';
    };


    var PubSub = {
        subscribe: function(ev, callback) {
            // 创建 _callbacks 对象，除非它已经存在了
            var calls = this._callbacks || (this._callbacks = {});
            // 针对给定的事件key创建一个数组，除非这个数组已经存在
            // 然后将回调函数追加到这个数组中
            (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
            return this;
        },

        publish: function() {
            // 将arguments对象转换成真正的数组
            var args = Array.prototype.slice.call(arguments, 0);

            // 拿出第一个参数，作为事件名
            var ev = args.shift();

            // 如果不存在 _callbacks ，则返回
            // 或者如果不包含给定事情对应的数组
            var list, calls, i, l;
            if (!(calls = this._callbacks)) {
                return this;
            }
            if (!(list = this._callbacks[ev])) {
                return this;
            }

            // 触发回调
            for (i = 0, l = list.length; i < l; i++) {
                list[i].apply(this, args);
            }
            return this;
        }
    };

    obj.PubSub = PubSub;

})(window);

(function(obj) {

    var APIPaths = {
        "newsLatest": "/daily/api/news_latest",
        "newsHot": "/daily/api/news_hot",
        "newsSections": "/daily/api/news_sections",
        "startImage": "/daily/api/start_image"
    };

    obj.daily = {};
    var D = daily = obj.daily;

    D.getJSON = getJSON;
    D.getNewsLatest = getNewsLatest;
    D.getNewsHot = getNewsHot;
    D.getStartImage = getStartImage;

    function getJSON(url, success, fail, always) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var response = JSON.parse(xhr.responseText);
                if (isFunction(success)) {
                    success(response);
                }
            } else {
                if (isFunction(fail)) {
                    fail();
                }
            }
        };
    }

    function getNewsLatest(callback) {
        var url = APIPaths.newsLatest;
        getJSON(url, function(response) {
            console.log("success! new latest");
            callback(response);
        });
    }

    function getNewsHot(callback) {
        var url = APIPaths.newsHot;
        getJSON(url, function(response) {
            console.log("success! new hot");
            callback(response);
        });
    }

    function getStartImage() {
        var url = APIPaths.startImage;
        getJSON(url, function(response) {
            console.log("success! start image");
            var img = new Image();
            var img_url = response.img;
            img.onload = function() {
                console.log(response.img);
//                document.body.style.backgroundImage = 'url("' + img_url + '")';
            };
            img.src = img_url;

        });
    }

})(window);


(function(window) {

    function loadTemplate(response) {
        // spread data
        var JSON_top = response.top_stories,
            JSON_stories = response.stories,
            JSON_date = response.date;

        console.log(JSON_top);

        var template = document.getElementById('template').innerHTML;
        Mustache.parse(template);   // optional, speeds up future uses
        document.getElementById('stories_list').innerHTML=Mustache.render(template, response);
    }

    window.onload = function() {
        // daily.getNewsLatest(updateNewList);
        daily.getNewsLatest(loadTemplate);
        // daily.getNewsHot(updateNewList);
        daily.getStartImage();

    };

    window.onhashchange = function() {
        // alert(window.location.hash);
        PubSub.publish("changehash");

    }
    // 使用方法
    PubSub.subscribe("wem", function() {
        console.log("Wem!");
    });
    PubSub.subscribe("changehash", function() {
        console.log(window.location.hash);
    });
    PubSub.publish("wem");




})(window);
