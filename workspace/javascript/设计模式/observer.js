var publisher = {
    subscribers: {
        any: []
    },
    subscribe: function(fn, type){
        type = type || 'any'
        if(typeof this.subscribers[type] === 'undefined'){
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    unsubscriber: function(fn, type){
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function(publication, type){
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function(action, arg, type){
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for(i =0; i < max; i+=1){
            if(action === 'publish'){
                subscribers[i](arg);
            }else{
                if(subscribers[i] === arg){
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};


function makePublisher(o){
    var i;
    for (i in publisher){
        if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function'){
            o[i] = publisher[i];
        }
    }
    o.subscribers = {any: []};
}


var paper = {
    daily: function(){
        this.publish('big news today');
    },
    monthly: function(){
        this.publish('Interesting analysis', 'monthly');
    }
};


makePublisher(paper);

var joe = {
    drinkCoffee: function(paper){
        console.log('Just read '+paper);
    },
    sundayPreNap: function(monthly){
        console.log('About to fall asleep reading this ' + monthly);
    }
};

// 注册订阅者
paper.subscribe(joe.drinkCoffee);
// 在monthly事件上注册joe.sundayPreNap
paper.subscribe(joe.sundayPreNap, 'monthly');

// paper.daily();
// paper.monthly();

makePublisher(joe);

joe.tweet = function(msg){
    this.publish(msg);
};
joe.tweetHate = function(msg){
    this.publish(msg, 'hate');
}

paper.readTweets = function(tweet){
    console.log('User post a new tweet!');
}
paper.readTweetsHate = function(tweet){
    console.log('Call big meeting! Someone ' + tweet);
};

joe.subscribe(paper.readTweetsHate, 'hate');
joe.subscribe(paper.readTweets);

joe.tweet('This is my first tweet today!');
joe.tweetHate('I Hate the paper today!!');