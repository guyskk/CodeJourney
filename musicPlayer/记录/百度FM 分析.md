##百度FM 分析

2014/6/20 

###页面加载时有两个 GET 请求：  

* 1 http://fm.baidu.com/dev/api/?tn=playlist&id=public_yuzhong_oumei&special=flash&prepend=&format=json&_=1403266320248

返回的json

    {
        "hash_code": "447e1a1ecd49dd3f5701cd284ebd9428",
        "channel_id": "public_yuzhong_oumei",
        "channel_name": "\u6b27\u7f8e",
        "list": [{
            "id": 3459575,     //歌曲id
            "type": -1,
            "method": -1,
            "flow_mark": 0
        },{
            .........//list 是一个包含很多类似对象的数组
        },{
            "id": 25438221,
            "type": -1,
            "method": -1,
            "flow_mark": 0
        }],
        "results": null,
        "status": 0
    }


* http://fm.baidu.com/dev/api/?tn=usercounts&_=1403266320247

返回的json

    {
        "user_id": 0,
        "user_name": "",
        "hash_code": "447e1a1ecd49dd3f5701cd284ebd9428",//第一次获取之后会存在cookies中
        "level": null,
        "counts": {
            "like_songs": 0,
            "dislike_songs": 0,
            "total_listen": 0
        },
        "status": 2
    }


###切换下一首歌曲的时候，发送一个 POST 请求：

http://fm.baidu.com/dev/api/?action=userop&tn=userop&_=1403271279060

请求参数：

    action : userop
    tn : userop
    _ : 1403271279060     //好像是频道编号

返回：

    {"status":1}

###音乐文件请求地址：

http://music.baidu.com/data/music/fmlink/?

请求参数：
    
    songIds : 24098569,7149024,……   //歌曲id
    type : mp3                      //类型
    rate : 128                      //比特率
    callback : callback             //jsonp回调函数
    _ : 1403269028729               //暂时不知道代表什么意思，好像是频道编号。例子中的是欧美频道