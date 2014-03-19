from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def hello_world():
    return render_template('index.html')

@app.route('/01_pendulum')
def hello_world2():
    return render_template('01_pendulum.html')

if __name__ == '__main__':
    app.run()
