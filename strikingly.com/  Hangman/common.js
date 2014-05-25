(function() {
    var MYGAME = MYGAME || {},
        CONFIG = {
            "action": {
                "init": "initiateGame",
                "nextWord": "nextWord",
                "guessWord": "guessWord"
            },
            "userId": "zhanglun1410@gmail.com",
            "secret": "",
            "url": "http://strikingly-interview-test.herokuapp.com/guess/process",
            "responseData": {}
        };

    MYGAME.postRequest = function(config, callback) {

        $.post(CONFIG.url, config, function(data) {

            callback(data);

        }, false);

    };

    MYGAME.initGame = function(callback) {
        var postInit = {
            "action": CONFIG.action.init,
            "userId": CONFIG.userId
        };

        this.postRequest(postInit, function(data) {
            CONFIG.secret = data.secret;
            CONFIG.responseData.afterInit = data.data;
        });
        return this;
    };


    MYGAME.reqWord = function() {
        var postReqWord = {
            "action": CONFIG.action.nextWord,
            "userId": CONFIG.userId,
            "secret": CONFIG.secret
        };

        this.postRequest(postReqWord, function(data) {
            CONFIG.word = data.word;
	        CONFIG.responseData.numberOfGuessAllowedForThisWord=data.data.numberOfGuessAllowedForThisWord;
	        CONFIG.responseData.numberOfWordsTried=data.data.numberOfWordsTried;
	        MYGAME.guessWords();
        });
    };


    MYGAME.makeGuess = function(char) {
        var postGuess = {
            "action": CONFIG.action.guessWord,
            "userId": CONFIG.userId,
            "secret": CONFIG.secret,
            "guess": char
        };
    	console.log(CONFIG.responseData.numberOfGuessAllowedForThisWord);
        if(!CONFIG.responseData.numberOfGuessAllowedForThisWord){
        	console.log("LIMITE!");
        	this.reqWord();
        	return false;
        }

        this.postRequest(postGuess, function(data) {
            CONFIG.word = data.word;
            CONFIG.responseData.numberOfWordsTried=data.data.numberOfWordsTried;
            CONFIG.responseData.numberOfGuessAllowedForThisWord=data.data.numberOfGuessAllowedForThisWord;
        });

    }

    MYGAME.guessWords=function() {

        var wordLength = CONFIG.word.length;
        var charMap = ["a", "b", "c", "d", "e", "f", "g", 
        			   "h", "i", "j", "k", "l", "m", "n", 
        			   "o", "p", "q", "r", "s", "t", "u", 
        			   "v", "w", "x", "y", "z"];
        var word=CONFIG.word;
        var i=0;
    	
    	while(i<CONFIG.responseData.numberOfGuessAllowedForThisWord){
    		// for(var i=0;i<26;i++){
	    		this.makeGuess(charMap[i+8]);

    		// }
    		i++;
    		// console.log(i+6);
        	console.log("numberOfGuessAllowedForThisWord:"+CONFIG.responseData.numberOfGuessAllowedForThisWord);
    	}

    	// this.makeGuess();
    }


    MYGAME.initGame();


    var timerOfReqWord = setTimeout(function() {
        if (CONFIG.secret) {
            MYGAME.reqWord();
            // timerOfReqWord = setTimeout(function() {
            //     if (CONFIG.word) {
            //         guessWords();
            //         MYGAME.makeGuess();
            //         // clearTimeout(timerOfReqWord);
            //     }
            // }, 1000);
        }
    }, 1000);


})();
