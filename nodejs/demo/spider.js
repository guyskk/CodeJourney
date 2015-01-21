/**
 * Created by CrispElite on 2015/1/20 0020.
 */

var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

function parseData(data, callback){
    var $ = cheerio.load(data, {decodeEntities: false});
    var result = [];
    var list = $('#content_left .result.c-container');
    list.each(function(i, elem){
        var _this = $(this);
        if(!_this.find('.c-abstract').html()){
            return false;
        }
        result.push({
            title: _this.find('.t a').html().replace(/<.*?>/gi, ''),
            content: _this.find('.c-abstract').html().replace(/<.*?>/gi, ''),
            date: _this.find('.g').html().match(/\d{4}-\d{2}-\d{2}/gi)
        });
    });

    callback(JSON.stringify(result));
}

function saveFile(data){
    fs.appendFileSync('json.txt', data, {'encoding': 'utf-8'});
}

function download(url, callback) {
    var req = http.get(url, function (res) {
        console.log(url);
        var data = '';
        res.setEncoding('utf-8');
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
    if (this.page > this.max) {
        console.log('Page Maxium!');
        return false;
    }
    var url = this.base + '&wd=' + this.keyword + '&oq=' + this.keyword + '&pn=' + this.page + '0';
    this.page += 1;
    return url;
};


var mylittlespider = new Spider('吉林民族教育', 76);
var timer = null;
var url_list = [];
timer = setInterval(function () {
    var url = mylittlespider.nextUrl();
    if(!url){
        return false;
    }
    download(url, function (data) {
        if(mylittlespider.page > mylittlespider.max){
            clearInterval(timer);
        }
        if (data) {
            parseData(data, saveFile);
        }else{
            console.log("error");
        }
    });
}, 1000);