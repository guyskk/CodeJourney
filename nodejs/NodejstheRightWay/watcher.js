var fs = require("fs");
fs.watch('target.txt', function(){
    console.log("File's 'target.txt' just changed!");
});
console.log("Now watching target.txt for changes...");