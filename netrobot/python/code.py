#!/usr/bin/env python
# -*- coding: utf-8 -*-

import urllib2
# from pyquery import PyQuery as pq
from bs4 import BeautifulSoup
from sgmllib import SGMLParser
 
class ListName(SGMLParser):
    def __init__(self):
        SGMLParser.__init__(self)
        self.is_h2 = ""
        self.name = []
    def start_h4(self, attrs):
        self.is_h2 = 1
    def end_h4(self):
        self.is_h2 = ""
    def handle_data(self, text):
        if self.is_h2 == 1:
            self.name.append(text)


class subjectList():
    pass

urls = 'http://www.yayaxz.com/features'

content = urllib2.urlopen(urls).read()

html = BeautifulSoup(content)

title = html
print title.dl
