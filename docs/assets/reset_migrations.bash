rm -R -f ./migrations &&
pipenv run init &&
psql -U gitpod -c 'DROP DATABASE example;' || true &&
psql -U gitpod -c 'CREATE DATABASE example;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade

#TABLA PRODUCTO
# psql -d example -U gitpod -c "INSERT INTO public.producto (nombre,descripcion, descripcionCorta, precio, tipo, categoria, imagen, thumbnail, activo) 
#                             VALUES ('Producto1','Descripcion Producto1','descripcionCorta', '150','tipo1','Categoria1','https://xxxx','https://xxxx', true),
#                                   ('Producto1','Descripcion Producto1','descripcionCorta', '150','tipo1','Categoria1','https://xxxx','https://xxxx', true),"


# TABLE USUARIO
# psql -d example -U gitpod -c "INSERT INTO public.usuario (nombre,apellido, telefono, email, password, admin) 
#                               VALUES ('Ernesto', 'Solorzano','erneslobo@gmail.com','12345',true),
#                                       ('Ernesto', 'Solorzano','erneslobo@gmail.com','12345',true);"

