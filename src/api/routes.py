"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import sys
sys.path.append("..")
import os
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, Usuario, Producto, Muestra, Orden, DetalleOrden, Favoritos
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

# Mercado Pago SDK
import mercadopago

api = Blueprint('api', __name__)

#Agregar Development Token a Mercado Pago SDK
mercado_pago_sdk = mercadopago.SDK(os.getenv("MERCADO_PAGO_TOKEN"))
WEB_URL_BASE = os.getenv("WEB_URL_BASE")

"""
URL = https://url_base/api/validarToken ['GET']
Retorna el objecto de usuario si el token es valido
Ejemplo de respuesta:

{
    "admin": true,
    "apellido": "Solorzano",
    "email": "erneslobo@gmail.com",
    "id": 2,
    "nombre": "Ernesto",
    "telefono": "+50683408811"
}
"""

@api.route("/validarToken", methods=["GET"])
@jwt_required()
def validarToken():
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()

    if usuario is None:
        raise APIException('Token invalido', status_code=401)

    usuario = usuario.serialize()
    return jsonify(usuario=usuario), 200

"""
URL = https://url_base/api/usuarios ['GET']
Retorna una lista de objetos de usuario.
Ejemplo de respuesta:

[
    {
        "admin": true,
        "apellido": "Solorzano",
        "email": "erneslobo@gmail.com",
        "id": 1,
        "nombre": "Ernesto",
        "telefono": "+50683408811"
    },
    {
        "admin": false,
        "apellido": "Moreira",
        "email": "mel.morle0128@gmail.com",
        "id": 2,
        "nombre": "Melania",
        "telefono": "+50685922635"
    }
]
"""

@api.route('/usuarios', methods=['GET'])
@jwt_required()
def get_usuarios():
    usuarios_query = Usuario.query.all()
    all_usuarios = list(map(lambda x: x.serialize(), usuarios_query))
    return jsonify(all_usuarios), 200

"""
URL = https://url_base/api/muestras ['GET']
Retorna una lista de objetos de muestra.
Ejemplo de respuesta:
[
    {
        "activo": true,
        "categoria": "Categoria2",
        "id": 2,
        "imagen": "http://muestra.com/2",
        "nombre": "Muestra2"
    },
    {
        "activo": true,
        "categoria": "Categoria1",
        "id": 1,
        "imagen": "http://muestra.com/1",
        "nombre": "Muestra1"
    }
]
"""

@api.route('/muestras', methods=['GET'])
def get_muestras():
    muestras_query = Muestra.query.all()
    all_muestras = list(map(lambda x: x.serialize(), muestras_query))
    return jsonify(all_muestras), 200

"""
URL = https://url_base/api/productos ['GET']
Retorna una lista de objetos de producto.
Ejemplo de respuesta:
[
    {
        "activo": true,
        "categoria": "Categoria2",
        "descripcion": "Producto2",
        "id": 2,
        "imagen": "https://imagen.com/2",
        "nombre": "Producto2",
        "precio": 122.99,
        "tipo": "Tipo2"
    },
    {
        "activo": true,
        "categoria": "Categoria1",
        "descripcion": "Producto1",
        "id": 1,
        "imagen": "https://imagen.com/1",
        "nombre": "Producto1",
        "precio": 150.2,
        "tipo": "Tipo1"
    }
]
"""

@api.route('/productos', methods=['GET'])
def get_productos():
    productos_query = Producto.query.all()
    all_productos = list(map(lambda x: x.serialize(), productos_query))
    return jsonify(all_productos), 200

"""
URL = https://url_base/api/favoritos ['GET']
Necesita un token de authenticacion que se obtiene por medio del log in.
Retorna una lista de objetos favoritos.
Ejemplo de respuesta:
[
    {
        "id": 3,
        "muestra_id": 1,
        "usuario_id": 2
    },
    {
        "id": 4,
        "muestra_id": 2,
        "usuario_id": 2
    }
]
"""

@api.route('/favoritos', methods=['GET'])
@jwt_required()
def get_usuario_favoritos():
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    usuario_favoritos = Favoritos.query.filter_by(usuario_id=usuario.id).all()
    usuario_favoritos = list(map(lambda x: x.serialize(), usuario_favoritos))
    return jsonify(usuario_favoritos)

