from flask import Flask,render_template,redirect,request,flash,url_for,jsonify,make_response,json
from flask_cors import CORS
from werkzeug.utils import secure_filename


import pymysql
from flask_mysqldb import MySQL
import MySQLdb.cursors
import jwt
import os
import json













app=Flask(__name__)
CORS(app)

############Uploaded files eg. image
UPLOAD_FOLDER="/static/"
ALLOWED_EXTENSIONS=set(["jpeg","jpg","png"])
app.config["UPLOAD_FOLDER"]=UPLOAD_FOLDER
app.config["ALLOWED_EXTENSIONS"]=ALLOWED_EXTENSIONS

secret="eeeeertbmbmmmmmmmmmmm"
'''
def dict_factory(cursor,row):
    d={}
    for idx,col in enumerate(cursor.description):
        d[col[0]]=row[idx]
    return d    





   

db= sqlite3.connect("Forum.db",check_same_thread=False) 
db.row_factory=dict_factory
cursor=db.cursor()
'''






#############Database connection details

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='forum_2'
app.config["CHARSET"]='utf8mb4'
app.config["COLLATION"]='utf8mb4_ci'


##Initializing MySQL
mysql=MySQL(app)


 

##User sign up below
@app.route('/signup',methods=["POST"])
def signup():
    if request.method=='POST':
        name=request.form["name"]
        email=request.form["email"]
        password=request.form["password"]
        ###Hashing user password
        password=bcrypt.generate_password_hash(password)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT email from users WHERE email=%s",(email,))
        account=cursor.fetchone()
        
        
        if account:
            return jsonify({"error":"User with email already exists!"})
        else:
            user_img="/static/avatar.jpg"
            coverphoto="/static/wapbackground16.jpg"
            bio="My bio"
            cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
            cursor.execute("INSERT INTO users(name,email,password,user_img,coverphoto,bio) VALUES (%s,%s,%s,%s,%s,%s)",(name,email,password,user_img,coverphoto,bio,))
            mysql.connection.commit()  
            
            return jsonify({"message":"You're successfully registered"})
              


        
                



#User Login below
@app.route('/login', methods=["POST","GET"])
def login():
    if request.method=="POST":
        email=request.form['email']
        password=request.form['password']
       
        sql="SELECT* FROM users WHERE email=%s"
        data=(email,)
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(sql,data)
        account=cursor.fetchone()
        #If email exists in database, continue authentication else throw error message
        if account:
            hashed_password=account["password"]
            authenticated_user=bcrypt.check_password_hash(hashed_password,password)

        #If password is correct,encode log customer in/else throw error message
            if authenticated_user:

                user_id=account["id"]  
                email=account["email"]
                payload={
                'user_id':user_id 
                }
    
                token=jwt.encode(payload,secret)
                return jsonify(token.decode("UTF-8"))

            else:
                return jsonify({"error":"Invalid Email or password"})


                
    

        else:
            return jsonify({"error":"Email is not in our database"})
     
    
                
###For posting images and pics on posts     
@app.route('/make_post',methods=["POST","GET"])   
def make_post():
    if request.method=="POST":
        title=request.form['title']
        file=request.files["post_media"]
        file.save(os.path.join(app.config["UPLOAD_FOLDER"],secure_filename(file.filename)))
        post_media= "/static/"+file.filename 
        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        user_id=decoded['user_id']
    
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO Posts(title,post_media,user_id) VALUES (%s,%s,%s)',(title,post_media,user_id,))
        mysql.connection.commit()
        return jsonify({"message":"Post created"})


       
         







######For listing articles on article screen#######

@app.route('/articles', methods=["GET"])
def showarticles():
    if request.method=='GET':
        sql='SELECT articles.id,articles.title,articles.body,articles.article_img,articles.created_at,articles.user_id,(SELECT COUNT(*) FROM comments WHERE comments.article_id=articles.id) as totalcomments,(SELECT COUNT(*)FROM article_likes WHERE article_likes.article_id=articles.id) as total_likes,users.user_img,users.name,users.id FROM articles,users WHERE users.id=articles.user_id ORDER BY articles.created_at DESC'
        cursor.execute(sql)
        articles=cursor.fetchall()
        return jsonify(articles)
            
