from flask import Flask,render_template,redirect,request,flash,url_for,jsonify,make_response,json
from flask_cors import CORS
from werkzeug.utils import secure_filename


#import pymysql
from flask_mysqldb import MySQL
import MySQLdb.cursors
#import hashlib
#import base64 
import jwt
import os
import json
#import sqlite3












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













@app.route('/signup',methods=["POST"])
def signup():
    if request.method=='POST':
        name=request.form["name"]
        email=request.form["email"]
        password=request.form["password"]
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
              
        
                


@app.route('/login', methods=["POST"])
def login():
    if request.method=="POST":
        email=request.form["email"]
        password=request.form["password"]
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT* FROM users WHERE email=%s AND password=%s",(email,password,))
        account=cursor.fetchone()
        
        
        
        
        if account:

            user_id=account["id"]
            payload={
                'user_id':user_id
                
                
                
            }
            token=jwt.encode(payload,secret)
            return jsonify(token.decode("UTF-8"))

        else:
            
            return jsonify({"error":"Invalid email or password"})
       

            
            



#####For creating articles or blog##########
     
@app.route('/create_blog',methods=["POST"])   
def make_article():
    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode( jwt_decoded, secret, algorithm=['HS256'])
        user_id=decoded['user_id']
        title=request.get_json('title')
        body=request.get_json('body')
        file=request.files["file"]
        file.save(os.path.join(app.config["UPLOAD_FOLDER"],secure_filename(file.filename)))
        article_img="/static/"+file.filename 
        
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO articles(title,body,article_img,user_id) VALUES (%s,%s,%s,%s)'(title,body,article_img,user_id,))
        mysql.connection.commit()
        return jsonify({"message":"Post created"})


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

        
        

        

@app.route('/articles/<int:article_id>',methods=["GET","POST"])
def single_article(article_id):
    
   
    if request.method=="GET":
        data=(article_id)
        cursor.execute("SELECT* FROM articles,users,comments WHERE  articles.id=(?) AND users.id=articles.user_id AND comments.article_id=articles.id  ORDER BY created_at DESC",[article_id])
        article=cursor.fetchall()
        return jsonify(article)
        
      

        

@app.route('/<int:post_id>',methods=["GET","POST"])
def singlepost(post_id):
    
   
    if request.method=="GET":
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT* FROM Posts WHERE Posts._id=%s',(post_id,))
        post=cursor.fetchall()
        return jsonify(post)        
       
            
        
        
       
######Listing comments or creating comment on an article####

@app.route('/comments/<int:article_id>', methods=["GET","POST"])
def listarticlecomments(article_id):
    if request.method=="GET":
        sql2="SELECT* FROM users,comments WHERE users.id=comments.user_id AND  comments.article_id=%s"
        data=article_id
        cursor.execute(sql2,data)
        comments=cursor.fetchall()
        return jsonify({"comments":comments})

    if request.method=="POST":
        comment=request.json.get('comment')
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        article_id=article_id
        sql1='INSERT INTO comments(article_id,comment_body,user_id) VALUES (%s,%s,%s)'
        data1=(article_id,comment,user_id)
        cursor.execute(sql1,data1)
        mysql.connection.commit()
        return jsonify({"message":"Comment sucessfully created"})



       
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
       








###Listing replies on a comment for articles#####

@app.route("/replies/<int:comment_id>",methods=["POST","GET"])
def listreplies(comment_id):
    if request.method=="GET":
        sql2="SELECT FROM replies,users WHERE users.id=users.reply_id AND  comments_id=%s"
        data=comment_id
        cursor.execute(sql2,data)
        replies=cursor.fetchall()
        return jsonify({"comments":replies})

    if request.method=="POST":
        reply_body=request.json.get('reply')
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        
        sql1='INSERT INTO replies(comment_id,reply_body,user_id) VALUES (%s,%s,%s)'
        data1=(comment_id,reply_body,user_id)
        cursor.execute(sql1,data1)
        db.commit()
        return jsonify({"message":"Reply sucessfully created"})
        



########Listing replies on a comment for a post made by a user############

