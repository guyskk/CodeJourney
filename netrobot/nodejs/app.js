var fs = require('fs');
var request = require('request');

var luowang = 'http://www.luoo.net/music/';

var luoo_dir = './luoo/';

function saveContent(content){

    var dir = luoo_dir + 'maganize.html';
 
    fs.exists(dir, function(exists){
        if(exists){
            fs.writeFile(dir, content, function(err){
                if(err){
                    console.log(err);
                }
                console.log(content);
            });  
        }else{
            fs.openSync(dir, 'w', function(err, content){
              if(err){
                  console.log(err);
            }
            console.log(typeof content);
        
            });
        }
    });    
}


request(luowang, function(error, response, body){
    saveContent(body);
});


