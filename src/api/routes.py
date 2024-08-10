"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, People, Film, Starship, Vehicle, Species, Planet, FilmPeople, FilmStarships, FilmVehicles, FilmSpecies, FilmPlanets, PeopleStarships, PeopleVehicles, PeopleSpecies
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # List comprehension
        response_body['results'] = results
        response_body['message'] = "GET received"
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        if not username or not email:
            response_body['message'] = 'Missing data'
            response_body['results'] = {}
            return response_body, 400
        username_exist = db.session.execute(db.select(Users).where(Users.username == username)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'User already exist'
            response_body['results'] = {}
            return response_body, 404
        row = Users(username = data['username'], 
                    email = data['email'],
                    firstname = data['firstname'],
                    lastname = data['lastname'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "POST received"
        return response_body, 200



@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe el usuario {user_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el GET request {user_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        if not username or not email:
            response_body['message'] = 'Missing data'
            response_body['results'] = {}
            return response_body, 400
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = f'User doesnt exist {user_id}'
            response_body['results'] = {}
            return response_body, 404
        username_exist = db.session.execute(db.select(Users).where(Users.username == username, Users.id != user_id)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email, Users.id != user_id)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'User already exist'
            response_body['results'] = {}
            return response_body, 409
        user.username = username
        user.email = email
        user.firstname = data.get('firstname', user.firstname)
        user.lastname = data.get('lastname', user.lastname)
        db.session.commit()
        response_body['message'] = "User updated successfully"
        response_body['results'] = user.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    if not user:
        response_body['message'] = f'User doesnt exist {user_id}'
        response_body['results'] = {}
        return response_body, 404
    db.session.delete(user)
    db.session.commit()
    response_body['message'] = f'User {user_id} deleted successfully'
    return response_body, 200


@api.route("/favorites", methods=['POST', 'GET'])
@jwt_required()
def favorites():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()
    if not user:
        response_body['results'] = {}
        response_body["message"] = "User not found"
        return jsonify(response_body), 404
    user_id = user.id
    if request.method == 'POST': # Falta un dataToSend!!!!
        data = request.json
        item = data.get("item")
        if not item:
            response_body["message"] = "Missing favorite item"
            return response_body, 400
        existing_favourite = db.session.execute(
            db.select(Favorites).where(Favorites.user_id == user_id, Favorites.item == item)
        ).scalar()
        if existing_favourite:
            response_body["message"] = "The favourite already exists!!!"
            return jsonify(response_body), 409
        favourite2 = Favorites(item=item, user_id=user_id)
        db.session.add(favourite2)
        db.session.commit()
        response_body["message"] = "Favourite added"
        return jsonify(response_body), 201

    if request.method == 'GET':
        favorites = db.session.execute(db.select(Favorites).where(Favorites.user_id == current_user['user_id'])).scalars()
        rows = [row.serialize() for row in favorites]
        response_body['message'] = f'Favorites for user {current_user["email"]} retrieved successfully'
        response_body['results'] = rows
        return  jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    # TODO: realizar la lógica para verificar en nuestra DB
    email = data.get("email", None).lower()
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body['message'] = 'Authorization denied. email, password incorrect or user inactive'
        return response_body, 401
    access_token = create_access_token(identity={'email': email, 
                                                 'user_id': user.id, 
                                                 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    return response_body, 201

@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    email = data.get("email").lower()
    new_user = Users(
        email = email,
        password = data.get("password"),
        is_active = True,
        is_admin = False
    )
    print(new_user)
    db.session.add(new_user)
    db.session.commit()
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    access_token = create_access_token(identity={'email': user.email, 
                                                 'user_id': user.id, 
                                                 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User registrado y logeado'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()  # Access the identity of the current user with get_jwt_identity
    if current_user['is_admin']:
        response_body['message'] = f'Acceso concedido a {current_user["email"]}'
        response_body['results'] = current_user
        return response_body, 200
    response_body['message'] = f'Acceso dengado porque no eres Administrador'
    response_body['results'] = {}
    return response_body, 403

