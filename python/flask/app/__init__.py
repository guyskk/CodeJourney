# coding: utf-8

from flask import Flask, render_template, Blueprint, redirect, request, url_for, flash
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.mail import Mail, Message

from config import config
from . import model

login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'


def create_app(config_name):
    app = Flask(__name__)

    db = SQLAlchemy(app)

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    login_manager.init_app(app)
    # db.init_app(app)

    from .views.people import people
    from error import error
    from .auth import auth as auth_blueprint
    from .views.weather import weather

    app.register_blueprint(people)
    app.register_blueprint(error)
    app.register_blueprint(weather)
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    def make_shell_context():
        return dict(app=app, db=db, User=model.User, Role=model.Role)

    mail = Mail(app)
    migrate = Migrate(app, db)
    manager = Manager(app)
    manager.add_command('db', MigrateCommand)
    manager.add_command('shell', Shell(make_context=make_shell_context))


    @app.before_first_request
    def create_database():
        db.create_all()


    return manager