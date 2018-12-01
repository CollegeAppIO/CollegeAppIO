from sklearn.linear_model import LogisticRegression
import numpy as np
import psycopg2



def ml_train(clf, X, y):
    print X
    print y
    clf.fit(X, y)

def ml_predict(clf, X):
    return clf.predict_proba(X)

def college_train(college):
    conn = None
    try:
        conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
        print ("Connecting to database\n ->%s" % (conn_string))
        conn = psycopg2.connect(conn_string)
        curs = conn.cursor()
        collegeName = college
        collegeN = (collegeName, )
        curs.execute("SELECT act, sat, num_ap, gpa, decision FROM historicalapplication where college = %s", collegeN)
        result = []
        for row in curs:
        	obj = {
        		'act': float(row[0]),
        		'sat': float(row[1]),
        		'num_ap': float(row[2]),
        		'gpa': float(row[3]),
                'decision': int(row[4])
        	}
        	result.append(obj)
        conn.commit()
        curs.close()
        return result
    finally:
        if conn:
            conn.close()

def college_predcit(student_id):
        conn = None
        try:
            conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
            print ("Connecting to database\n ->%s" % (conn_string))
            conn = psycopg2.connect(conn_string)
            curs = conn.cursor()
            collegeName = student_id
            collegeN = (collegeName, )
            curs.execute("SELECT act, sat, num_ap, gpa  FROM students where studentid = %s", collegeN)
            result = []
            for row in curs:
            	obj = {
            		'act': float(row[0]),
            		'sat': float(row[1]),
            		'num_ap': float(row[2]),
            		'gpa': float(row[3]),
            	}
            	result.append(obj)
            conn.commit()
            curs.close()
            return result
        finally:
            if conn:
                conn.close()

def main():
    colleges = ["Purdue University"]
    for i in  range(0, len(colleges)):
        clf = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial')
        data = college_train(colleges[i])
        print data
        X = []
        y = []
        for j in range(len(data)):
            temp = []
            temp.append(data[j]['act'])
            temp.append(data[j]['sat'])
            temp.append(data[j]['num_ap'])
            temp.append(data[j]['gpa'])
            X.append(temp)
            y.append(data[j]['decision'])
        print X
        train_X = np.array(X)
        train_y = np.array(y).reshape(-1, 1)
        ml_train(clf, train_X, y)
        pred = college_predcit("xiqXkGqoSOWTSg6ESwkr8FsqPlx1")
        
        ml_predict(clf, pred)
main()
