from flask import Flask, request, render_template, jsonify, send_from_directory,json
from flask_cors import CORS 
import os

app = Flask(__name__, static_folder='../dist/static',
            template_folder='../dist')
CORS(app, supports_credentials=True)  

records1 = []
records2 = []
@app.route('/api/getSurvey', methods=['post'])
def getData():
    print(json.loads(json.dumps(request.form))['group'])
    if json.loads(json.dumps(request.form))['group'] == '/instructions1':
        records1.append(request.form)
        with open('./backend/data/group1/data.json','w') as f:
            json.dump(records1,f)
    else:
        records2.append(request.form)
        with open('./backend/data/group2/data.json','w') as f:
            json.dump(records2,f)
    return ''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
