"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import  request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, get_jwt
from api.blacklist import blacklist
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)


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
    jti = get_jwt()['jti'] # Get the token ID
    blacklist.add(jti) # Invalidate the token

    return jsonify({ "msg": "Successfully logged out" }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_private_data():
    token_is_valid = get_jwt_identity() # Checks the token is valid

    if token_is_valid:
        return jsonify({ "message": "Success! You got private information" }), 200

    return jsonify({ "message": "Token is not valid"}), 401
