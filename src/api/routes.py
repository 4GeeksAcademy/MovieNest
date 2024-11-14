"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import  Flask, request, jsonify, Blueprint
from api.models import db, User, Favorite
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, get_jwt
from api.blacklist import blacklist
from flask_cors import CORS
from flask_mail import Mail, Message

# Crear la instancia de Flask primero
app = Flask(__name__)

# Configuraciones de la aplicación
app.config['MAIL_SERVER'] = 'sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "104167b08b9ab9"
app.config['MAIL_PASSWORD'] = "06db9fec1158cf"
app.config['MAIL_DEFAULT_SENDER'] = 'no-reply@yourdomain.com'

app.config['BASE_URL'] = 'http://127.0.0.1:3001'

# Inicializar Flask-Mail después de la configuración
mail = Mail(app)

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
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "username": user.username  
        }), 200

    return jsonify({"message": "The user doesn't exist"}), 404

@api.route('/signup', methods=['POST'])
def create_user():
    try:
        # Obtener los datos enviados en la solicitud
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validar los datos (como mínimo, asegurarse de que no estén vacíos)
        if not email or not password:
            return jsonify({"message": "Email and password are required"}), 400

        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "User already exists"}), 400

        # Crear un nuevo usuario
        new_user = User(email=email, password=password)

        # Agregar el nuevo usuario a la base de datos
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as db_error:
            print(f"Error adding user to the database: {db_error}")
            db.session.rollback()
            return jsonify({"message": "Database error"}), 500

        # Intentar enviar el correo de activación
        try:
            send_activation_email(new_user)
        except Exception as email_error:
            print(f"Error sending activation email: {email_error}")
            return jsonify({"message": "Error sending activation email"}), 500

        return jsonify({
            "message": "Success. Please check your email to activate your account."
        }), 201

    except Exception as e:
        print(f"General registration error: {e}")  # Ver en los logs
        return jsonify({"message": "Error during registration"}), 500

def send_activation_email(user):
    token = generate_confirmation_token(user)
    confirm_url = f"{current_app.config['BASE_URL']}/confirm/{token}"
    subject = "Activate your account"
    body = f"Click the link to activate your account: {confirm_url}"

    msg = Message(subject=subject, recipients=[user.email])
    msg.body = body
    try:
        mail.send(msg)  # Enviar correo
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
    return True

def generate_confirmation_token(user):
    # Genera un token para el correo de activación
    return create_access_token(identity=user.id, expires_delta=timedelta(hours=1))  # Válido por 1 hora

@api.route('/confirm/<token>', methods=['GET'])
def confirm_email(token):
    try:
        user_id = decode_token(token)
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Invalid or expired token"}), 400
        
        user.is_active = True
        db.session.commit()
        return jsonify({"message": "Your account has been activated!"}), 200
    except Exception as e:
        print(f"Error in confirmation: {e}")
        return jsonify({"message": "Invalid or expired token"}), 400


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

    favorites= Favorite.query.filter_by(user_id=user.id)
    for favorite in favorites:
        if favorite.movie_id == movie_id:
            return jsonify({"message": "Movie already in favorites"}), 400

    new_favorite = Favorite(user_id=user.id, movie_id=movie_id, movie_name=movie_name) #add movie poster,synaps,rating are missing on fav page
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

@app.route('/api/send_email', methods=['POST'])
def send_email():
    # Crea el mensaje
    msg = Message('Hola desde Flask', recipients=['tu_correo_destino@gmail.com'])
    msg.body = "Hola, soy Flask"
    
    try:
        # Envia el mensaje
        mail.send(msg)
        return jsonify({"message": "Correo enviado correctamente!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)