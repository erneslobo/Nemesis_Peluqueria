rm -R -f ./migrations &&
pipenv run init &&
psql -U gitpod -c 'DROP DATABASE example;' || true &&
psql -U gitpod -c 'CREATE DATABASE example;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade &&
# psql -d example -U gitpod -c "INSERT INTO public.producto (nombre,descripcion, descripcionCorta, precio, tipo, categoria, imagen, thumbnail, activo) 
#                             VALUES ('4geeks@mail.com','12345',true);"
