# coding:utf-8
from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify, make_response, g, current_app

error = Blueprint('error', __name__)

@error.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@error.app_errorhandler(500)
def interval_error(e):
    return render_template('500.html'), 500
