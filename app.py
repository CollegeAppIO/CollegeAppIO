from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import psycopg2
import jinja2
import json, ast
from sendgrid.helpers.mail import *
from flask_mail import Mail, Message

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
import os
def initEmailService():
	app.config['MAIL_SERVER']='smtp.gmail.com'
	app.config['MAIL_PORT'] = 465
	app.config['MAIL_USERNAME'] = os.environ['MAIL_USERNAME']
	app.config['MAIL_PASSWORD'] = os.environ['MAIL_PASSWORD']
	app.config['MAIL_USE_TLS'] = False
	app.config['MAIL_USE_SSL'] = True
	mail = Mail(app)
	return mail


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

@app.route("/postResponse", methods = ['POST'])
def postResponse():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		con = psycopg2.connect(conn_string)
		print ("Connecting to database\n ->%s" % (conn_string))
		text = ast.literal_eval(json.dumps(request.get_json()))
		print "text", text
		studentid = text['studentid']
		collegeName = text['collegeName']
		q1 = ""
		if 'q1' in text:
			q1 = text['q1']
		q2 = ""
		if 'q2' in text:
			q2 = text['q2']
		q3 = ""
		if 'q3' in text:
			q3 = text['q3']
		appliedStatus = text['appliedStatus']
		major = ""
		if 'major' in text:
			major = text['major']
		curs = con.cursor()
		curs2 = con.cursor()
		collegeN = (collegeName, )
		curs.execute("SELECT collegeid FROM COLLEGES WHERE collegename = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'collegeid' : row
			}
		result.append(obj)
		collegeid = result[0]['collegeid']
		results = checkUser(studentid, collegeid)
		print results
		if (len(results) == 0):
			acceptancestatus = 0
			query = "INSERT INTO current_application (studentid, collegeid, acceptancestatus, q1, q2, q3, appliedStatus, major) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
			curs2.execute(query, (studentid, result[0]['collegeid'], acceptancestatus, q1, q2, q3, appliedStatus, major, ))
		else:
			query = "UPDATE current_application SET (q1, q2, q3, appliedStatus, major) = (%s, %s, %s, %s, %s) WHERE studentid = %s AND collegeid = %s"
			curs2.execute(query, (q1, q2, q3, appliedStatus, major, studentid, collegeid, ))
		con.commit()
		curs.close()
		curs2.close()
		return jsonify("200")
	finally:
		if con:
			con.close()

def checkUser(studentid, collegeid):
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	con = None
	try :
		con = psycopg2.connect(conn_string)
		print ("Connecting to database\n ->%s" % (conn_string))
		curs1 = con.cursor()
		curs1.execute("SELECT applicationid FROM current_application WHERE collegeid = %s AND studentid = %s", (collegeid, studentid, ))
		results = []
		for rows in curs1:
			objs = {
				'applicationid' : rows
			}
			results.append(objs)
		con.commit()
		curs1.close()
		return results
	finally:
		if con:
			con.close()

@app.route("/getApplicationPool")
def getApplicationPool():
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	conn = None
	try :
		conn = psycopg2.connect(conn_string)
		print ("Connecting to database\n ->%s" % (conn_string))
		curs = conn.cursor()
		curs1 = conn.cursor()
		collegeName = request.headers.get('collegeName')
		collegeN = (collegeName, )
		curs.execute("SELECT collegeid FROM colleges WHERE collegeName = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'collegeid' : row
			}
			result.append(obj)
		print result
		collegeid = result[0]['collegeid']
		curs1.execute("SELECT students.studentid, major, act, sat, gpa  FROM current_application, students WHERE collegeid = %s AND acceptancestatus = 0 AND students.studentid = current_application.studentid", collegeid)
		result = []
		for row in curs1:
			obj = {
				'studentid' : row[0],
				'major' : row[1],
				'act' : row[2],
				'sat' : row[3],
				'gpa' : row[4]
			}
			result.append(obj)
		print result
		response = jsonify(result)
		response.status_code = 200
		conn.commit()
		curs.close()
		curs1.close()
		return response
	finally:
		if conn:
			conn.close()


