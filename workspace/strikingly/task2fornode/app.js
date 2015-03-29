var http = require('http');
var fs = require('fs');
var request = require('request');


// 预设值的变量
var GAMEPARAM = {
    'SESSIONID': '',
    'current_word': ''
};
var WORDLIST = '';
var firstLetterList = ['T', 'A', 'S', 'H', 'W', 'I', 'O', 'B', 'M', 'F', 'C', 'L', 'D', 'P', 'N', 'E', 'G', 'R', 'Y', 'U', 'V', 'J', 'K', 'Q', 'Z', 'X'];
var frequencyLetterList = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];
var normalOrderList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


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
            fail(error);
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

// 开始游戏
function initGame() {
    console.log('\npalyer authentication...\n');
    var param = {
        'playerId': 'zhanglun1410@gmail.com',
        'action': 'startGame'
    };
    sendRequest(param, function(res) {
        console.log('\n---game started---\n', res);
        GAMEPARAM.SESSIONID = res.sessionId;
        nextWord();

    }, function(err) {
        console.log('\n---player authentication failed, trying again...---\n');
        initGame();
    });
}


function nextWord() {
    console.log('\nfetching a new word...\n');

    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'nextWord'
    };

    sendRequest(param, function(res) {
        console.log('\n--fectch a new word--\n', res);
        GAMEPARAM.current_word = res.data.word;

        // guess word
        dirtyLetter = '';
        guessFrequencyLetter(0);

    }, function(err) {
        console.log('\n---fetch words error!---\n', err);
        nextWord();
    })
}


function makeGuess(list, letter) {
    var char = list[letter];
    // 如果char有index属性，使用正常的字母顺序列表
    if (char.index !== undefined) {
        char = normalOrderList[char.index];
    }

    console.log('char: ', char);
    console.log('letter: ', letter);
    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'guessWord',
        'guess': char
    };
    sendRequest(param, function(res) {
        console.log('--get a new letter---\n', res);
        var current_word = GAMEPARAM.current_word;
        var word = res.data.word;

        if (/^[A-Z]*$/.test(word)) {
            console.log('\n---Congratulations, you got one !---\n');
            nextWord();
            return false;
        } else if (word !== current_word) {
            current_word = word;

            // 构建正则表达式
            var index = [];
            var reg = new RegExp('[a-z]', 'ig');
            var patternStr = '';
            var i = 0;

            while (match = reg.exec(word)) {
                index.push(match.index);
                if (i == 0) {
                    patternStr = patternStr + '[a-z]{' + match.index + '}' + match[0];
                } else {
                    patternStr = patternStr + '[a-z]{' + (match.index - 1 - i) + '}' + match[0];
                }
                i = match.index;
                dirtyLetter += match[0] + '|';
            };

            var wordLength = current_word.length;
            patternStr = patternStr + '[a-z]{' + (wordLength - index[index.length - 1] - 1) + '}';

            console.log('current_word: ', current_word);
            console.log(patternStr);

            console.log(dirtyLetter);
            var letterReg = new RegExp(dirtyLetter, 'ig');
            mostShowLetter = countLetter(reLocateWordCollection(patternStr).replace(letterReg, ''));
            console.log(reLocateWordCollection(patternStr).replace(letterReg, ''));
            console.log('-------');
            makeGuess(mostShowLetter, 0);

        } else {
            letter += 1;
            dirtyLetter += list[letter] + '|';
            // while (dirtyLetter.indexOf(list[letter])) {
            //     letter += 1;
            // }
            console.log('\nThis letter is not crroct! retry---\n');
            // console.log(list);
            makeGuess(list, letter);
        }
    }, function(err) {
        console.log('\n---get letter failed! retry---\n');
        console.log(err);
        makeGuess(list, letter);

    });
}

// 优先查找 频率较高的字母

