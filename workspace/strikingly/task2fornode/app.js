var http = require('http');
var fs = require('fs');
// 第三方模块
var request = require('request');




// initGame();
var GAMEPARAM = {
    'SESSIONID': '',
    'current_word': ''
};
var WORDLIST = '';
var firstLetterList = ['T', 'A', 'S', 'H', 'W', 'I', 'O', 'B', 'M', 'F', 'C', 'L', 'D', 'P', 'N', 'E', 'G', 'R', 'Y', 'U', 'V', 'J', 'K', 'Q', 'Z', 'X'];
var frequencyLetterList = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];
var normalOrderList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var mostUseList = [];






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
        // console.log('statusCode: %s', response.statusCode);
        if (error) {
            // console.log(error);
            fail(error);
        }
        if (!error && response.statusCode == 200) {
            // console.log('----info------\n', data);
            success(data);
        }
    }

    request(options, handleData);

};


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
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw ("error");
        }
    }
}

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
        console.log('---player authentication failed, trying again...---');
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
        makeGuess();

    }, function(err) {
        console.log('\n---fetch words error!---\n', err);
        nextWord();
    })
}



function guessFirstLetter(list, letter) {
    var char = list[letter];
    if (char.index) {
        char = normalOrderList[char.index];
    }

    console.log('letter: ', char);
    var param = {
        'sessionId': GAMEPARAM.SESSIONID,
        'action': 'guessWord',
        'guess': char
    };
    sendRequest(param, function(res) {
        console.log('--get first letter---\n', res);
        var current_word = GAMEPARAM.current_word;
        var word = res.data.word;

        if (/^[A-Z]*$/.test(word)) {

            console.log('\n---Congratulations, you got one !---\n');
            newWord();
            return false;

        } else if (word !== current_word && letter >= 6) {

            current_word = word;
            // get letters index
            var index = [];

            // 构建正则表达式
            var reg = new RegExp('[a-z]', 'ig');
            var patternStr = '';
            var i = 0;
            while (match = reg.exec(word)) {
                console.log(match);
                index.push(match.index);
                if(i == 0){
                    patternStr = patternStr + '[a-z]{'+ match.index+'}' + match[0];
                }else{
                    patternStr = patternStr + '[a-z]{' + (match.index - 1 - i) + '}' + match[0];
                }
                console.log('match.index:', match.index);
                console.log(index);
                i = match.index;
            };

            var wordLength = current_word.length;
            patternStr = patternStr + '[a-z]{' + (wordLength - index[index.length - 1] - 1) + '}';

            console.log('current_word: ', current_word);
            console.log(patternStr);
            mostShowLetter = countLetter(reLocateWordCollection(patternStr));
            console.log(reLocateWordCollection(patternStr));

            guessFirstLetter(mostShowLetter, 0);

        } else {
            letter += 1;
            console.log('!!!!!!!');
            guessFirstLetter(list, letter);
        }
    }, function(err) {
        console.log('get first letter failed!');
        console.log(err);
        guessFirstLetter(list, letter);

    });

}


function makeGuess() {
    var word = GAMEPARAM.current_word;

    if (/^\*+$/.test(word)) {
        console.log('\n---This is a new word! Let\'s do this! ---\n');
        var wordCollection = localteWordCollection(word.length);
        mostUserList = countLetter(wordCollection);
        guessFirstLetter(frequencyLetterList, 0);
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
// localteWordCollection(3);
// countLetter('aahabcndbchf');
