#!/usr/bin/env python
# -*- coding: utf-8 -*-

import urllib2
# from pyquery import PyQuery as pq
from BeautifulSoup import BeautifulSoup


urls = 'http://www.yayaxz.com/features'

content = urllib2.urlopen(urls).read()

html = BeautifulSoup(content)


# 创建文件
#
f = open('features.html', 'w')

print html.dl

result = str(html.findAll('dl'))

f.write("<meta charset=\"UTF-8\">"+result)

f.close()




