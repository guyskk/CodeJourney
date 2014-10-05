#!/usr/bin/env python
# -*- coding: utf-8 -*-
import web
import itertools
import urllib2

url = 'http://www.douban.com'
header = {
    'Host': '',
    'Referer':'',
    'Cookie': '',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
    'Connection': 'keep-alive',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language':'zh-cn,zh;q=0.5',
    'Accept-Charset':'GB2312,utf-8;q=0.7,*;q=0.7',
}
header['Host'] = 'img3.douban.com'
header['Referer'] = url
req = urllib2.Request( url, headers=headers )


# opener = urllib2.build_opener()
# f = opener.open(req)

# Python 中有一个东西叫做可变参数 真是给跪了 还有一个叫做关键字参数的东西
# 
# 在Python中定义函数，可以用必选参数、默认参数、可变参数和关键字参数，这4种参数都可以一起使用，或者只用其中某些，但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数和关键字参数。

urls = (
    '/', 'index',
    '/about', 'about',
    '/movie', 'movie',
    '/user(.*)', 'user'
    )

class index:
    def GET(self):
        title = 'Index'
        return render.index(title);

class about:
    def GET(self):
        name = 'zhanglun'
        return render.about(name); # index 是模板的名字，name 是传入模板的参数

class movie:
    def GET(self):
        db = web.database(dbn = "sqlite", db = "./db/douban.rdb")
        
        # Select all entries from table 'mytable'
        movies = []
        entries = db.select('MOVIE')
        print entries   # IterBetter
        for name in entries:
            print name  # Storage
            movies.append(dict(name)) # after dict(), name -> dict and movies is list
            
        return render.movie(movies)

class user:
    def GET(self, name):
        i = web.input(name=None)
        return render.users(i.name)

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()

# 告诉 web.py 去 templates 目录中寻找模板
render = web.template.render('templates/', base = 'base')
