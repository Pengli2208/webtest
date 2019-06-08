from flask import Flask, render_template, request
from flask import jsonify
import json
 
app = Flask(__name__)
app.config['SECRET_KEY'] = "dfdfdffdad"
testCnt1 = 1
testCnt2 = 100

@app.route('/')
def index():
    return render_template('index.html')
 
 
@app.route('/mystring')
def mystring():
    return 'my string'
 
 
@app.route('/refreshCnt1')
def refreshFromAjax():
    global testCnt1
    testCnt1 = testCnt1 + 1
    #print(random)
    return json.dumps(testCnt1)
 
@app.route('/refreshCnt2')
def refreshFromAjax2():
    global testCnt2
    testCnt2 = testCnt2 + 8
    #print(random)
    return json.dumps(testCnt2)
 
 
@app.route('/dataFromAjax')
def dataFromAjax():
    test = request.args.get('mydata')
    print(test)
    return 'dataFromAjax'
 
 
@app.route('/mydict', methods=['GET', 'POST'])
def mydict():
    print('post')
    if request.method == 'POST':
        a = request.form['mydata']
        print(a)
    d = {'name': 'xmr', 'age': 18}
    return jsonify(d)
 
 
@app.route('/name', methods=['POST'])
def getname():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    d = {'name': firstname + ' ' + lastname, 'age': 18}
    print(d)
    return jsonify(d)
 
 
@app.route('/myform', methods=['POST'])
def myform():
    print('post')
    a = request.form['FirstName']
    print(a)
    d = {'name': 'xmr', 'age': 18}
    return jsonify(d)
 
 
@app.route('/mylist')
def mylist():
    l = ['xmr', 18]
    print('mylist')
    return json.dumps(l)  #
 
 
@app.route('/mytable')
def mytable():
    table = [('id', 'name', 'age', 'score'),
        ('1', 'xiemanrui', '18', '100'),
        ('2', 'yxx', '18', '100'),
        ('3', 'yaoming', '37', '88')]
 
    print('mytable')
    data = json.dumps(table)
    print(data)
    return data
 
 
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True)
