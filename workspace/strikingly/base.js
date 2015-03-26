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
            } else if(xhr.status == 422) {
                if (error != null) {
                    error(xhr);
                }
            }
        };
    };
    var letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var initGame = function() {
        ajax({
            type: 'post',
            url: 'https://strikingly-hangman.herokuapp.com/game/on',
            dataType: 'json',
            data: {
                "playerId": "zhanglun1410@gmail.com",
                "action": "startGame"
            },
            success: function(res) {
                console.log(res);
                // res = JSON.parse(res);
                localStorage.setItem('sessionId', res.sessionId);
                console.log('nextWord');
                nextWord();
            }
        });
    };


    var nextWord = function() {
        // var i =0;
        ajax({
            type: 'post',
            url: 'https://strikingly-hangman.herokuapp.com/game/on',
            dataType: 'json',
            data: {
                'sessionId': localStorage.getItem('sessionId'),
                'action': 'nextWord'
            },
            success: function(res) {
                // res = JSON.parse(res);
                console.log(res);
                var word = res.data.word;
                if (/[A-Z]/.test(word)) {
                    nextWord();
                } else {
                    makeGuess(0);
                }
                console.log(word);
            }
        });
    };

    var makeGuess = function(char) {
        console.log(letterList[char]);
        if (char == undefined) {
            return false;
        }
        ajax({
            type: 'post',
            url: 'https://strikingly-hangman.herokuapp.com/game/on',
            dataType: 'json',
            data: {
                'sessionId': localStorage.getItem('sessionId'),
                'action': 'guessWord',
                'guess': letterList[char]
            },
            success: function(res) {
                var word = res.data.word;
                console.log('current_word------%s', localStorage.getItem('current_word'));
                console.log('new word------%s', word);
                if (localStorage.getItem('current_word') == word) {
                    char += 1;
                    makeGuess(char);
                } else {
                    localStorage.setItem('current_word', word);
                    char = 0;
                    makeGuess(char);
                };
                console.log(res);
            },
            error: function(res) {
                // console.log(res);
                console.log('====422====');
                nextWord();
            }

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


    window.addEventListener('load', function() {
      document.getElementById('go').addEventListener('click', function(){
        initGame();
      }, false);

    }, false);




})();