"""
URL = https://url_base/api/usuario ['PUT']
Necesita un token de authenticacion que se obtiene por medio del log in.
Endpoint es utilizado para actualizar los datos de un usuario, como el password
En el body se tiene que enviar un objeto con el field que se quiere actualizar, por ejemplo, para actualizar el password:
{
    "password":"test"
}

Retorna el objecto de usuario ya actualizado.
Ejemplo de respuesta:
{
    "admin": false,
    "apellido": "Moreira",
    "email": "mel.morle0128@gmail.com",
    "id": 2,
    "nombre": "Melania",
    "telefono": "+50685922635"
}
"""

@api.route('/usuario', methods=['PUT'])
@jwt_required()
def actualizar_usuario():
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    existe_usuario = usuario is not None
    if not existe_usuario:
        raise APIException('Usuario no existe', status_code=404)

    usuario.nombre = request.json.get("nombre", usuario.nombre)
    usuario.apellido = request.json.get("apellido", usuario.apellido)
    usuario.telefono = request.json.get("telefono", usuario.telefono)
    usuario.email = request.json.get("email", usuario.email)
    usuario.password = request.json.get("password", usuario.password)
    usuario.admin = request.json.get("admin", usuario.admin)

    db.session.commit()

    usuario = Usuario.query.get(usuario.id)
    usuario = usuario.serialize()
    return jsonify(usuario), 200

"""
URL = https://url_base/api/registro ['POST']
Endpoint utilizado para crear usuarios. En el body se envia un objecto usuario como por ejemplo:
{
    "nombre": "Alina",
    "apellido": "Solorzano",
    "telefono": "+50683357214",
    "email": "alina.sol@gmail.com",
    "password": "test",
    "admin": false
}

La API retorna el objecto usuario creado correctamente. Ejemplo de respuesta:
{
    "admin": false,
    "apellido": "Moreira",
    "email": "mel.morle0128@gmail.com",
    "id": 2,
    "nombre": "Melania",
    "telefono": "+50685922635"
}
"""

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

"""
URL = https://url_base/api/login ['POST']
Endpoint utilizado para login. En el body se envia email y password como por ejemplo:

{
    "email": "mel.morle0128@gmail.com",
    "password": "test"
}

La API retorna un token para futuras autenticaciones y los datos del usuario para uso en el front.
{
    "access_token": "eyJ0eXTT4k5FC4saHguvifHZX8d9SKGkSTT4k5FC4saHguvifHZX8TT4k5FC4saHguvifHZX8muJk",
    "user": {
        "admin": true,
        "apellido": "ADMIN",
        "email": "admin@admin.com",
        "id": 1,
        "nombre": "ADMIN",
        "telefono": "4343423432"
    }
}
"""

@api.route("/login", methods=["POST"])
def login():
    nombre = request.json.get("nombre", None)
    apellido = request.json.get("apellido", None)
    telefono = request.json.get("telefono", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    admin = request.json.get("admin", False)

    usuario = Usuario.query.filter_by(email=email, password=password).first()
    if usuario is None:
        raise APIException('Usuario o password incorrecto', status_code=401)

    #datos del usuario
    user =  Usuario(nombre=nombre,
                apellido= apellido,
                telefono = telefono,
                email=email,
                password=password,
                admin = admin
                )
    user = Usuario.query.filter_by(email=email).first()
    user = user.serialize()

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user)

@api.route("/password_reset", methods=["POST"])
def password_reset():
    email = request.json.get("email", None)

    usuario = Usuario.query.filter_by(email=email).first()
    if usuario is None:
        raise APIException('usuario no existe', status_code=404)

    usuario = usuario.serialize()
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=usuario)

"""
URL = https://url_base/api/favoritos/<int:muestra_id> ['POST']
Endpoint utilizado para agregar muestras a favoritos.
Retorna un list de favoritos que contiene objectos de muestra

[
    {
        "id": 2,
        "muestra_id": 1,
        "usuario_id": 2
    }
]
"""

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

"""
URL = https://url_base/api/orden ['POST']
Endpoint utilizado para crear un orden de compra. En el body se envia metodo_pago y monto_total como por ejemplo:

{
    "metodo_pago" : "mercado pago",
    "monto_total" : "100.52"
}

Retorna un objecto de orden ya creada

{
    "id": 3,
    "metodo_pago": "mercado pago",
    "monto_total": 100.52,
    "usuario_id": 2
}

"""

