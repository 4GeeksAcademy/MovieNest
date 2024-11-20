from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Favorite
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from api.blacklist import blacklist
from flask_cors import CORS
from werkzeug.security import generate_password_hash , check_password_hash

app = Flask(__name__)


api = Blueprint('api', __name__)


CORS(api)



@api.route('/login', methods=['POST'])
def login_user():
    request_data = request.get_json()
    email = request_data.get("email")
    password = request_data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "username": user.username  
        }), 200

    return jsonify({"message": "Invalid user or password"}), 404

@api.route('/signup', methods=['POST'])
def create_user():
    try:
        # Obtener los datos enviados en la solicitud
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')  # Obtener el username

        # Validar los datos (asegurarse de que no estén vacíos)
        if not email or not password or not username:
            return jsonify({"message": "Email, password, and username are required"}), 400

        # Verificar si el usuario o el username ya existen
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "User already exists"}), 400

        existing_username = User.query.filter_by(username=username).first()
        if existing_username:
            return jsonify({"message": "Username already taken"}), 400

        # Crear un nuevo usuario
        new_user = User(email=email, password=generate_password_hash(password), username=username)

        # Agregar el nuevo usuario a la base de datos
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as db_error:
            print(f"Error adding user to the database: {db_error}")
            db.session.rollback()
            return jsonify({"message": "Database error"}), 500

        # Retornar mensaje de éxito
        return jsonify({
            "message": "User created successfully. You can now log in.",
            "username": new_user.username  # Incluir el username en la respuesta
        }), 201

    except Exception as e:
        print(f"General registration error: {e}")
        return jsonify({"message": "Error during registration"}), 500


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

# # Favorites endpoints


@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()  
    request_data = request.get_json()
    movie_id = request_data.get("movie_id")
    movie_name = request_data.get("movie_name")

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    favorites = Favorite.query.filter_by(user_id=user.id)
    for favorite in favorites:
        if favorite.movie_id == movie_id:
            return jsonify({"message": "Movie already in favorites"}), 400

    new_favorite = Favorite(user_id=user.id, movie_id=movie_id, movie_name=movie_name)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(new_favorite.serialize()), 201


@api.route('/favorites/<int:movie_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(movie_id):
    user_id = get_jwt_identity()  # Get user ID from JWT token

    # Find the favorite by both user_id and movie_id
    favorite = Favorite.query.filter_by(user_id=user_id, movie_id=str(movie_id)).first()
    
    if not favorite:
        # If the favorite isn't found, return a 404 response
        return jsonify({"message": "Favorite not found"}), 404

    # If found, delete it
    db.session.delete(favorite)
    db.session.commit()

    # Return success message with the serialized favorite
    return jsonify({"message": "Favorite deleted successfully"}), 200

@api.route('/favorites', methods=['GET'])
@jwt_required()
def favorites():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    favorites = Favorite.query.filter_by(user_id=user.id).all()

    return jsonify([favorite.serialize() for favorite in favorites]), 200
