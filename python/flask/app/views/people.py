# from __init__ import *
from __init__ import *

people = Blueprint("people", __name__)

@people.route('/secret/')
@login_required
def secret():
    return 'Only authenticated users are allowed!'


@people.route('/dashboard/')
def dash():
    return 'Dashboard!'


@people.route('/')
def index():
    # call the method named render_tempalte in maker_response() directly
    u = model.User()

    response = make_response(render_template('index.html'))
    response.set_cookie('answer', '42')
    return response


@people.route('/u/<id>/')
def people_id(id):
    if id is None:
        abort(404)
    people_form = form.NameForm()
    data = {'name': id, 'people_id': id}
    flash('Look like you are foolish~')
    flash('What? you said you are not?')
    flash('Come on, you are what I said!')
    u = Model.User.query.filter_by(username=id).first()
    if u is None:
        new = model.User(username=id)
        db.session.add(new)
        db.session.commit()
    return render_template('people.html', data=data, form=people_form)
