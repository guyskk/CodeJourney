#!/usr/bin/env python
# -*- coding: utf-8 -*-

import web

# Python 中有一个东西叫做可变参数 真是给跪了 还有一个叫做关键字参数的东西
# 
# 在Python中定义函数，可以用必选参数、默认参数、可变参数和关键字参数，这4种参数都可以一起使用，或者只用其中某些，但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数和关键字参数。


urls = (
    '/', 'index',
    '/hello', 'hello',
    '/user(.*)', 'user'
    )

class index:
    def GET(self):
        title = 'Index'
        return render.index(title);

class hello:
    def GET(self, name):
        name = 'zhanglun'
        i = web.input(name=None)
        return "Hello, world!" # index 是模板的名字，name 是传入模板的参数

class user:
    def GET(self, name):
        i = web.input(name=None)
        return render.users(i.name)




if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()


# 告诉 web.py 去 templates 目录中寻找模板

render = web.template.render('templates/')