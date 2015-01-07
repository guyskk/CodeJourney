from flask import Blueprint, render_template
from flask.ext.login import login_user

auth = Blueprint('auth', __name__)

from . import views