@app.route("/addAdmin", methods = ['POST'])
def addAdmin():
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	conn = None
	try :
		conn = psycopg2.connect(conn_string)
		print ("Connecting to database\n ->%s" % (conn_string))
		curs1 = conn.cursor()
		text = ast.literal_eval(json.dumps(request.get_json()))
		admin_id = text['adminid']
		collegeName = text['collegeName']
		res = checkAdminUser(admin_id, collegeName)
		res_college = checkCollege(collegeName)
		print res
		response = None
		if (len(res_college) == 0):
			print "College Does Not Exist"
			res_id = getCollegeid()
			collegeid = int(res_id[0]['collegeid'][0]) + 1
			curs1.execute("INSERT INTO colleges (collegeid, collegename) VALUES (%s, %s)", (collegeid, collegeName, ))
		if (len(res) > 0):
			response = jsonify("Admin User Exists")
		else:
			curs1.execute("INSERT INTO admin (admin_id, college) VALUES (%s, %s)", (admin_id, collegeName ))
			response = jsonify("Added Admin User")
		response.status_code = 200
		conn.commit()
		curs1.close()
		return response
	finally:
		if conn:
			conn.close()

def getCollegeid():
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	con = psycopg2.connect(conn_string)
	print ("Connecting to database\n ->%s" % (conn_string))
	curs1 = con.cursor()
	curs1.execute("SELECT collegeid FROM colleges ORDER BY collegeid DESC LIMIT 1")
	results = []
	for rows in curs1:
		objs = {
			'collegeid' : rows
		}
		results.append(objs)
	print results
	con.commit()
	curs1.close()
	return results

def checkCollege(collegeName):
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	con = psycopg2.connect(conn_string)
	print ("Connecting to database\n ->%s" % (conn_string))
	curs1 = con.cursor()
	curs1.execute("SELECT collegeName FROM colleges WHERE collegeName = %s", (collegeName, ))
	results = []
	for rows in curs1:
		objs = {
			'collegeName' : rows
		}
		results.append(objs)
	con.commit()
	curs1.close()
	return results


def checkAdminUser(adminid, collegeName):
	conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
	con = psycopg2.connect(conn_string)
	print ("Connecting to database\n ->%s" % (conn_string))
	curs1 = con.cursor()
	curs1.execute("SELECT admin_fname, admin_lname FROM admin WHERE admin_id = %s AND college = %s", (adminid, collegeName, ))
	results = []
	for rows in curs1:
		objs = {
			'admin_fname' : rows[0],
			'admin_lname' : rows[1]
		}
		results.append(objs)
	con.commit()
	curs1.close()
	return results

