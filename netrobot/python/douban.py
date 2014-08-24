# !/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib2
import sqlite3
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







# 连接数据库
conn = sqlite3.connect('./db/douban.rdb')
# 连接成功之后，你可以创建一个 cursor 对象，可以调用他的 execute() 方法来执行 SQL 命令

c = conn.cursor()
# 将链接存入数据库

# 尝试以此 url 作为入口
movie_classics = 'http://movie.douban.com/subject/1292052/?tag=%E7%BB%8F%E5%85%B8&from=gaia_video'
content = getDataStr(movie_classics)
content = pq(content)
movie_type = content('#info span').eq(3)
recommendations = content('#recommendations img')
length = recommendations.size()

i = 0
while i < length:
    item = recommendations.eq(i)
    item_link = item.parent().attr('href')
    item_img_src = item.attr('src')
    item_name = item.attr('alt')
    print item_link
    print '>>>>>>>'
    content = getDataStr(item_link)
    content = pq(content)
    recommendations = content('#recommendations img')

    # 查找表中是否已经存在该链接
    c.execute('select * from MOVIE where name=?', (item_name,))
    if not c.fetchone():
        print c.fetchone()
        c.execute('insert into MOVIE(href, name, post_url) values (?, ?, ?) ', (item_link, item_name, item_img_src))
        conn.commit()
    
    i += 1


conn.close()




