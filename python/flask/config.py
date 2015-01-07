# coding: utf-8
import os

class Config:
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    FLASKY_MAIL_SUBJECT_PREFIX = '[Flasky]'
    FLASKY_MAIL_SENDER = 'Flasky Admin <flasky@example.com>'
    FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN')

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/turbo'
    MYSQL_DATABASE_USER = 'root'
    MYSQL_DATABASE_PASSWORD = '123456'
    MYSQL_DATABASE_DB = 'turbo'
    MYSQL_DATABASE_HOST = 'localhost'


class TestingConfig(Config):
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/turbo'
    MYSQL_DATABASE_USER = 'root'
    MYSQL_DATABASE_PASSWORD = '123456'
    MYSQL_DATABASE_DB = 'turbo-test'
    MYSQL_DATABASE_HOST = 'localhost'


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/turbo'
    MYSQL_DATABASE_USER = 'root'
    MYSQL_DATABASE_PASSWORD = '123456'
    MYSQL_DATABASE_DB = 'turbo'
    MYSQL_DATABASE_HOST = 'localhost'


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

