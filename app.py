from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import re, os

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET','change_this_secret')

# SMTP placeholders - replace with real credentials
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password'
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'

mail = Mail(app)

NAME_RE = re.compile(r'^[A-Za-z\s]{2,}$')
EMAIL_RE = re.compile(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
PHONE_RE = re.compile(r'^\+?[0-9\s\-]{7,15}$')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    name = request.form.get('name','').strip()
    email = request.form.get('email','').strip()
    phone = request.form.get('phone','').strip()
    message = request.form.get('message','').strip()
    if not NAME_RE.match(name):
        return jsonify({'success':False,'message':'Invalid name.'}),400
    if not EMAIL_RE.match(email):
        return jsonify({'success':False,'message':'Invalid email.'}),400
    if not PHONE_RE.match(phone):
        return jsonify({'success':False,'message':'Invalid phone.'}),400
    if len(message) < 6:
        return jsonify({'success':False,'message':'Message too short.'}),400
    body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}"
    try:
        msg = Message(subject=f"Contact from {name}", recipients=[app.config['MAIL_USERNAME']], body=body)
        mail.send(msg)
        return jsonify({'success':True,'message':'Message sent successfully.'})
    except Exception as e:
        print('Mail error:', e)
        return jsonify({'success':False,'message':'Failed to send email (check SMTP).'}),500

if __name__ == '__main__':
    app.run(debug=True)
