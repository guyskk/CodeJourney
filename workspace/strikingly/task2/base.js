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
    var letterList = ['E','T','A','O','I','N','S','H','R','D','L','C','U','M','W','F','G','Y','P','B','V','K','J','X','Q','Z'];
    var letterList = ['T','A','S','H','W','I','O','B','M','F','C','L','D','P','N','E','G','R','Y','U','V','J','K','Q','Z','X'];
    var STOP = false;
    var startPoint = 0;
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
            console.log('word.length: %s', word.length);
            makeGuess(startPoint);
        });
    };


    var wordArr = [];

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
                wordArr = [];
                nextWord();
            }else{
                char += 1;
                makeGuess(char);
            }

        }, function(res) {
            // console.log(res);
            console.log('====422====');
            wordArr.push(localStorage.getItem('current_word'))
            localStorage.setItem('wordArray', wordArr);
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

//  出现频率
// ['e','t','a','o','i','n','s','h','r','d','l','c','u','m','w','f','g','y','p','b','v','k','j','x','q','z',]

// 首字母频率

// ['t','a','s','h','w','i','o','b','m','f','c','l','d','p','n','e','g','r','y','u','v','j','k','q','z','x']
 