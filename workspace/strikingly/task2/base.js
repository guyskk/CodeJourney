(function() {
    var createAjax = function() {
        var xhr = null;
        xhr = new XMLHttpRequest();
        return xhr;
    };

    var ajax = function(conf) {
        // 初始化
        //type参数,可选
        var type = conf.type;
        //url参数，必填 
        var url = conf.url;
        //data参数可选，只有在post请求时需要
        var data = JSON.stringify(conf.data);
        //datatype参数可选    
        var dataType = conf.dataType;
        //回调函数可选
        var success = conf.success;
        var error = conf.error

        if (type == null) {
            //type参数可选，默认为get
            type = "get";
        }
        if (dataType == null) {
            //dataType参数可选，默认为text
            dataType = "text";
        }
        // 创建ajax引擎对象
        var xhr = createAjax();
        // 打开
        xhr.open(type, url, true);
        // 发送
        if (type == "GET" || type == "get") {
            xhr.send(null);
        } else if (type == "POST" || type == "post") {
            xhr.setRequestHeader("content-type",
                "application/x-www-form-urlencoded");
            xhr.send(data);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (dataType == "text" || dataType == "TEXT") {
                    if (success != null) {
                        //普通文本
                        success(xhr.responseText);
                    }
                } else if (dataType == "xml" || dataType == "XML") {
                    if (success != null) {
                        //接收xml文档    
                        success(xhr.responseXML);
                    }
                } else if (dataType == "json" || dataType == "JSON") {
                    if (success != null) {
                        //将json字符串转换为js对象  
                        success(JSON.parse(xhr.responseText));
                    }
                }
            } else if(xhr.readyState == 4 && xhr.status == 422) {
                if (error != null) {
                    error(xhr);
                }
            }
        };
    };
    var letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var STOP = false;
    var startPoint = Math.ceil(Math.random() * 10 + 1);
    var sendRequet = function(data, success, error){
        ajax({
            type: 'post',
            url: 'https://strikingly-hangman.herokuapp.com/game/on',
            dataType: 'json',
            data: data,
            success: function(res){
                if(success){
                    success(res);
                }
            },
            error: function(xhr){
                if(error){
                    error(xhr);
                }
                if(xhr.status == 500){
                    sendRequet(data, success, error);
                }
            }
        });
    };

    var initGame = function() {
        var param = {
                "playerId": "zhanglun1410@gmail.com",
                "action": "startGame"
            };
        sendRequet(param, function(res){
            console.log(res);
            localStorage.setItem('sessionId', res.sessionId);
            console.log('nextWord');
            nextWord(); 
        });
    };


    var nextWord = function() {
        var param = {
            'sessionId': localStorage.getItem('sessionId'),
            'action': 'nextWord'
        };
        sendRequet(param, function(res){
            var word = res.data.word;
            console.log(word);
            makeGuess(startPoint);
        });
    };

    var makeGuess = function(char) {
        console.log(letterList[char]);
        if (char == undefined) {
            return false;
        }
        char = char % 25;
        var param = {
            'sessionId': localStorage.getItem('sessionId'),
            'action': 'guessWord',
            'guess': letterList[char]
        };
        sendRequet(param, function(res) {
            if(STOP){
                console.log('stop!!');
                return false;
            }
            var word = res.data.word;
            console.log('current_word------%s', localStorage.getItem('current_word'));
            console.log('new word------%s', word);
            // if (localStorage.getItem('current_word') !== word) {
            localStorage.setItem('current_word', word);
            // }
            if (/^[A-Z]*$/.test(word)) {
                console.log('猜对了一个！！！恭喜恭喜！！');
                nextWord();
            }else{
                char += 24 % (word.length);
                makeGuess(char);
            }

        }, function(res) {
            // console.log(res);
            console.log('====422====');
            nextWord();
        });
    };

    var getResult = function() {
      ajax({
          type: 'post',
          url: 'https://strikingly-hangman.herokuapp.com/game/on',
          data: {
              'sessionId': localStorage.getItem('sessionId'),
              'action': 'getResult'
          },
          success: function(res) {
              console.log(res);
          }

      });
  }
  window.getResult = getResult;


    window.addEventListener('load', function() {
        document.getElementById('go').addEventListener('click', function(){
            initGame();
        }, false);
        document.getElementById('stop').addEventListener('click', function(){
            STOP = true;
        }, false);

    }, false);




})();
