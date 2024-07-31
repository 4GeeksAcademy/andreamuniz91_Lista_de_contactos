"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Posts, Medias, Comments
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/users", methods=["GET", "POST"])
def handle_users():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # List comprehesion
        response_body["results"] = results
        response_body["message"] = "GET request"
        return response_body, 200
    if request.method == "POST":
        data = request.json
        user = Users (
            user_name=data["username"],
            firtname=data["firtname"],
            lastname=data["lastname"],
            email=data["email"]
            )
        db.session.add(user)
        db.session.commit()
        response_body["message"] = "POST request"
        return response_body, 200

@api.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def handle_user(user_id):
    response_body = {}
    if request.method == "GET":
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
              response_body["results"] = {}
              response_body["message"] = f'doesnt exist {user_id}'
              return response_body, 404
        response_body["results"] = row.serialize()
        response_body["message"] = f'Recibi el GET request {user_id}'
        return response_body, 200
    if request.method == "PUT":
        response_body["message"] = f'Recibi el PUT request {user_id}'
        return response_body, 200
    if request.method == "DELETE":
        response_body["message"] = f'borre a {user_id}'
        return response_body, 201

@api.route("/medias", methods=["GET"])
def handle_medias():
    response_body = {}
    rows = db.session.execute(db.select(Medias)).scalars()
    results = [row.serialize() for row in rows]  # List comprehesion
    response_body["results"] = results
    response_body["message"] = "GET request"
    return response_body, 200
 
@api.route("/comments", methods=["GET", "POST"])
def handle_comments():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Comments)).scalars()
        results = [row.serialize() for row in rows] 
        response_body["results"] = results
        response_body["message"] = "GET request"
        return response_body, 200
    if request.method == "POST":
        data = request.json
        comment = Comments(
                comment_text = data["comment_text"],
                user_id = data["user_id"],
                post_id = data["post_id"])
        db.session.add(comment)
        db.session.commit()
        response_body["message"] = "POST request"
        return response_body, 201
    
@api.route("/comments/<int:post_id>", methods=["DELETE", "PUT"])
def handle_comment_id(post_id):
    response_body = {}
    list_comment = db.session.execute(db.select(Comments).where(Comments.id == post_id)).scalar()
    if request.method == "DELETE":
        db.session.delete(list_comment)
        db.session.commit()
        response_body['message'] = f'Comentario borrado'
        return jsonify(response_body), 200
    if request.method == "PUT":
        data = request.json
        list_comment.comment_text = data["comment_text"]         
        db.session.commit()
        response_body["message"] = f'Recibi el PUT request {post_id}'
        return jsonify(response_body), 200

@api.route("/posts/<int:user_id>", methods=["POST", "DELETE"])
def handle_post(user_id):
    if request.method == "POST":
        post = Posts(user_id = user_id)
        db.session.add(post)
        db.session.commit()
        return "post realizado", 201
    if request.method == "DELETE":
        row = db.session.execute(db.select(Posts).where(Posts.id == user_id)).scalar()
        db.session.delete(row)
        db.session.commit()
        return "post borrado", 201
        # Falta put