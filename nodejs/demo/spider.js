/**
 * Created by CrispElite on 2015/1/20 0020.
 */

var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

function parseData(data){
    var $ = cheerio.load(data);
    var container = $('#content_left');
    console.log(container.html());
}

function download(url, callback) {
    var req = http.get(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(data);
        });
    });
    req.on('error', function () {
        callback(null);
    });
}

function Spider(keyword, max) {
    this.base = 'http://www.baidu.com/s?&tn=96514610_hao_pg&ie=utf-8&rsv_pq=c457b3bb00036f10&rsv_t=1d70YI4TOrmopAwqFhgVmKO3HmiX1vR8fpAfTT5%2BCTg%2FrBcJcZIzWJDLI%2BukGJB583N4rEJt&f=8&rsv_bp=1';
    this.keyword = keyword;
    this.page = 0;
    this.max = max-1;
}


Spider.prototype.nextUrl = function () {
    if (this.page < 0) {
        console.log('Page is not exist!');
        return false;
    }
    if (this.page > 10) {
        console.log('Page Maxium!');
        return false;
    }
    var url = this.base + '&wd=' + this.keyword + '&oq=' + this.keyword + '&pn=' + this.page + '0';
    this.page += 1;
    return url;
};


Spider.prototype.getKeyWord = function(){
    return this.keyword;
};

var mylittlespider = new Spider('吉林教育', 10);
var timer = null;

timer = setInterval(function () {
    var url = mylittlespider.nextUrl();
    var keyword = mylittlespider.getKeyWord();
    download(url, function (data) {
        console.log(url);
        //parseData(data);
        if(mylittlespider.page > mylittlespider.max){
            clearInterval(timer);
        }
        if (data) {
            fs.writeFile(keyword + mylittlespider.page + '.html', data, function (err) {
                if (err) {
                    console.log(err.message);
                    return false;
                }
                console.log('It\'s saved! 第' + mylittlespider.page + '页的搜索结果');
            });
        }
        else console.log("error");
    });
}, 1000);