from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify, make_response, g, current_app
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import login_required
from flask.ext.mail import Message
from app import model

def send_email(to, subject, template, **kwargs):
    msg = Message(app.config['FLASKY_MAIL_SUBJECT_PREFIX'] + subject, sender=app. config['FLASKY_MAIL_SENDER'], recipients=[to])
    msg. body = render_template(template + '.txt', **kwargs)
    msg. html = render_template(template + '.html', **kwargs)
    mail. send(msg)
