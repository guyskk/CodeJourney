# coding: utf-8
import os
from flask import Flask, request, current_app, g, make_response, render_template, session, redirect, url_for, flash
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand

from app.model import User, Role
from app import create_app
from config import config


app = create_app('default')


if __name__ == '__main__':
    app.run()
