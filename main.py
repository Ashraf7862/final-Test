from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feedback.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        feedback = Feedback(name=name, email=email, message=message)
        db.session.add(feedback)
        db.session.commit()
        return jsonify({'message': 'Feedback submitted successfully!'}), 201
    return render_template('index.html')

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    name = data.get('name', 'N/A')
    email = data.get('email', 'N/A')
    message = data.get('message', 'N/A')
    feedback = Feedback(name=name, email=email, message=message)
    db.session.add(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback submitted successfully!'}), 201

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)