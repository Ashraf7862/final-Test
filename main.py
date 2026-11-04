from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        print('Feedback Submitted:', { 'name': name, 'email': email, 'message': message })
        return 'Feedback submitted successfully!'
    return render_template('index.html')