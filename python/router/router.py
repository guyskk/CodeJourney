#!/usr/bin/env python
# -*- coding: utf-8 -*-
urls = (
    '/', 'index',
    '/about', 'about',
    '/user(.*)', 'user'
    )


class index:
    def GET(self):
        title = 'Index'
        return render.index(title);

class about:
    def GET(self):
        name = 'zhanglun'
        return render.about(name); # index 是模板的名字，name 是传入模板的参数

class user:
    def GET(self, name):
        i = web.input(name=None)
        return render.users(i.name)