@app.route("/post_replies/<int:post_comment_id>",methods=["POST","GET"])
def post_replies(post_comment_id):
    if request.method=="GET":
        sql2="SELECT FROM reply_post_comments,users WHERE users.id=reply_post_comments.user_id AND  post_comment_id=%s"
        data=post_comment_id
        cursor.execute(sql2,data)
        replies=cursor.fetchall()
        return jsonify({"replies":replies})

    if request.method=="POST":
        reply_body=request.json.get('reply_body')
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        sql1='INSERT INTO post_reply_comments(post_comment_id,body,user_id) VALUES (%s,%s,%s)'
        data1=(post_comment_id,reply_body,user_id)
        cursor.execute(sql1,data1)
        db.commit()
        return jsonify({"message":" Reply  sucessfully created"})




############Section for likes##############################################          


############Articles likes#####################

@app.route('/likes/<int:article_id>',methods=["POST","GET","DELETE"])   
def likearticle(article_id):
    if request.method=="GET":
        sql="SELECT* FROM article_likes,users WHERE users.id=article_likes.user_id AND article_likes.article_id=%s"
        data=article_id
        cursor.execute(sql,data)
        article_likes=cursor.fetchall()
        return jsonify(article_likes)
    

    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        sql="INSERT INTO articles_likes(article_id,user_id) VALUES(%s,%s,%s)"
        data=(article_id,user_id)
        cursor.execute(sql,data)
        db.commit()
        return jsonify("One like added")










    
    

###################post_likes##################

@app.route('/post_likes/<int:post_id>',methods=["POST","GET","DELETE"])   
def likepost(post_id):
    if request.method=="GET":
        sql="SELECT* FROM post_likes,users WHERE users.id=post_likes.user_id AND post_likes.post_id=%s"
        data=post_id
        cursor.execute(sql,data)
        post_likes=cursor.fetchall()
        return jsonify(post_likes)
    

    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        sql="INSERT INTO post_likes(post_id,user_id) VALUES(%s,%s,%s)"
        data=(post_id,user_id)
        cursor.execute(sql,data)
        db.commit()
        return jsonify("One like added")
    



############Unliking an article#############

@app.route("/unlike/<int:article_id>")
def unlike_article(article_id):
    if request.method=="DELETE":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        article_id=article_id
        sql="DELETE FROM article_likes WHERE post_id=%s"
        data=article_id
        cursor.execute(sql,data)
        db.commit()
        return jsonify("Unliked")




#######Unliking a post#############
@app.route("/post_unlike/<int:post_id>")
def unlike_post(post_id):
    if request.method=="DELETE":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        article_id=post_id
        sql="DELETE FROM post_likes WHERE post_id=%s"
        data=post_id
        cursor.execute(sql,data)
        db.commit()
        return jsonify("Unliked")





################comment_likes  for articles#######

@app.route('/likes/<int:comment_id>',methods=["POST","GET"])   
def likearticlecomment(comment_id):
    if request.method=="GET":
        sql="SELECT* FROM comment_likes,users WHERE users.id=comment_likes.user_id AND comment_likes.comment_id=%s"
        data=comment_id
        cursor.execute(sql,data)
        comment_likes=cursor.fetchall()
        return jsonify(comment_likes)
    

    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        
        sql="INSERT INTO comment_likes(comment_id,user_id) VALUES(%s,%s,%s)"
        data=(comment_id,user_id)
        cursor.execute(sql,data)
        db.commit()
        return jsonify("One like added")


#####Comment like for a post###############

@app.route('/post_comment_likes/<int:post_comment_id>',methods=["POST","GET"])   
def likepostcomment(post_comment_id):
    if request.method=="GET":
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT* FROM post_comment_likes,users WHERE users.id=post_comment_likes.user_id AND post_comment_likes.post_comment_id=%s",(post_comment_id,))
        post_comment_likes=cursor.fetchall()
        return jsonify(post_comment_likes)
    

    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['user_id']
        
        sql="INSERT INTO post_comment_likes(post_comment_id,user_id) VALUES(%s,%s,%s)"
        data=(post_comment_id,user_id)
        cursor.execute(sql,data)
        db.commit()
        return jsonify("One like added")









#########For unliking a comment on an article###########

@app.route("/unlike/<int:comment_id>")
def unlike_comment(comment_id):
    if request.method=="DELETE":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        
        sql="DELETE FROM comment_likes WHERE comment_id=%s"
        data=comment_id
        cursor.execute(sql,data)
        db.commit()
        return jsonify("Unliked")



############For unliking a comment on post#############

@app.route("/post_comment_unlike/<int:post_comment_id>")
def unlike_post_comment(post_comment_id):
    if request.method=="DELETE":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        
        sql="DELETE FROM post_comment_likes WHERE post_comment_id=%s"
        data=post_comment_id
        cursor.execute(sql,data)
        db.commit()
        return jsonify("Unliked")













