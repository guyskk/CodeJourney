from __init__ import *

weather = Blueprint('weather', __name__)

@weather.route('/weather/<area>/')
def weather_area(area):
    if area is None:
        abort(404)
    data = {'area': area}
    return render_template('weather.html', data=data)

