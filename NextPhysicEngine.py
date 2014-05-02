from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index')
@app.route('/pendulum')
def pendulum():
    return render_template('pendulum.html')

@app.route('/spring')
def spring():
    return render_template('spring.html')

@app.route('/collision2d')
def collision2d():
    return render_template('collision2d.html')

@app.route('/pendulumCollision')
def pendulumCollision():
    return render_template('pendulumCollision.html')

@app.route('/pendulumCollisionPlus')
def pendulumCollisionPlus():
    return render_template('pendulumCollisionPlus.html')

@app.route('/parabolicMotion')
def parabolicMotion():
    return render_template('parabolicMotion.html')

@app.route('/forcedSpring')
def forcedSpring():
    return render_template('forcedSpring.html')

@app.route('/rotation')
def rotation():
    return render_template('rotation.html')

@app.route('/rotationPlus')
def rotationPlus():
    return render_template('rotationPlus.html')

@app.route('/kepler')
def kepler():
    return render_template('kepler.html')

if __name__ == '__main__':
    app.run()