function guessFrequencyLetter(letter) {
    var char = frequencyLetterList[letter];
    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'guessWord',
        'guess': char
    };
    console.log('letter: ', char);
    sendRequest(param, function(res) {
        console.log('--get a new letter---\n', res);
        dirtyLetter += (char + '|');
        var word = res.data.word;
        GAMEPARAM.current_word = word;
        if(res.data.wrongGuessCountOfCurrentWord == 10){
            console.log('This word you failed!\n');
            nextWord();
        }
        if (/^[A-Z]*$/.test(word)) {
            console.log('\n---Congratulations, you got one !---\n');
            nextWord();
            return false;
        } else if (/^\**$/.test(word) || letter < 6) {
            letter += 1;
            dirtyLetter += (char + '|');
            guessFrequencyLetter(letter);
        } else {
            guessMostLetter(0);
        }
    }, function(err){
        console.log(err);
        if(err.code == 'ETIMEDOUT'){
            guessMostLetter(0);
        }
    });
}

function guessMostLetter(letter) {
    current_word = GAMEPARAM.current_word;
    // 构建正则表达式
    // var index = [];
    // var reg = new RegExp('[a-z]', 'ig');
    // var patternStr = '';
    // var i = 0;

    // while (match = reg.exec(current_word)) {
    //     index.push(match.index);
    //     if (i == 0) {
    //         if(match.index - 1 <= 0){
    //             match.index = 0;
    //         }
    //         patternStr = patternStr + '[a-z]{' + (match.index)+ '}' + match[0];
    //     } else {
    //         patternStr = patternStr + '[a-z]{' + (match.index - 1 - i) + '}' + match[0];
    //     }
    //     i = match.index;
    //     dirtyLetter += match[0] + '|';
    // };
    dirtyLetter += Array.prototype.join.call(current_word.replace(/\*/ig, ''),'|');
    var patternStr = current_word.replace(/\*/ig, '[a-z]{1}');





    // var wordLength = current_word.length;
    // patternStr = patternStr + '[a-z]{' + (wordLength - index[index.length - 1] - 1) + '}';

    console.log('current_word: ', current_word);
    console.log(patternStr);
    console.log(dirtyLetter);
    var letterReg = new RegExp(dirtyLetter, 'ig');
    mostShowLetter = countLetter(reLocateWordCollection(patternStr).replace(letterReg, ''));
    console.log(reLocateWordCollection(patternStr).replace(letterReg, ''));
    var char = normalOrderList[mostShowLetter[letter].index];

    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'guessWord',
        'guess': char
    };
    console.log('letter index: ',letter);
    console.log('letter: ', char);
    sendRequest(param, function(res) {
        console.log('--get a new letter---\n', res.data);
        var word = res.data.word;
        if (/^[A-Z]*$/.test(word)) {
            console.log('\n---Congratulations, you got one !---\n');
            nextWord();
            return false;
        }else if(word == GAMEPARAM.current_word){
            dirtyLetter +=  (char + '|');
            letter += 1;
            guessMostLetter(letter);
        }else{
            GAMEPARAM.current_word = word;
            guessMostLetter(0);
        }
    }, function(err){
        console.log(err);
    });
    // makeGuess(mostShowLetter, 0);
}

function guessFirstLetter() {
    var word = GAMEPARAM.current_word;
    if (/^\*+$/.test(word)) {
        console.log('\n---This is a new word! Let\'s do this! ---\n');
        // var wordCollection = localteWordCollection(word.length);
        makeGuess(frequencyLetterList, 0);
    }
}

function localteWordCollection(length) {
    var re = new RegExp('\r\n[A-Z]{' + length + '}\r\n', 'ig');
    if (WORDLIST.match(re)) {
        return WORDLIST.match(re).join('').replace(/\r\n/ig, '');
    }
}

function reLocateWordCollection(pattern) {
    var re = new RegExp('\r\n' + pattern + '\r\n', 'ig');
    if (WORDLIST.match(re)) {
        return WORDLIST.match(re).join('').replace(/\r\n/ig, '');
    }
}

// 读取本地字典txt
function readWordList() {
    console.log('---loading word list---');
    fs.readFile('words.txt', 'UTF-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            WORDLIST = data;
            console.log('---loading finished---');
        }

    });
}


// start

console.log('---start game---');
readWordList();
initGame();
