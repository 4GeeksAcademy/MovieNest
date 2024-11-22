import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from flask_jwt_extended import JWTManager
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.blacklist import blacklist
from flask_mail import Mail


# Crear la instancia de Flask primero
app = Flask(__name__)

# Configuraciones de la aplicación
app.config['MAIL_SERVER'] = 'sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "104167b08b9ab9"
app.config['MAIL_PASSWORD'] = "06db9fec1158cf"
app.config['MAIL_DEFAULT_SENDER'] = 'no-reply@yourdomain.com'

app.config['BASE_URL'] = 'https://potential-yodel-jj4qwx7xxppp25r7x-3001.app.github.dev'

# Inicializar Flask-Mail después de la configuración
mail = Mail(app)

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app.url_map.strict_slashes = False

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
jwt = JWTManager(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('FLASK_APP_KEY', 'default-key')  
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

# Configuración del admin
setup_admin(app)

# Configuración de los comandos
setup_commands(app)

# Registrar las rutas del API
app.register_blueprint(api, url_prefix='/api')

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(_, jwt_payload):
    jti = jwt_payload['jti']
    print("Blacklist contents:", blacklist)  # Debug line
    print("Checking JTI:", jti)  # Debug line
    return jti in blacklist

@jwt.invalid_token_loader
def invalid_token_callback(error):
    print("Invalid token error details:", error)
    return jsonify({
        'message': 'Invalid token',
        'error': 'invalid_token'
    }), 401

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generación del sitemap
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Servir otros archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# Ejecutar la aplicación
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