#############reply_likes on articles###########

@app.route('/likes/<int:reply_id>',methods=["POST","GET"])   
def likearticlereplies(reply_id):
    if request.method=="GET":
        sql="SELECT* FROM reply_likes,users WHERE users.id=reply_likes.user_id AND reply_likes.reply_id=%s"
        data=reply_id
        cursor.execute(sql,data)
        reply_likes=cursor.fetchall()
        return jsonify(reply_likes)
    

    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        comment_id=comment_id
        sql="INSERT INTO reply_likes(reply_id,user_id) VALUES(%s,%s,%s)"
        data=(reply_id,user_id)
        cursor.execute(sql,data)
        db.commit()
        return jsonify("One like added")



#########reply likes on a post#########

@app.route('/post_reply_likes/<int:post_reply_id>',methods=["POST","GET"])   
def likepostreplies(post_reply_id):
    if request.method=="GET":
        sql="SELECT* FROM reply_post_comment_likes,users WHERE users.id=post_reply_likes.user_id AND post_reply_likes.post_reply_id=%s"
        data=post_reply_id
        cursor.execute(sql,data)
        reply_likes=cursor.fetchall()
        return jsonify(reply_likes)
    

    if request.method=="POST":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
    
        sql="INSERT INTO reply_post_comment_likes(post_reply_id,user_id) VALUES(%s,%s,%s)"
        data=(post_reply_id,user_id)
        cursor.execute(sql,data)
        db.commit()
        return jsonify("One like added")

  













#########Unlike reply for an article###############

@app.route("/unlike/<int:reply_id>")
def unlike_reply(reply_id):
    if request.method=="DELETE":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        
        sql="DELETE FROM reply_likes WHERE reply_id=%s"
        data=reply_id
        cursor.execute(sql,data)
        db.commit()
        return jsonify("Unliked")


###########Unlike reply for a post###########

@app.route("/post_reply_unlike/<int:post_reply_id>")
def unlike_post_reply(post_reply_id):
    if request.method=="DELETE":
        jwt_decoded=request.headers.get('Authorization')
        decoded=jwt.decode(jwt_decoded, secret, algorithms=['HS256'])
        user_id=decoded['userID']
        sql="DELETE FROM reply_post_comment_likes WHERE reply_id=%s"
        data=post_reply_id
        cursor.execute(sql,data)
        db.commit()
        return jsonify("Unliked")



###############Delete section####################

###########Delete an article##############
@app.route("/<int:article_id>",methods=["DELETE"])
def deletearticle(article_id):
    sql="DELETE FROM articles WHERE articles.id=%s"
    data=article_id
    cursor.execute(sql,data)
    db.commit()
    return jsonify({"message":"Post deleted sucessfully"})





##############Delete Post##############
@app.route("/post_delete/<int:post_id>",methods=["DELETE","POST"])
def deletepost(post_id):
    
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("DELETE FROM Posts WHERE _id=%s",(post_id,))
    mysql.connection.commit()
    return jsonify({"message":"Post deleted sucessfully"})



###########Delete Comment on an article############

@app.route("/comments/<int:comment_id>",methods=["DELETE"])
def delete_article_comment(comment_id):
    
    sql="DELETE FROM comments WHERE comments._id=(?)"
    data=comment_id
    cursor.execute(sql,[data])
    return jsonify({"message":"Comment sucessfully deleted"})








###########Delete Comment on a post##########
@app.route("/post_comment_delete/<int:post_comment_id>",methods=["DELETE"])
def delete_post_comment(post_comment_id):
    
    
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("DELETE FROM post_comments WHERE post_comments._id=%s",(post_comment_id,))
    mysql.connection.commit()
    return jsonify({"message":"Comment sucessfully deleted"})



#############Delete a reply on an article##########

@app.route("/replies/<int:reply_id>", methods=["DELETE"])
def deletereply(reply_id):
    sql="DELETE FROM   replies  WHERE replies.id=(?)"
    data=reply_id
    cursor.execute(sql,[data])
    return jsonify({"message":"reply successfully deleted"})




#######Delete a reply on a post###########
@app.route("/post_reply_delete/<int:post_reply_id>", methods=["DELETE"])
def delete_post_reply(post_reply_id):
    
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("DELETE FROM reply_post_comments WHERE reply_post_comments.id=%s",(post_reply_id,))
    return jsonify({"message":"reply successfully deleted"})



        


    
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