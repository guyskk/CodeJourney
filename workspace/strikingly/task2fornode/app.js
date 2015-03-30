var http = require('http');
var fs = require('fs');
var request = require('request');


// set console color for better experience
var colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});


var GAMEPARAM = {
    'SESSIONID': '',
    'current_word': '',
    'guessWordCount': 0
};
// 保存字典
var WORDLIST = '';
var frequencyLetterList = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];
var normalOrderList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// 保存已经尝试的字母
var dirtyLetter = '';


// 发送请求
function sendRequest(param, success, fail) {
    var options = {
        url: 'http://strikingly-hangman.herokuapp.com/game/on',
        method: 'POST',
        setHeader: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.4 Safari/537.36'
        },
        json: true,
        body: param
    };

    function handleData(error, response, data) {
        if (error) {
            fail(error, response);
        }
        if (!error && response.statusCode == 500) {
            console.log('Opps! Internal Server Error!\nRetry...'.error);
            sendRequest(param, success, fail);
        }
        if (!error && response.statusCode == 404) {
            console.log('Opps! Internal Server 404!\nRetry...'.error);
            sendRequest(param, success, fail);
        }
        if (!error && response.statusCode == 401) {
            console.log('Opps! Internal Server 401!\nRetry...'.error);
            sendRequest(param, success, fail);
        }
        if (!error && response.statusCode == 400) {
            console.log('Opps! Internal Server 400!\nRetry...'.error);
            sendRequest(param, success, fail);
        }
        if (!error && response.statusCode == 200) {
            success(data);
        }
    }

    request(options, handleData);

};

// 对象数组根据参数排序
function sortByKey(name) {
    return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {

                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? 1 : -1;
        } else {
            throw ("error");
        }
    }
}

// 计算各个字母出现的次数
function countLetter(str) {
    var result = 0;
    var countArr = new Array(26);
    for (var j = 0; j < 26; j++) {
        countArr[j] = {
            val: 0,
            index: j
        };
    }
    for (var i = str.length - 1; i >= 0; i--) {
        var index = str[i].charCodeAt() - 97;
        countArr[index].val += 1;
    }
    countArr.sort(sortByKey('val'));
    return countArr;
}

// start game
function initGame() {
    console.log('\npalyer authentication...\n');
    var param = {
        'playerId': 'zhanglun1410@gmail.com',
        'action': 'startGame'
    };
    sendRequest(param, function(res) {
        console.log('\n%s\n', res.message);
        GAMEPARAM.SESSIONID = res.sessionId;
        nextWord();

    }, function(err) {
        console.log('\nOpps! authentication failed\nRetry...'.error);
        initGame();
    });
}

function getYourResult() {
    var param = {
        "sessionId": GAMEPARAM.SESSIONID,
        "action": "getResult"
    };
    sendRequest(param, function(res) {
        console.log('Your finial result:\n', res.data);
    }, function(err) {
        console.log('Opps! something Wrong! Error: %s\nRetry...'.error, err.code);
        getYourResult();
    });
}

function submitResult() {
    var param = {
        "sessionId": GAMEPARAM.SESSIONID,
        "action": "submitResult"
    };
    sendRequest(param, function(res) {
        console.log(res.message.info);
        console.log(res.message.data);
    }, function(err) {
        console.log('Opps! something Wrong! Error: %s\nRetry...'.error, err.code);
        submitResult();
    });
}

// fetch a new word
function nextWord() {
    console.log('fetching a new word...\n');
    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'nextWord'
    };

    sendRequest(param, function(res) {
        console.log('fetch words successfully\nresult:\n', res.data);
        if (res.data.totalWordCount == 80) {
            console.log('\nGAME OVER!\n'.info);
            // TODO: get result and send it
            getYourResult();
            return false;


        }
        GAMEPARAM.guessWordCount += 1;
        GAMEPARAM.current_word = res.data.word;
        // clean up the dirtyLetter
        dirtyLetter = '';
        // Pick the most frequencies letter
        guessFrequencyLetter(0);

    }, function(err) {
        console.log('Opps! something Wrong! Error: %s\nRetry...'.error, err.code);
        nextWord();
    })
}

// Pick the most frequencies letter
function guessFrequencyLetter(letter) {
    var char = frequencyLetterList[letter];
    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'guessWord',
        'guess': char
    };
    console.log('guess: ', char);
    sendRequest(param, function(res) {
        console.log('result:\n', res.data);
        dirtyLetter += (char + '|');
        var word = res.data.word;
        GAMEPARAM.current_word = word;
        if (res.data.wrongGuessCountOfCurrentWord == 10) {
            console.log('\nSorry, This word you failed!\n'.error);
            nextWord();
        }
        if (/^[A-Z]*$/.test(word)) {
            console.log('\nCongratulations, you got one !\\(^o^)/YES!\n'.rainbow);
            nextWord();
            return false;
        } else if (/^\**$/.test(word) || letter < 6) {
            console.log('try frequencyLetterList');
            letter += 1;
            guessFrequencyLetter(letter);
        } else {
            console.log('try most common used letter');
            guessMostCommonLetter();
        }
    }, function(err) {
        console.log('Opps! something Wrong! Error: %s\nRetry...'.error, err.code);
        guessFrequencyLetter(letter);
    });
}

// Pick the most common letter
function guessMostCommonLetter(letter) {
    current_word = GAMEPARAM.current_word;

    // create a regex pattern based on the known letter(s) (dirtyLetter)
    dirtyLetter += Array.prototype.join.call(current_word.replace(/\*/ig, ''), '|') + '|';
    var patternStr = current_word.replace(/\*/ig, '[a-z]{1}');

    console.log('current_word: ', current_word);
    console.log('patternStr: ', patternStr);
    console.log('dirtyLetter: ', dirtyLetter);

    var letterReg = new RegExp(dirtyLetter, 'ig');


    mostCommonLetters = countLetter(getWordCollection(patternStr).replace(letterReg, ''));

    // pick from normalOrderList accroding count
    console.log(mostCommonLetters[0]);
    var char = normalOrderList[mostCommonLetters[0].index];

    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'guessWord',
        'guess': char
    };
    console.log('guess: ', char);
    sendRequest(param, function(res) {
        console.log('result\n', res.data);
        dirtyLetter += (char + '|');
        var word = res.data.word;

        if (res.data.wrongGuessCountOfCurrentWord == 10) {
            console.log('\nSorry, This word you failed!\n'.error);
            nextWord();
        }

        if (/^[A-Z]*$/.test(word)) {
            console.log('\nCongratulations, you got one !\\(^o^)/YES!\n'.rainbow);
            nextWord();
            return false;
        } else if (word == GAMEPARAM.current_word) {
            letter += 1;
            guessMostCommonLetter(0);
        } else {
            GAMEPARAM.current_word = word;
            guessMostCommonLetter(0);
        }
    }, function(err) {
        console.log('Opps! something Wrong! Error: %s\nRetry...'.error, err.code);
        guessMostCommonLetter(0);
    });
}


function getWordCollection(pattern) {
    var re = new RegExp('\r\n' + pattern + '\r\n', 'ig');
    if (WORDLIST.match(re)) {
        return WORDLIST.match(re).join('').replace(/\r\n/ig, '');
    }
}

// readFileSync
function readWordList() {
    fs.readFile('words.txt', 'UTF-8', function(err, data) {
        if (err) {
            console.log('Opps! load words list failed!\nRetry...'.error);
            readWordList();
        } else {
            WORDLIST = data;
            console.log('load words list successfully!'.info);
        }

    });
}








// 开始游戏 

console.log('\n------START GAME------');
readWordList();
initGame();
