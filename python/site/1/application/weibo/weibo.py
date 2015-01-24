#!/usr/bin/env python
# -*- coding: utf-8 -*-

import web
import urllib2
import urllib
import time
import json
import re
import os

app_root = os.path.dirname(__file__)
templates_root = os.path.join(app_root, 'templates')
render = web.template.render(templates_root)


urls=(
    # daily route
    '', 'Weibo',
)

headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6)Gecko/20091201 Firefox/3.5.6'}

app = web.application(urls, locals())

class Weibo:
    def __init__(self):
        pass

    def GET(self):
        return render.daily()


# zhihu API
class APIStartImage:
    def __init__(self):
        pass

    def GET(self):
        req = urllib2.Request(url=APIPaths['start_image'], headers=headers)
        stream = urllib2.urlopen(req)
        start_image = json.load(stream)
        start_image = json.dumps(start_image, encoding='utf-8')
        start_image = start_image.replace('"img": "http://', '"img": "http://pureloser-zhihudaily.stor.sinaapp.com/')
        return start_image


class APINewsLatest:
    def __init__(self):
        pass

    def GET(self):
        req = urllib2.Request(url=APIPaths['news_latest'], headers=headers)
        stream = urllib2.urlopen(req)
        # to dict
        news_latest = json.load(stream) 
        # to json
        news_latest = json.dumps(news_latest, encoding='utf-8')
        # replace image url
        news_latest = news_latest.replace('"images": ["http://', '"images": ["http://pureloser-zhihudaily.stor.sinaapp.com/')
        return news_latest


class APINewsHot:
    def __init__(self):
        pass

    def GET(self):
        req = urllib2.Request(url=APIPaths['news_hot'], headers=headers)
        stream = urllib2.urlopen(req)
        # to dict
        news_hot = json.load(stream)
        # to json
        news_hot = json.dumps(news_hot, encoding='utf-8')
        # replace image url
        news_hot = news_hot.replace('"thumbnail":["http://','"images": ["http://pureloser-zhihudaily.stor.sinaapp.com/')
        return news_hot


class APINewsSections:
    def __init__(self):
        pass

    def GET(self):
        req = urllib2.Request(url=APIPaths['news_sections'], headers=headers)
        stream = urllib2.urlopen(req)
        news_sections = json.load(stream)
        news_sections = json.dumps(news_sections, encoding='utf-8')
        return news_sections


class SaveImage:
    def __init__(self):
        pass

    def GET(self):
        # start image
        print APIPaths['start_image']
        req = urllib2.Request(url=APIPaths['start_image'], headers=headers)
        print req
        stream = urllib2.urlopen(req)
        start_image = json.load(stream)
        saveimagetostorage(start_image['img'])
        # news latest
        req = urllib2.Request(url=APIPaths['news_latest'], headers=headers)
        stream = urllib2.urlopen(req)
        news_latest = json.load(stream)
        top_news_list = news_latest['top_stories']

        for item in news_latest['top_stories']:
            data = saveimagetostorage(item['image'])

        for item in news_latest['stories']:
            if item.get('images') is not None:
                for url in item['images']:
                    data = saveimagetostorage(url)

        # return "Done"
        print "clock2:%s" % time.clock()
        if 'SERVER_SOFTWARE' in os.environ:
            # from sae.storage import Bucket
            # bucket = Bucket("zhihudaily")
            # # 存取一个文件到bucket中
            # updatetime = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())
            # bucket.put_object("log/"+updatetime+".txt", updatetime+"\n")
            return "SAE"+" Update Time:"+time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())
        else:
            return "LocalHost"+" Update Time:"+time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())


