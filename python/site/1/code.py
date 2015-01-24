#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import web
import urllib2
import urllib
import re
import time

import json

# 引入自己的子程序
import sys
sys.path.append('./application/daily')
sys.path.append('./application/weibo')
import daily
import weibo



# variables
# imagePath = './static/images'
# APIPaths = api.APIPaths
headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6)Gecko/20091201 Firefox/3.5.6'}

urls = (
    '/(.*)/', 'Redirect',
    '/', 'Index',
    '/movie', 'Movie',
    '/daily', daily.app,
    '/weibo', weibo.app

)

app_root = os.path.dirname(__file__)
templates_root = os.path.join(app_root, 'templates')
render = web.template.render(templates_root)

# Routers


class Redirect:
    def __init__(self):
        pass

    def GET(self, path):
         web.seeother('/' + path)

class Index:
    def __init__(self):
        pass

    def GET(self):
        title = 'Web实践 | 张小伦爱学习|'
        render = web.template.render(templates_root, base='base')
        return render.index(title)


class About:
    def __init__(self):
        pass

    def GET(self):
        name = 'About'
        return render.about(name)


class Movie:
    def __init__(self):
        pass

    def GET(self):
        db = web.database(dbn="sqlite", db="./db/douban.rdb")
        # Select all entries from table 'mytable'
        movies = []
        entries = db.select('MOVIE')
        print entries   # Iter Better
        for name in entries:
            print name  # Storage
            movies.append(dict(name))  # after dict(), name -> dict and movies is list

        return render.movie(movies)


class User:
    def __init__(self):
        pass

    def GET(self, name):
        i = web.input(name=None)
        return render.users(i.name)

class Music:
    def __init__(self):
        pass

    def GET(self):
        return render.music()



app = web.application(urls, globals())
if __name__ == "__main__":
    app.run()
elif 'SERVER_SOFTWARE' in os.environ:
    import sae
    application = sae.create_wsgi_app(app.wsgifunc())