@app.route("/getQuestions", methods = ['GET'])
def getQuestions():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		curs = conn.cursor()
		collegeName = request.headers.get('collegeName')
		collegeN = (collegeName, )
		curs.execute("SELECT q1, q2, q3 FROM colleges WHERE collegeName = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'q1' : row[0],
				'q2' : row[1],
				'q3' : row[2]
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

@app.route("/getStudentResponse", methods = ['GET'])
def getStudentResponse():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		curs = conn.cursor()
		curs1 = conn.cursor()
		curs2 = conn.cursor()
		studentid = request.headers.get('studentid')
		collegeName = request.headers.get('collegeName')
		print "collegeName: ", collegeName
		collegeN = (collegeName, )
		curs1.execute("SELECT collegeid FROM colleges WHERE collegeName = %s", collegeN)
		result = []
		for row in curs1:
			obj = {
				'collegeid' : row[0]
			}
			result.append(obj)
		collegeid = result[0]['collegeid']
		collegeN = (collegeid, studentid, )
		print "collegeN: ", collegeN
		curs.execute("SELECT appliedStatus FROM current_application WHERE collegeid = %s and studentid = %s", collegeN)
		result = []
		for row in curs:
			obj = {
				'appliedStatus' : row[0],
			}
			result.append(obj)
		print result
		appliedStatus = 2
		if (len(result) > 0):
			appliedStatus = int(result[0]['appliedStatus'])
		print "appliedStatus: ", appliedStatus
		if (int(appliedStatus) == 2):
			response = jsonify("Student Not Found")
		if (int(appliedStatus) == 1):
			response = jsonify("Student Already Applied")
		if (int(appliedStatus) == 0):
			curs2.execute("SELECT q1, q2, q3, major FROM current_application WHERE collegeid = %s and studentid = %s", collegeN)
			result = []
			for row in curs2:
				obj = {
					'q1' : row[0],
					'q2' : row[1],
					'q3' : row[2],
					'major' : row[3]
				}
				result.append(obj)
			response = jsonify(result)
		response.status_code = 200
		conn.commit()
		curs.close()
		curs1.close()
		curs2.close()
		return response
	finally:
		if con:
			con.close()

@app.route("/getCollegeInfo", methods = ['GET'])
def getCollegesInfo():
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		curs = conn.cursor()
		collegeName = request.headers.get('collegeName')
		collegeN = (collegeName, )
		curs.execute("SELECT information, tuition_in, tuition_out, school_locat, a_calender, num_students, num_ugrads, num_postgrads, found_year, telephone, deadlines, stud_fac, yr_grad, image_link FROM COLLEGES WHERE collegename = %s", collegeN)
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
				'yr_grad' : row[12],
				'image_link' : row[13],
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

# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
# import sendgrid
# import os
# from sendgrid.helpers.mail import *

# sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
# from_email = Email("sanatmouli@gmail.com")
# to_email = Email("sanatmouli@gmail.com")
# subject = "Sending with SendGrid is Fun"
# content = Content("text/plain", "and easy to do anywhere, even with Python")
# mail = Mail(from_email, subject, to_email, content)
# response = sg.client.mail.send.post(request_body=mail.get())
# print(response.status_code)
# print(response.body)
# print(response.headers)


@app.route("/sendEmail/<email_id>/<collegename>", methods = ['GET'])
def sendEmail(email_id, collegename):
	mail = initEmailService()
	msg = Message('Hello', sender = 'collegeappio3@gmail.com', recipients = [email_id])
	#msg.body = "Congratulations! You have applied to " + str(collegename) + ""
	msg.html = render_template("email-template-college.html", cname = collegename)
	response = mail.send(msg)
	print "REsponse is:", response
	return jsonify("Sent")

@app.route("/sendEmailtoStudent/<email_id>/<fname>", methods = ['GET'])
def sendEmailtoStudent(email_id, fname):
	mail = initEmailService()
	msg = Message('Hello', sender = 'collegeappio3@gmail.com', recipients = [email_id])
	msg.body = "Congratulations "+ fname + "! You have finished your application! Please go ahead and submit your college applications!"
	#msg.html = render_template("email-template-college.html", cname = collegename)
	response = mail.send(msg)
	print "Response is:", response
	return jsonify("Sent")


#@app.route("/sendEmailAccept/<email_id>/<collegename>/<studentname>", methods = ['GET'])
def sendEmailAccept(email_id, collegename, studentname):
	mail = initEmailService()
	msg = Message('Hello', sender = 'collegeappio3@gmail.com', recipients = [email_id])
	#msg.body = "Congratulations! You have applied to " + str(collegename) + ""
	msg.html = render_template("email-template-accept.html", cname = collegename, sname = studentname)
	response = mail.send(msg)
	print "Response is:", response
	return jsonify("Sent")


#@app.route("/sendEmailReject/<email_id>/<collegename>/<studentname>", methods = ['GET'])
def sendEmailReject(email_id, collegename, studentname):
	mail = initEmailService()
	msg = Message('Hello', sender = 'collegeappio3@gmail.com', recipients = [email_id])
	#msg.body = "Congratulations! You have applied to " + str(collegename) + ""
	msg.html = render_template("email-template-reject.html", cname = collegename, sname = studentname)
	response = mail.send(msg)
	print "Response is:", response
	return jsonify("Sent")

@app.route("/sendEmailStatus/<email_id>/<collegename>/<studentid>/<accept_status>", methods = ['GET'])
def sendEmailStatus(email_id, collegename, studentid, accept_status):
	conn, cur = initDB()
	cur.execute("SELECT fname, lname FROM students where studentid = %s", (studentid, ))
	row = cur.fetchone()
	name = row[0] + " " + row[1]
	if int(accept_status) == 1:
		sendEmailAccept(email_id, collegename, name)
	elif int(accept_status) == 2:
		sendEmailReject(email_id, collegename, name)
	cur.execute("SELECT collegeid from colleges WHERE collegename = %s", (collegename, ))
	row = cur.fetchone()
	collegeid = row[0]
	print(row)
	query = "UPDATE current_application SET acceptancestatus =  %s WHERE studentid = %s AND collegeid = %s"
	cur.execute(query, (str(accept_status), studentid, collegeid,))
	query = "SELECT race, act, sat, gpa, num_ap, sex,  current_application.major FROM students, current_application WHERE students.studentid = %s AND collegeid  = %s"
	cur.execute(query, (studentid, collegeid))
	row = cur.fetchone()
	race = row[0]
	act = row[1]
	sat = row[2]
	gpa = row[3]
	num_ap = row[4]
	sex = row[5]
	major = row[6]
	sex_act = 1
	print(row)
	if (sex == "MALE"):
		sex_act = 0
	query = "SELECT collegeName FROM colleges WHERE collegeid = %s"
	cur.execute(query, (collegeid, ))
	row = cur.fetchone()
	collegeName = row[0]
	query = "SELECT historicalid FROM historicalapplication ORDER BY historicalid DESC LIMIT 1"
	cur.execute(query)
	row = cur.fetchone()
	id  = row[0]
	print(row)
	if (row[0] is None):
		id = 0
	else:
		id = int(row[0]) + 1
	query = "INSERT INTO historicalapplication (historicalid, race, act, sat, gpa, num_ap, sex, major, collegeid, decision, college) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
	cur.execute(query, (id, race, act, sat, gpa, num_ap, sex_act, major, collegeid, int(accept_status), collegeName, ))
	print("done")
	conn.commit()
	cur.close()
	response = jsonify("200")
	response.status_code = 200
	return response

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

def xstr(s):
    if s is None:
        return ''
    return str(s)

@app.route("/getStudents/<uid>", methods = ['GET'])
def getStudents(uid):
	conn, cur = initDB()
	cur.execute("SELECT * FROM students WHERE studentid = %s", (uid, ))

	# Fetch column names of postgres table
	colnames = [desc[0] for desc in cur.description]

	keyval = {}
	for row in cur:
		temp = ast.literal_eval(json.dumps(colnames))
		for i in range (0, len(temp)):

			obj = {
				temp[i] : xstr(row[i]),
			}
			keyval.update(obj)
	print jsonify(keyval)
	response = jsonify(keyval)
	print "response: ", response
	response.status_code = 200
	cur.close()
	return response

def UpdateIntoAdminDB(tablename, keyval, target_keyval, conn, cursor):
    for (k,v) in keyval.items():
        query = "UPDATE " + tablename + " SET " + k + " = %s WHERE %s = collegename"
        valTuple = ()
        valTuple = (v, ) + (target_keyval, )
        query = str(query)
        cursor.execute(query, valTuple)

@app.route("/setCollegeDetails/<collegename>", methods = ['POST'])
def setCollegeDetails(collegename):
	conn, cur = initDB()
	text = ast.literal_eval(json.dumps(request.get_json()))
	#admin_id = text["collegename"]
	admin_id = str(collegename)
	UpdateIntoAdminDB('colleges', text, admin_id, conn, cur)
	conn.commit()
	cur.close()
	response = jsonify("HI")
	response.status_code = 200
	return response

@app.route("/setCollegeQuestions/<collegename>", methods = ['POST'])
def setCollegeQuestions(collegename):
	conn, cur = initDB()
	text = ast.literal_eval(json.dumps(request.get_json()))
	#admin_id = text["collegename"]
	admin_id = str(collegename)
	UpdateIntoAdminDB('colleges', text, admin_id, conn, cur)
	conn.commit()
	cur.close()
	response = jsonify("HI")
	response.status_code = 200
	return response

@app.route("/getCollegeName", methods = ['GET'])
def getCollegeName():
	conn, cur = initDB()
	cur.execute("SELECT collegeName FROM colleges")
	result = []
	for row in cur:
		result.append(row[0])
	response = jsonify(result)
	response.status_code = 200
	conn.commit()
	cur.close()
	return response

@app.route("/getIDType/<sid>", methods=['GET'])
def getIDType(sid):
	conn, cur = initDB()
	ans = ""
	cur.execute("SELECT admin_id FROM admin WHERE admin_id = %s", (sid, ))
	row = cur.fetchone()
	if row != None:
		ans = "admin"
	else :
		ans = "student"
	response = jsonify(ans)
	conn.commit()
	cur.close()
	return response

@app.route("/getCollegeNameForUID/<uid>", methods=['GET'])
def getCollegeNameForUID(uid):
	conn, cur = initDB()
	cur.execute("SELECT college FROM admin WHERE admin_id = %s", (uid, ))
	row = cur.fetchone()
	response = jsonify(row)
	response.status_code = 200
	conn.commit()
	cur.close()
	return response

@app.route("/getStudentsForCollegeName/<collegename>", methods=['GET'])
def getStudentsForCollegeName(collegename):
	#get first query to fetch collegeID for that collegename in collegetable
	#get second query in curernt_applications table to fetch q1, q2, q3 and studentID for that collegeID
	#for each row in second query, get the student details
	conn, cur = initDB()
	cur.execute("SELECT collegeid FROM colleges WHERE collegename = %s", (collegename, ))
	row = cur.fetchone()
	collegeid = (row, )
	#cur.execute("SELECT q1, q2, q3, studentid FROM current_application WHERE collegeid = %s", collegeid)
	cur.execute("SELECT current_application.q1, current_application.q2, current_application.q3, current_application.studentid, students.fname FROM current_application LEFT JOIN students on students.studentid = current_application.studentid WHERE current_application.collegeid = %s", collegeid)
	result = []
	for r in cur:
		result.append(r)

	response = jsonify(result)
	response.status_code = 200
	conn.commit()
	cur.close()
	return response

@app.route("/getListOfAcceptedStudents/<collegename>", methods=['GET'])
def getListOfAcceptedStudents(collegename):
    conn, cur = initDB()
    cur.execute("SELECT collegeid FROM colleges WHERE collegename = %s", (collegename, ))
    row = cur.fetchone()
    collegeid = (row, )
    cur.execute("SELECT race, decision, sex, act, sat, num_ap, gpa FROM historicalapplication WHERE collegeid = %s", (collegeid, ))
    result = []
    for row in cur:
        obj = {
            'race' : row[0],
            'decision' : row[1],	
			'sex' : row[2],
            'act' : row[3],
			'sat' : row[4],
			'num_ap' : row[5],
			'gpa' : float(row[6]),

        }
        result.append(obj)
    response = jsonify(result)
    response.status_code = 200
    conn.commit()
    cur.close()
    return response


if __name__ == '__main__':
	conn, cur = initDB()
	app.run(debug=True)
