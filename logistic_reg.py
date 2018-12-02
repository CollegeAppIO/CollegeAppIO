from sklearn.linear_model import LogisticRegression
import numpy as np
import psycopg2

def ml_train(clf, X, y):
    clf.fit(X, y)

def ml_predict(clf, X):
    return clf.predict_proba(X)

def college_train(college):
    conn = None
    try:
        conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
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

def college_predict(student_id):
        conn = None
        try:
            conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
            conn = psycopg2.connect(conn_string)
            curs = conn.cursor()
            collegeName = student_id
            collegeN = (collegeName, )
            curs.execute("SELECT act, sat, num_ap, gpa  FROM students where studentid = %s", collegeN)
            result = []
            for row in curs:
            	obj = {
            		'act': row[0],
            		'sat': row[1],
            		'num_ap': row[2],
            		'gpa': row[3]
            	}
            	result.append(obj)
            conn.commit()
            curs.close()
            return result
        finally:
            if conn:
                conn.close()

def list_colleges():
    conn = None
    try:
        conn_string = "host='ec2-54-83-50-145.compute-1.amazonaws.com' dbname='dad8agdskdaqda' port='5432' user='bxzszdjesssvjx' password='30a8521fc6b32229540335c47af5265bb684216e4f58fa81520a91e1d086a5de'"
        conn = psycopg2.connect(conn_string)
        curs = conn.cursor()
        curs.execute("SELECT collegename FROM colleges")
        result = []
        for row in curs:
            obj = {
                'collegename': row
            }
            result.append(obj)
        conn.commit()
        curs.close()
        return result
    finally:
        if conn:
            conn.close()

def main(uid):
    colleges = []
    list_col = list_colleges()
    for i in range(len(list_col)):
        colleges.append(list_col[i]['collegename'])
    labels = {}
    for i in  range(0, len(colleges)):
        clf = LogisticRegression(random_state=0, solver='sag', multi_class='multinomial')
        data = college_train(colleges[i])
        X = []
        y = []
        for j in range(len(data)):
            temp = []
            temp.append(float(data[j]['act']))
            temp.append(float(data[j]['sat']))
            temp.append(float(data[j]['num_ap']))
            temp.append(float(data[j]['gpa']))
            X.append(temp)
            y.append(float(data[j]['decision']))
        un = list(set(y))
        if len(un) > 1:
            train_X = np.array(X)
            train_y = np.array(y).reshape(-1, 1)
            ml_train(clf, train_X, y)
            pred = college_predict(uid)
            if None not in pred[0].values():
                preds = []
                for j in range(len(pred)):
                    temp = []
                    temp.append(float(pred[j]['act']))
                    temp.append(float(pred[j]['sat']))
                    temp.append(float(pred[j]['num_ap']))
                    temp.append(float(pred[j]['gpa']))
                    preds.append(temp)
                predict = np.array(preds).reshape(-1, 1)
                probs =  ml_predict(clf, preds)
                labels.update({colleges[i] : probs[0][0]})
            else:
                return "Finish Application"
    labels_sort = sorted(labels.values())
    list_college_fin = []
    for i in range(len(labels_sort)):
        list_college_fin.append(labels.keys()[labels.values().index(labels_sort[i])][0])
    return list_college_fin
