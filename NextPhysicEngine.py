from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/01_pendulum')
def simulation1():
    return render_template('01_pendulum.html')

@app.route('/02_spring')
def simulation2():
    return render_template('02_spring.html')

@app.route('/03_collision2d')
def simulation3():
    return render_template('03_collision2d.html')

@app.route('/04_collision_pendulum')
def simulation4():
    return render_template('04_collision_pendulum.html')

@app.route('/04plus_collision_pendulum')
def simulation4plus():
    return render_template('04plus_collision_pendulum.html')

@app.route('/05_parabolic_motion')
def simulation5():
    return render_template('05_parabolic_motion.html')

@app.route('/06_spring_motion_plus')
def simulation6():
    return render_template('06_spring_motion_plus.html')

@app.route('/07_rotation_motion')
def simulation7():
    return render_template('07_rotation_motion.html')

@app.route('/08_kepler_motion')
def simulation8():
    return render_template('08_kepler_motion.html')

if __name__ == '__main__':
    app.run()