##########for listing users posts################ 
 
@app.route('/', methods=["GET"])
def showposts():
    if request.method=='GET':
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT Posts._id,Posts.title,Posts.post_media,Posts.created_at,Posts.user_id,(SELECT COUNT(*) FROM post_comments WHERE post_comments.post_id=Posts._id) as totalcomments,users.user_img,users.name,users.id FROM Posts,users WHERE users.id=Posts.user_id ORDER BY Posts.created_at DESC')
        posts=cursor.fetchall()
        return jsonify(posts)         

        
        

        

        
      
####For listing a single post 
        

@app.route('/<int:post_id>',methods=["GET","POST"])
def singlepost(post_id):
    
   
    if request.method=="GET":
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT* FROM Posts WHERE Posts._id=%s',(post_id,))
        post=cursor.fetchall()
        return jsonify(post)        
       
            
        
        

       
#Listing comments or creating a comment on a post####
@app.route('/post_comments/<int:post_id>', methods=["GET","POST"])
def listpostcomments(post_id):
    if request.method=="GET":
    
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT* FROM Posts WHERE _id=%s",(post_id,))
        post=cursor.fetchall()
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT* FROM post_comments,users WHERE users.id=post_comments.user_id AND post_comments.post_id=%s ORDER BY created_at ASC",(post_id,))
        comments=cursor.fetchall()
        return jsonify({"comments":comments,"post":post})

    if request.method=="POST":
        comment=request.form['comment']
        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        user_id=decoded['user_id']
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO post_comments(post_id,body,user_id) VALUES (%s,%s,%s)',(post_id,comment,user_id,))
        mysql.connection.commit()
        return jsonify({"message":"Comment sucessfully created"})
       



















    
  









###############Delete section####################




##############Delete Post##############
@app.route("/post_delete/<int:post_id>",methods=["DELETE","POST"])
def deletepost(post_id):
    
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("DELETE FROM Posts WHERE _id=%s",(post_id,))
    mysql.connection.commit()
    return jsonify({"message":"Post deleted sucessfully"})




###########Delete Comment on a post##########
@app.route("/post_comment_delete/<int:post_comment_id>",methods=["DELETE"])
def delete_post_comment(post_comment_id):
    
    
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("DELETE FROM post_comments WHERE post_comments._id=%s",(post_comment_id,))
    mysql.connection.commit()
    return jsonify({"message":"Comment sucessfully deleted"})




        


    
###########User profile section##############################

@app.route("/profile/<int:user_id>",methods=["GET"])
def getprofile(user_id):
    if request.method=="GET":

        
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT* FROM users WHERE users.id=%s",(user_id,))
        info=cursor.fetchall()

        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT Posts._id,Posts.title,Posts.post_media,Posts.created_at,Posts.user_id,(SELECT COUNT(*) FROM post_comments WHERE post_comments.post_id=Posts._id) as totalcomments,users.user_img,users.name,users.id FROM Posts,users WHERE users.id=Posts.user_id AND Posts.user_id=%s ORDER BY Posts.created_at DESC',(user_id,))
        user_posts=cursor.fetchall()
        return jsonify({"info":info,"user_posts":user_posts})



@app.route("/myprofile/",methods=["GET"])
def myprofile():
    if request.method=="GET":
        jwt_decoded=request.headers.get("Authorization")
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        user_id=decoded['user_id']
        
        
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT* FROM users WHERE users.id=%s",(user_id,))
        profile=cursor.fetchall()
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT Posts._id,Posts.title,Posts.post_media,Posts.created_at,Posts.user_id,(SELECT COUNT(*) FROM post_comments WHERE post_comments.post_id=Posts._id) as totalcomments,users.user_img,users.name,users.id FROM Posts,users WHERE users.id=Posts.user_id AND Posts.user_id=%s ORDER BY Posts.created_at DESC',(user_id,))
        user_posts=cursor.fetchall()
        return jsonify({"profile":profile,"user_posts":user_posts})
        
 








