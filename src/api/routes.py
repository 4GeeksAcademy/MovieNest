"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import  request, jsonify, Blueprint
from api.models import db, User, Favorite
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, get_jwt
from api.blacklist import blacklist
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)

# Authenthication endpoints

@api.route('/login', methods=['POST'])
def login_user():
    request_data = request.get_json()
    email = request_data.get("email")
    password = request_data.get("password")

    user = User.query.filter_by(email=email).filter_by(password=password).first()

    if user:
        access_token = create_access_token(identity=email)
        return jsonify({ "access_token": access_token }), 200

    return jsonify({ "message": "The user doesnt exist"}), 404

@api.route('/signup', methods=['POST'])
def create_user():
    request_data = request.get_json()
    email = request_data.get("email")
    password = request_data.get("password")

    new_user = User(email=email, password=password, is_active=True)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=email)

    return jsonify({ "access_token": access_token }), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout_user():
    jti = get_jwt()['jti'] 
    blacklist.add(jti)

    return jsonify({ "msg": "Successfully logged out" }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_private_data():
    token_is_valid = get_jwt_identity() 
    if token_is_valid:
        return jsonify({ "message": "Success! You got private information" }), 200

    return jsonify({ "message": "Token is not valid"}), 401

# Favorites endpoints

@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()  
    request_data = request.get_json()
    movie_id = request_data.get("movie_id")
    movie_name = request_data.get("movie_name")

    user = User.query.filter_by(email=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404


    existing_favorite = Favorite.query.filter_by(user_id=user.id, movie_id=movie_id).first()
    if existing_favorite:
        return jsonify({"message": "Movie already in favorites"}), 400

    new_favorite = Favorite(user_id=user.id, movie_id=movie_id, movie_name=movie_name)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(new_favorite.serialize()), 201

@api.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(favorite_id):
    user_id = get_jwt_identity() 

    user = User.query.filter_by(email=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404


    favorite = Favorite.query.filter_by(id=favorite_id, user_id=user.id).first()
    if not favorite:
        return jsonify({"message": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"message": "Favorite deleted"}), 200

@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    user_id = get_jwt_identity() 

    user = User.query.filter_by(email=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404


    favorites = Favorite.query.filter_by(user_id=user.id).all()
    favorites_list = [favorite.serialize() for favorite in favorites]

    return jsonify(favorites_list), 200