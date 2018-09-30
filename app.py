from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import psycopg2
import jinja2
import json, ast


app = Flask(__name__)
api = Api(app)

CORS(app)

def initDB():
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	#print ("Connecting to database\n ->%s" % (conn_string))
	conn = psycopg2.connect(conn_string)
	curr = conn.cursor()
	print ("Connected!")
	return conn, curr


conn, cur = initDB()

@app.route("/")
def hello():
    return jsonify("Hello World and DB!!")

@app.route("/dbinfo")
def dbinfo():
    conn, cur = initDB()
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

# @app.route("/uid")
# def uid():
#     conn, curr = initDB()
#     str = "INSERT INTO STUDENT (studentid) VALUES"

class Students(Resource):
    def get (self, id, adbool):
        print('id, adbool: ' + id + " " + adbool)
        conn, curr = initDB()
        bools = int(adbool)
        if bools == 0:
            query = "INSERT INTO students (studentid) VALUES (%s)"
        else:
            query = "INSERT INTO admin (admin_id) VALUES (%s)"
        curr.execute(query, (id, ))
        conn.commit()
        curr.close()
        return jsonify("OKKK")

api.add_resource(Students, '/students/<id>/<adbool>')

@app.route("/getCollegeInfo", methods = ['GET'])
def getCollegesInfo():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		curs = conn.cursor()
		collegeName = request.headers.get('collegeName')
		collegeN = (collegeName, )
		curs.execute("SELECT information FROM COLLEGES WHERE collegename = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'information' : row[0],
			}
			result.append(obj)
		response = jsonify(result)
		response.status_code = 200
		return response
	finally:
		if con:
			con.close()

@app.route("/getColleges", methods = ['GET'])
def getCollege():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		curs = conn.cursor()
		curs.execute("SELECT collegename, image_link FROM COLLEGES")
		result = []
		for row in curs:
			obj = {
				'collegeName' : row[0],
        		'image_link' : row[1],
			}
			result.append(obj)
		response = jsonify(result)
		response.status_code = 200
		return response
	finally:
		if con:
			con.close()

def insertIntoDB(tablename, keyval, conn, cursor):
    # print "Keyval is", keyval
    columns = ','.join (k for k in keyval)
    # print "columns: ", type(columns)
    placeholder = ','.join( "%s" for k in keyval)
    # print "placeholder: ", type(placeholder)

    query = "INSERT INTO " + tablename + " (" + columns + ") VALUES (" + placeholder + ")"
    print (query)

    valTuple = ()
    for (k,v) in keyval.items():
        valTuple = valTuple + (v, )
    # print (str(valTuple))
    # print type(valTuple)
    # print (str(query))
    cursor.execute(query, valTuple)


def UpdateIntoDB(tablename, keyval, target_keyval, conn, cursor):
    #print "Keyval is", keyval

    for (k,v) in keyval.items():
        query = "UPDATE " + tablename + " SET " + k + " = %s WHERE %s = studentid"
        valTuple = ()
        valTuple = (v, ) + (target_keyval, )
        query = str(query)
        # print (query)
        # print (str(valTuple))
        cursor.execute(query, valTuple)


@app.route("/putStudents", methods = ['POST'])
def putStudents():

    conn, cur = initDB()

    # convert json request into ascii utf-8
    text = ast.literal_eval(json.dumps(request.get_json()))

    student_id = text["studentid"]

    # insertIntoDB('students', text, conn, cur)
    # query = "UPDATE students SET fname = %s, lname = %s  WHERE %s = studentid"
    # cur.execute(query, (fname, lname, student_id,))

    UpdateIntoDB('students', text, student_id, conn, cur)

    conn.commit()
    cur.close()
    response = jsonify("HI")
    response.status_code = 200
    return response


@app.route("/getStudents/<uid>", methods = ['GET'])
def getStudents(uid):
    conn, cur = initDB()
    cur.execute("SELECT * FROM students WHERE studentid = %s", (uid, ))
    colnames = [desc[0] for desc in cur.description]
    
    keyval = {}
    for row in cur:
        temp = ast.literal_eval(json.dumps(colnames))
        for i in range (0, len(temp)):       
            obj = {
                temp[i] : row[i],
            }
            keyval.update(obj)

    #print "Keyval: ", keyval

    response = jsonify(keyval)
    print "response: ", response
    response.status_code = 200
    cur.close()
    return response


if __name__ == '__main__':
    conn, cur = initDB()
    app.run(debug=True)