@app.route("/update_profile_img",methods=["PUT","POST"])
def update_profile_img():
    jwt_decoded=request.headers.get('Authorization')
    decoded=jwt.decode(jwt_decoded,secret, algorithms=['HS256'])
    user_id=decoded['user_id']
    file=request.files["user_img"]
    file.save(os.path.join(app.config["UPLOAD_FOLDER"],secure_filename(file.filename)))
    user_img= "/static/"+file.filename 
              
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("UPDATE users SET user_img=%s WHERE users.id=%s",(user_img,user_id,))
    mysql.connection.commit()
    return jsonify({"message":"Profile picture updated sucessfully"})






@app.route("/update_coverphoto",methods=["PUT","POST"])
def update_coverphoto():
    jwt_decoded=request.headers.get('Authorization')
    decoded=jwt.decode(jwt_decoded,secret, algorithms=['HS256'])
    user_id=decoded['user_id']
    file=request.files["coverphoto"]
    file.save(os.path.join(app.config["UPLOAD_FOLDER"],secure_filename(file.filename)))
    coverphoto= "/static/"+file.filename   

    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("UPDATE users SET coverphoto=%s WHERE users.id=%s",(coverphoto,user_id,))
    mysql.connection.commit()
    return jsonify({"message":"Cover photo updated"})
      




@app.route("/update_bio", methods=["POST","GET"])
def update_bio():
    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded,secret, algorithms=['HS256'])
        user_id=decoded['user_id']
        bio=request.get_json('bio')
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("UPDATE users SET bio=%s WHERE id=%s",(bio,user_id,))
        mysql.connection.commit()
        return jsonify({"message":"Bio updated sucessfully"})

   


    

    


@app.route("/update_name", methods=["POST","PUT"])
def update_name():
    jwt_decoded=request.headers.get('Authorization')
    decoded=jwt.decode(jwt_decoded,secret, algorithms=['HS256'])
    user_id=decoded['user_id']
    name=request.get_json("name")
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    cursor.execute("UPDATE users SET name=%s WHERE id=%s",(name,user_id,))
    mysql.connection.commit()
    return jsonify({"message":"Your name is updated sucessfully"})
    




################Search for articles or users############
@app.route('/search',methods=["GET","POST"])
def search():
    searchvalue=request.json.get("searchvalue")
    sql='SELECT title,article_img, articles.id,articles.created_at,(SELECT COUNT(*) FROM comments WHERE comments.article_id=articles.id) as totalcomments,(SELECT COUNT(*)FROM post_likes WHERE post_likes.article_id=articles.id) as total_likes,users.user_img,users.name,users.id FROM articles,users WHERE users.name LIKE %s OR articles.title LIKE %s'
    data=(searchvalue)
    cursor.execute(sql,data)
    results=cursor.fetchall()
    return jsonify(results)



##########Search for users###########
@app.route("/users",methods=["POST","GET"])
def searchusers():
    user=request.form["user"]
    sql="SELECT* FROM users WHERE users.name LIKE (?)"
    data=user
    cursor.execute(sql,[data])
    users=cursor.fetchall()
    if users=="":
        return jsonify(user + "is not a member")
    else:
        return jsonify(users)


    
#############List users#################
@app.route("/userlist",methods=["GET"])
def users():
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT* FROM users")
    users=cursor.fetchall()
    return jsonify(users)




#Group or channel functionality#######
'''''
@app.route("/create_group/",methods=["POST"])
def create_group():
    if request.method=="POST":
        name=request.json.get("name")
        description=request.json.get("description")
        channel_img=request.files["channel_img"]
        hidden=request.json.get("Boolean")
        disable=request.json.get("Boolean")
        with open("./Images/post_media.filename","rb") as avatar:
                channel_img=base64.b64encode(avatar.read()) #for encoding the image into base64 string
        token=request.headers.get('Authorization')
         #Parses out the "Bearer"
        token=token.split(" ")[1]
        decoded=jwt.decode(token,secret,algorithm='HS256')
        user_id=decoded["user_id"]

'''


'''
@app.route("/trial_delete",methods=["GET"])
def trial_delete():
    sql="DROP TABLE users"
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(sql)
    return jsonify("Done")
'''





if __name__=="__main__":
    app.run(debug='true')
