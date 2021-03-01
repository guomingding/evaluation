from flask import Flask, request, render_template, jsonify, send_from_directory,json
from flask_cors import CORS 
import os

app = Flask(__name__, static_folder='../dist/static',
            template_folder='../dist')
CORS(app, supports_credentials=True)  


@app.route('/api/getSurvey', methods=['post'])
def getData():
    jsonData = json.dumps(request.form)

    with open('./backend/data/data.json','a') as f:
        json.dump(request.form,f)
    return ''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
