var fs = require("fs"),
    filename = process.argv[2];

console.log(process.argv);

if(!filename){
    console.log('A file to watch must be specified!');
    return false;
}

fs.watch(filename, function(){
    console.log("File " + filename + " just changed!");
});

console.log("Now watching " + filename + " for changes...");


