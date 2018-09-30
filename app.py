from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import psycopg2
import jinja2
import json, ast
import sendgrid
import os
from sendgrid.helpers.mail import *

app = Flask(__name__)
api = Api(app)


CORS(app)

def initDB():
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
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
		curs.execute("SELECT information, tuition_in, tuition_out, school_locat, a_calender, num_students, num_ugrads, num_postgrads, found_year, telephone, deadlines, stud_fac, yr_grad FROM COLLEGES WHERE collegename = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'information' : row[0],
				'tuition_in' : row[1],
				'tuition_out' : row[2],
				'school_locat' : row[3],
				'a_calender' : row[4],
				'num_students' : row[5],
				'num_ugrads' : row[6],
				'num_postgrads' : row[7],
				'found_year' : row[8],
				'telephone' : row[9],
				'deadlines' : row[10],
				'stud_fac' : row[11],
				'yr_grad' : row[12]
			}
			result.append(obj)
		response = jsonify(result)
		response.status_code = 200
		conn.commit()
		curs.close()
		return response
	finally:
		if con:
			con.close()
@app.route("/postResponse", methods = ['POST'])
def postResponse():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		con = psycopg2.connect(conn_string)
		print ("Connecting to database\n ->%s" % (conn_string))
		studentid = request.headers.get('studentid')
		collegeName = request.headers.get('collegeName')
		q1 = request.headers.get('q1')
		q2 = request.headers.get('q2')
		q3 = request.headers.get('q3')
		appliedStatus = request.headers.get('appliedStatus')
		major = request.headers.get('major')
		curs = con.cursor()
		print "collegeName: ", collegeName
		collegeN = (collegeName, )
		curs.execute("SELECT collegeid FROM COLLEGES WHERE collegename = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'collegeid' : row
			}
		result.append(obj)
		query = "INSERT INTO current_application (studentid, collegeid, q1, q2, q3, appliedStatus, major) VALUES (%s, %s, %s, %s, %s, %s, %s)"
		curs.execute(query, (studentid, result[0]['collegeid'], q1, q2, q3, appliedStatus, major, ))
		con.commit()
		curs.close()
		return jsonify("200")
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
		conn.commit()
		curs.close()
		return response
	finally:
		if con:
			con.close()

def insertIntoDB(tablename, keyval, conn, cursor):
    columns = ','.join (k for k in keyval)
    placeholder = ','.join( "%s" for k in keyval)
    query = "INSERT INTO " + tablename + " (" + columns + ") VALUES (" + placeholder + ")"
    print (query)
    valTuple = ()
    for (k,v) in keyval.items():
        valTuple = valTuple + (v, )
    cursor.execute(query, valTuple)


def UpdateIntoDB(tablename, keyval, target_keyval, conn, cursor):
    for (k,v) in keyval.items():
        query = "UPDATE " + tablename + " SET " + k + " = %s WHERE %s = studentid"
        valTuple = ()
        valTuple = (v, ) + (target_keyval, )
        query = str(query)
        cursor.execute(query, valTuple)


@app.route("/sendEmail/<email_id>", methods = ['GET'])
def sendEmail(email_id):
    sg = sendgrid.SendGridAPIClient(apikey='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')
    from_email = Email("collegeappio2@gmail.com")
    subject = "Hello World from the SendGrid Python Library!"
    to_email = Email(str(email_id))
    content = Content("text/plain", "Hello, Email!")
    mail = Mail(from_email, subject, to_email, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    print response.status_code 
    print response.body
    print response.headers
    return jsonify("Sent")

@app.route("/putStudents", methods = ['POST'])
def putStudents():
    conn, cur = initDB()
    text = ast.literal_eval(json.dumps(request.get_json()))
    student_id = text["studentid"]
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
    response = jsonify(keyval)
    print "response: ", response
    response.status_code = 200
    cur.close()
    return response


if __name__ == '__main__':
    conn, cur = initDB()
    app.run(debug=True)
