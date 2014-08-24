#!/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib2
import os.path
from pyquery import PyQuery as pq
from lxml import etree

rootDir = './html/'
urls = 'http://www.luoo.net/music/'
content = urllib2.urlopen(urls).read()

content = pq(content)

print content("a")

# 创建文件
luooDir = rootDir+'luoo/'
if not os.path.exists(luooDir): 
    os.makedirs(luooDir)

with open(luooDir+'music.html', 'w+') as file_obj:
    file_obj.write(str(content))





