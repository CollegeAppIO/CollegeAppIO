import psycopg2
from random import randint, uniform

def queryDB(lists):
	con = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		conn = psycopg2.connect(conn_string)
		cur = conn.cursor()
		querry = "Insert into historicalapplication values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
		print(lists)
		cur.execute(querry, tuple(lists))
		print ("Connected!")
		conn.commit()
		cur.close()
		return conn, cur
	finally:
		if con:
			con.close()

def addColumn(columnName, type):
	conn = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		print ("Connecting to database\n ->%s" % (conn_string))
		conn = psycopg2.connect(conn_string)
		cur = conn.cursor()
		cur.execute('ALTER TABLE %s ADD COLUMN %s %s' % ('colleges', columnName, type))
		conn.commit()
		cur.close()
	finally:
		if conn:
			conn.close()

def getCollegeID(collegeName):
	conn = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		conn = psycopg2.connect(conn_string)
		cur = conn.cursor()
		cur.execute('SELECT collegeid FROM colleges WHERE collegeName = %s', (collegeName, ))
		row = cur.fetchone()
		conn.commit()
		cur.close()
		return row[0]
	finally:
		if conn:
			conn.close()

def collegeList():
	conn = None
	try:
		conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
		conn = psycopg2.connect(conn_string)
		cur = conn.cursor()
		cur.execute('SELECT collegename FROM colleges')
		row = cur.fetchall()
		conn.commit()
		cur.close()
		return row
	finally:
		if conn:
			conn.close()

def make_data(L):
	races = ["Asian", "Native American", "Hispanic", "Black", "Caucasian", "African American"]
	sat = [2400, 2300, 2200, 2100, 2000, 1900, 1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000]
	colleges = ["Purdue University", "UMich", "IU", "Penn State", "Rutgers", "Northwestern University", "Michigan State University", "University of Maryland", "UIUC", "OSU", "University of Wisconsin Madison", "Northwestern University", "University of Nebraska-Lincoln", "University of Minnesota Twin Cities", "University of Iowa", "UIUC"]
	collegelist = collegeList()
	colleges = []
	for i in range(0, len(collegelist)):
		colleges.append(collegelist[i][0])
	print(colleges)
	major = ["Computer Science", "Engineering", "Business", "Biomedical Engineering", "Electrical Engineering", "Film and Theatre", "Earth and Planetary Sciences", "Life Sciences", "Kinesthetics", "Arts", "Sports Medicine", "Creative Writing", "Economics", "Music", "English", "Actuarial Sciences", "Biology", "Chemistry", "Applied Physics", "Applied Mathematics", "Statistics", "Computer Engineering", "Pre-med", "Pharmacy", "Industrial Engineering", "Mechanical Engineering", "Aerospace Engineering", "Applied Statistics"]
	act = []
	for i in range (1, 37):
		act.append(i)
	gpa = [4.0, 3.0, 2.0, 1.0]
	sex = [0, 1, 2]
	num_ap = [0, 1, 2, 3, 4, 5, 6]
	i = 1
	for j in range(0, L):
		lists = []
		i = i + 1
		lists.append(i)
		lists.append(races[randint(0, len(races) - 1)])
		lists.append(sex[randint(0, 2)])
		lists.append(randint(0, 1))
		lists.append(randint(15, 36))
		lists.append(randint(600, 2400))
		lists.append(num_ap[randint(0, len(num_ap) - 1)])
		lists.append(round(uniform(1.5, 4.0), 2))
		collegeName = colleges[randint(0, len(colleges) - 1)]
		lists.append(collegeName)
		lists.append(major[randint(0, len(major) - 1)])
		collegeids = getCollegeID(collegeName)
		lists.append(collegeids)
		queryDB(lists)
make_data(100)
