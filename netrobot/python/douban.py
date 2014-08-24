# !/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib2
import os.path
from pyquery import PyQuery as pq
from lxml import etree

rootDir = 'douban/'
# 豆瓣电影


# 返回的是 str
def getDataStr(url):
    content = urllib2.urlopen(url).read()
    # content = content.encode('utf-8')
    return content

# 保存HTML
def saveFile(filename, content):
    file_dir = rootDir + 'html/'
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)

    with open(file_dir + filename, 'a+') as file_obj:
        file_obj.write('\xEF\xBB\xBF'+ str(content))



rootUrl = 'http://movie.douban.com/'

# 保存电影分类
url_movie_tag = 'http://movie.douban.com/j/search_tags?type=movie'
movie_tags = getDataStr(url_movie_tag)
saveFile('tags.json', movie_tags);

# 尝试以此 url 作为入口
movie_classics = 'http://movie.douban.com/subject/1292052/?tag=%E7%BB%8F%E5%85%B8&from=gaia_video'

content = getDataStr(movie_classics)
content = pq(content)
movie_type = content('#info span').eq(3)

recommendations = content('#recommendations a')

length = recommendations.size()

i = 0
while i < 20:
    item = recommendations.eq(i) 
    print item.attr('href')
    print '>>>>>>>'
    content = getDataStr(item.attr('href'))
    content = pq(content)
    recommendations = content('#recommendations a')
    saveFile("move_list.html", recommendations)    
    i += 1






