from flask import Flask, request, render_template, jsonify, send_from_directory,json,jsonify
# from flask_cors import CORS 
import os

app = Flask(__name__, static_folder='../dist/static',
            template_folder='../dist')
# CORS(app, supports_credentials=True)  

@app.route('/')
def index():
    # 由于前端html页面都被打包压缩，因此直接使用jinja模板来传参不可行，这样就要另开启一个接口
    return render_template('index.html') # render_template('index.html', language='r') 此种方法行不通


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
    return jsonify({'group1':records1,'group2':records2})

@app.route('/api/getRes', methods=['get'])
def getRes():
    return jsonify({'group1':records1,'group2':records2})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