@api.route('/orden', methods=['POST'])
@jwt_required()
def agregar_orden():
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    existe_usuario = usuario is not None
    if not existe_usuario:
        raise APIException('Usuario no existe', status_code=404)
    
    usuario_id = usuario.id
    metodo_pago = request.json.get("metodo_pago", None)
    monto_total = request.json.get("monto_total", None)

    orden = Orden(usuario_id=usuario_id,
                metodo_pago= metodo_pago,
                monto_total = monto_total
                )
    db.session.add(orden)
    db.session.commit()

    orden = Orden.query.get(orden.id)
    orden = orden.serialize()
    return jsonify(orden), 201


"""
URL = https://url_base/api/detalle_orden ['POST']
Endpoint utilizado para agregar items a la orden. En el body se envia orden_id, producto_id y cantidad como por ejemplo:

{
    "orden_id" : 2,
    "producto_id": 1,
    "cantidad": 2
}

Retorna un objecto con los detalle de orden ya creada
{
    "cantidad": 2,
    "id": 1,
    "orden_id": 2,
    "producto_id": 1
}

"""

@api.route('/detalle_orden', methods=['POST'])
@jwt_required()
def agregar_detalle_orden():
    identidad_usuario = get_jwt_identity()
    usuario = Usuario.query.filter_by(email=identidad_usuario).first()
    existe_usuario = usuario is not None
    if not existe_usuario:
        raise APIException('Usuario no existe', status_code=404)
    
    orden_id = request.json.get("orden_id", None)
    producto_id = request.json.get("producto_id", None)
    cantidad = request.json.get("cantidad", None)

    detalle_orden = DetalleOrden(orden_id=orden_id,
                producto_id= producto_id,
                cantidad = cantidad
                )
    db.session.add(detalle_orden)
    db.session.commit()

    detalle_orden = DetalleOrden.query.get(detalle_orden.id)
    detalle_orden = detalle_orden.serialize()
    return jsonify(detalle_orden), 201

"""
URL = https://url_base/api/mercado_pago_prefencias ['POST']
Endpoint utilizado para crear las preferencia de mercado pago para iniciar el pago. 
En el body se envia los items del carrito de compras en una lista con formato JSON

[
	{
		"imagen": "imagen1",
		"articulo": {
			"title": "test2",
			"quantity": 1,
			"unit_price": 100
		}
	},
	{
		"imagen": "imagen1",
		"articulo": {
			"title": "test1",
			"quantity": 1,
			"unit_price": 100
		}
	}
]

Retorna un objecto de preferencias creado por mercado pago con la informacion que se le envio
"""

@api.route('/mercado_pago_prefencias', methods=['POST'])
@jwt_required()
def mercado_pago_prefencias():
    print("mercado_pago_prefencias")
    items = []
    request_data = request.get_json()

    for item in request_data:
        items.append(item["articulo"])

    preference_data = {
        "items": items,
        "back_urls": {
			"success": f"{WEB_URL_BASE}/compra-exitosa",
			"failure": f"{WEB_URL_BASE}/compra-error",
			"pending": f"{WEB_URL_BASE}/compra-pendiente"
		},
		"auto_return": "approved"
    }
    preference_response = mercado_pago_sdk.preference().create(preference_data)
    preference = preference_response["response"]
    print(preference)
    return preference, 200

"""
URL = https://url_base/api/favoritos/<int:muestra_id> ['DELETE']
Endpoint utilizado para borrar muestras de la lista de favoritos. 

Retorna la lista de favoritos ya actualizada con los objetos de muestra.
[
    {
        "id": 4,
        "muestra_id": 2,
        "usuario_id": 2
    }
]
"""

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

"""
Enviar correos desde el back end usando la libreria de flask-email.
Sin embargo proveedores como gmail y hotmail no ven segura esta libreria y la cuenta se puede bloquear.
Por lo que se va a usar un metodo de enviar emails desde el front end con emailjs.
"""
# @api.route("/password_recovery", methods=['POST'])
# def password_recovery():
#     from app import mail
#     user_email = orden_id = request.json.get("email", None)
#     if not user_email:
#         raise APIException('Solicitud invalida, ingrese un correo por favor', status_code=404)
#     msg = Message(subject="Hello",
#                 sender=current_app.config.get("MAIL_USERNAME"),
#                 recipients=["erneslobo@gmail.com"], # replace with your email for testing
#                 body="This is a test email for python 4Geeks project")
#     mail.send(msg)

#     return "Message sent!"