var publisher = {
    subscribers: {
        ang: []
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

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

console.log(paper.subscribers);
paper.daily();