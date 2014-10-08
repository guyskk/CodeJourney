# github: https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90
#
#

import urllib2


APIPaths = {
        'start_image':'http://news-at.zhihu.com/api/3/start-image/1080*1776',
        'news_latest':'http://news-at.zhihu.com/api/3/news/latest'
        }


# {'text':'XXX', 'url':''}
def getStartImage():
    content_stream = urllib2.urlopen(APIPaths['start_image'])
    daily_start_img = content_stream.read()
    return daily_start_img 

daily_start_img = getStartImage()

def getNewsLatest():
    stream = urllib2.urlopen(APIPaths['news_latest']);
    news_latest = stream.read()
    return news_latest

news_latest = getNewsLatest()


