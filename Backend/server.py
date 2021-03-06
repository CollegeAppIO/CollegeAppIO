from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import psycopg2
import jinja2

app = Flask(__name__)
api = Api(app)

CORS(app)
  
def initDB():
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	print ("Connecting to database\n ->%s" % (conn_string))
	conn = psycopg2.connect(conn_string)
	cursor = conn.cursor()
	print ("Connected!")
	return conn, cursor

conn, cur = initDB()

@app.route("/")
def hello():
    return jsonify("Hello World and DB!!")
	
@app.route("/dbinfo")
def dbinfo():
    info = "Con: " + str (conn) + "Curr: " + str(cur)
    return jsonify(info)

class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]} 

class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)       


api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3


if __name__ == '__main__':
    app.run(debug=True)
     
