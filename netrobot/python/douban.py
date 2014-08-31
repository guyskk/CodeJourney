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

# 保存电影分类
url_movie_tag = 'http://movie.douban.com/j/search_tags?type=movie'
movie_tags = getDataStr(url_movie_tag)
# saveFile('tags.json', movie_tags);


def getMovieActors(DOM):
    result = {}
    for item in DOM:
        result[pq(item).html()] = pq(item).attr('href')
    return result

def getMovieType(DOM):
    result = [];
    for item in DOM:
        result[0:0] = pq(item).html()
        print pq(item).html()
    return result



# 连接数据库
conn = sqlite3.connect('./douban/db/douban.rdb')
# 连接成功之后，你可以创建一个 cursor 对象，可以调用他的 execute() 方法来执行 SQL 命令

c = conn.cursor()
# 将链接存入数据库

def updateMovieInfo(url):
    content = getDataStr(url)
    content = pq(content)
    movie_info = content('#info>span')

    # 保存一部分电影的信息
    movie_director = movie_info.eq(0).find('a').html()
    movie_actors = getMovieActors(movie_info.eq(2).find('a'))

    movie_type = getMovieType(movie_info.filter(lambda i: pq(this).attr('property') == 'v:genre'))

    print movie_type
    movie_type = str(movie_type)

    movie_country = str(movie_info.filter(lambda i: pq(this).text() == u'制片国家/地区:').next())
    print movie_country
    c.execute('select href from MOVIE where href = ?', (url,))

    if c.fetchone() is not None:
        c.execute('update MOVIE set type = ?, director = ?, country = ? where href = ?', (movie_type, movie_director,  movie_country, url, ))

    recommendations = content('#recommendations img')
    length = recommendations.size()
    i = 0
    while i < length:
        item = recommendations.eq(i)
        item_link = item.parent().attr('href')
        item_img_src = item.attr('src')
        item_name = item.attr('alt')


        # 查找表中是否已经存在该链接
        c.execute('select * from MOVIE where name=?', (item_name,))
        if not c.fetchone():
            c.execute('insert into MOVIE(href, name, post_url, visited) values (?, ?, ?, ?) ', (item_link, item_name, item_img_src, False))
            conn.commit()
        i = i + 1

# 尝试以此 url 作为入口
movie_classics = 'http://movie.douban.com/subject/1292052/?tag=%E7%BB%8F%E5%85%B8&from=gaia_video'
updateMovieInfo(movie_classics)


while True:

    c.execute('select href from MOVIE where visited = ?', (False, ))
    new = c.fetchone()
    if  new is not None:
        c.execute('update MOVIE set visited = 1 where href = ?', new)

        updateMovieInfo(new[0]);

    else :
        print "Done!!"
        break


conn.close()




