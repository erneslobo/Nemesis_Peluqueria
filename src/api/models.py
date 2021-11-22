from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Creacion de los modelos de la base de datos

#Creacion del modelo de Usuario
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    nombre = db.Column(db.String(250), nullable=False)
    apellido = db.Column(db.String(250), nullable=False)
    telefono = db.Column(db.String(250))
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    admin = db.Column(db.Boolean, nullable=False)
    favoritos = db.relationship('Favoritos', backref='usuario', lazy=True)
    ordenes = db.relationship('Orden', backref='usuario', lazy=True)

    def __repr__(self):
        return f'<Usuario {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "telefono": self.telefono,
            "email": self.email,
            "admin": self.admin
            # no se serializa el password por motivos de seguridad
        }

#Creacion del modelo de Producto
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), unique=True, nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    descripcionCorta = db.Column(db.Text)
    precio = db.Column(db.Float, nullable=False)
    tipo = db.Column(db.String(250), nullable=False)
    categoria = db.Column(db.String(250), nullable=False)
    imagen = db.Column(db.String(250), nullable=False)
    thumbnail = db.Column(db.String(250), nullable=False)
    activo = db.Column(db.Boolean(), nullable=False)
    detalle_ordenes = db.relationship('DetalleOrden', backref='producto', lazy=True)

    def __repr__(self):
        return f'<Producto {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "descripcionCorta": self.descripcionCorta,
            "precio": self.precio,
            "tipo": self.tipo,
            "categoria": self.categoria,
            "imagen": self.imagen,
            "activo": self.activo
        }

#Creacion del modelo de Muestra
class Muestra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), unique=True, nullable=False)
    imagen = db.Column(db.String(250), nullable=False)
    thumbnail = db.Column(db.String(250), nullable=False)
    categoria = db.Column(db.String(250), nullable=False)
    activo = db.Column(db.Boolean(), nullable=False)
    favoritos = db.relationship('Favoritos', backref='muestra', lazy=True)

    def __repr__(self):
        return f'<Muestra {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "imagen": self.imagen,
            "thumbnail": self.thumbnail,
            "categoria": self.categoria,
            "activo": self.activo
        }

#Creacion del modelo de Orden
class Orden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    metodo_pago = db.Column(db.String(250), nullable=False)
    monto_total = db.Column(db.Float, nullable=False)
    detalle_ordenes = db.relationship('DetalleOrden', backref='orden', lazy=True)

    def __repr__(self):
        return f'<Orden {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "metodo_pago": self.metodo_pago,
            "monto_total": self.monto_total
        }

#Creacion del modelo de Detalle de Orden
class DetalleOrden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    orden_id = db.Column(db.Integer, db.ForeignKey('orden.id'), nullable=False)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<DetalleOrden {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "orden_id": self.orden_id,
            "producto_id": self.producto_id,
            "cantidad": self.cantidad
        }

#Creacion del modelo de Favoritos
class Favoritos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    muestra_id = db.Column(db.Integer, db.ForeignKey('muestra.id'), nullable=False)

    def __repr__(self):
        return f'<Favoritos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "muestra_id": self.muestra_id,
        }
