"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Producto, Muestra, Orden, DetalleOrden, Favoritos
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios_query = Usuario.query.all()
    all_usuarios = list(map(lambda x: x.serialize(), usuarios_query))
    return jsonify(all_usuarios), 200

@api.route('/muestras', methods=['GET'])
def get_muestras():
    muestras_query = Muestra.query.all()
    all_muestras = list(map(lambda x: x.serialize(), muestras_query))
    return jsonify(all_muestras), 200

@api.route('/productos', methods=['GET'])
def get_productos():
    productos_query = Producto.query.all()
    all_productos = list(map(lambda x: x.serialize(), productos_query))
    return jsonify(all_productos), 200

@api.route('/favoritos', methods=['GET'])
@jwt_required()
def get_usuario_favoritos():
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    usuario_favoritos = Favoritos.query.filter_by(usuario_id=usuario.id).all()
    usuario_favoritos = list(map(lambda x: x.serialize(), usuario_favoritos))
    return jsonify(usuario_favoritos)

@api.route('/registro', methods=['POST'])
def agregar_usuario():
    usuario = Usuario.query.filter_by(email=request.json.get("email", None)).first()
    if usuario is not None:
        raise APIException('Usuario ya existe!', status_code=409)

    nombre = request.json.get("nombre", None)
    apellido = request.json.get("apellido", None)
    telefono = request.json.get("telefono", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    admin = request.json.get("admin", False)

    usuario = Usuario(nombre=nombre,
                apellido= apellido,
                telefono = telefono,
                email=email,
                password=password,
                admin = admin
                )
    db.session.add(usuario)
    db.session.commit()

    usuario = Usuario.query.filter_by(email=email).first()
    usuario = usuario.serialize()
    return jsonify(usuario), 201

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    usuario = Usuario.query.filter_by(email=email, password=password).first()
    if usuario is None:
        raise APIException('Usuario o password incorrecto', status_code=401)

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/favoritos/<int:muestra_id>', methods=['POST'])
@jwt_required()
def agregar_favoritos(muestra_id):
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    existe_muestra = Muestra.query.get(muestra_id) is not None
    existe_usuario = usuario is not None
    if not existe_muestra:
        raise APIException('Favorito no existe', status_code=404)
    if not existe_usuario:
        raise APIException('Usuario no existe', status_code=404)
    
    existe_favorito = Favoritos.query.filter_by(usuario_id=usuario.id, muestra_id=muestra_id).first() is not None
    if not existe_favorito:
        favorito = Favoritos(usuario_id=usuario.id, muestra_id=muestra_id)
        db.session.add(favorito)
        db.session.commit()
        return get_usuario_favoritos()
    else:
        raise APIException('Favorito ya existe', status_code=409)

@api.route('/favoritos/<int:muestra_id>', methods=['DELETE'])
@jwt_required()
def borrar_favoritos(muestra_id):
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    existe_muestra = Muestra.query.get(muestra_id) is not None
    existe_usuario = usuario is not None
    if not existe_muestra:
        raise APIException('Favorito no existe', status_code=404)
    if not existe_usuario:
        raise APIException('Usuario no existe', status_code=404)
    
    favorito = Favoritos.query.filter_by(usuario_id=usuario.id, muestra_id=muestra_id).first()
    existe_favorito = favorito is not None
    if existe_favorito:
        db.session.delete(favorito)
        db.session.commit()
        return get_usuario_favoritos()
    else:
        raise APIException('Favorito no existe', status_code=404)