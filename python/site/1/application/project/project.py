#!/usr/bin/env python
# -*- coding: utf-8 -*-

import web
import urllib2
import urllib
import time
import json
import re
import os

app_root = os.path.dirname(__file__)
templates_root = os.path.join(app_root, 'templates')
render = web.template.render(templates_root)

urls=(
    '', 'Index',
    '/user/login', 'Login',
    '/user/login/check', 'CheckUser'
    )

app = web.application(urls, locals())

# Router

class Index:
    def __init__(self):
        pass

    def GET(self):
        return render.index()

class Login:
    def __init__(self):
        pass

    def GET(self):
        return render.login()

class CheckUser:
    def __init__(self):
        pass

    def GET(self):
        name = web.input().username
        raise web.seeother("/")