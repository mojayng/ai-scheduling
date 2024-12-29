from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Example event data structure
events = {"Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": []}

@app.route('/')
def index():
    return render_template('index.html', events=events)

@app.route('/add_event', methods=['POST'])
def add_event():
    data = request.get_json()
    day = data['day']
    event = data['event']
    events[day].append(event)
    return jsonify({"message": "Event added successfully", "events": events[day]})

if __name__ == '__main__':
    app.run(debug=True)
