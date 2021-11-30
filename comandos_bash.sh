#!/bin/bash

# Buscar el archivo .bashrc, agregar la siguiente linea al final:
#                                     source /workspace/Nemesis_Peluqueria/comandos_bash.sh



# Ahora se pueden usar los siguientes comandos en la consola:
  
    # fix_consola      : para que ande la consola de npm

    # subir_productos  : Para subir 12 productos de prueba a la base de datos






# funcion para que ande la consola de npm
function fix_consola() {
  nvm install 14 && npm install && npm run start
}

# funcion para subir 12 productos de prueba a la base de datos
function subir_productos() {
  psql -d example -U gitpod -c "INSERT INTO public.producto (nombre,descripcion, precio, tipo, categoria, imagen, thumbnail, activo, descripcioncorta) 
                            VALUES ('Shampoo Inforcer 300 ml - LOreal',
        'Shampoo anti quiebre, fortificante con vitamina B6 y Biotina, reducción instantánea de la rotura del pelo, cabello más resistente y más fuerte.\nBeneficios: Fortalece el cabello, suaviza, facilita el peinado\nTipo de Pelo: Quebradizo o dañado\nAplicación: todo el cabello',
        990,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/0000747_shampoo-inforcer-300-ml-loreal-professionnel_600_bt30zb.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/0000747_shampoo-inforcer-300-ml-loreal-professionnel_600_bt30zb.jpg',
        true,
        'Shampoo anti quiebre'),

        ('Aceite Mythic Oil 100 ml - LOreal',
        'Aceite de Argán nutritivo de uso profesional para todo tipo de cabello, protege y suaviza el pelo, textura ligera y fluida que facilita el secado.\nBeneficios: Protección, Brillo, Suavidad\nTipo de Pelo: todo tipo de cabello\nAplicación: Medios y largos',
        1800,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/0000702_aceite-mythic-oil-100-ml-loreal-professionnel_notweq.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/0000702_aceite-mythic-oil-100-ml-loreal-professionnel_notweq.jpg',
        true,
        'Aceite de Argán nutritivo'),

        ('Ampolla Pro Longer 15 ml - LOreal',
        'Ampolla profesional para renovar las puntas de tu cabello en casa, hasta tu próxima visita al salón! La ampolla de Pro longer es un concentrado rellenador de puntas de un uso a la semana. Este tratamiento concentrado es ideal para cabellos largos con puntas finas y partidas o abiertas. Su formula altamente concentrada de FILLER-A100 y aminoácidos aporta fuerza y grosor duradero de manera inmediata. Estos componentes penetran en el núcleo de la fibra para engrosar y fortalecer las puntas, devolviendole la vida a los ultimos cm del cabello.',
        650,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001796_ampolla-pro-longer-15-ml-loreal-professionnel_600_bw8byl.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001796_ampolla-pro-longer-15-ml-loreal-professionnel_600_bw8byl.jpg',
        true,
        'Ampolla renovadora de puntas'),

        ('Acondicionador Blondifier 200 ml - LOreal',
        'Acondicionador profesional para mantener un rubio perfecto en casa, hasta tu próxima visita al salón! Acondicionador enriquecido con extracto de Açai El ligero acondicioandor ayuda a mejorar el brillo natural del cabello rubio. Cabello instántaneamente más brillante, suave y fácil de desenredar de raíz a puntas.',
        980,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001772_acondicionador-blondifier-para-rubios-loreal-pro-200-ml_600_zebghr.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001772_acondicionador-blondifier-para-rubios-loreal-pro-200-ml_600_zebghr.jpg',
        true,
        'Acondicionador para cabellos rubios'),

         ('Máscara Vitamino Color 250 ml - LOreal',
        'La nutritiva máscara en gel Vitamino Color repara las partes debilitadas y dañadas del cabello con color, protegiéndolo del desgaste cotidiano. Otorga 6 veces más protección del color contra la decoloración. El cabello con color está intensamente nutrido y protegido en tan sólo 60 segundos',
        1260,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001584_mascara-vitamino-color-250-ml-loreal-professionnel_600_dfensf.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001584_mascara-vitamino-color-250-ml-loreal-professionnel_600_dfensf.jpg',
        true,
        'Máscara para cabellos con color'),

        ('Powermix Repair 150 ml - LOreal',
        'Instantáneamente más resistente, aporta suavidad y brillo al cabello. Proporciona fuerza al cabello.',
        1423,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001702_powermix-repair-150-ml-loreal-professionnel_600_c8gllu.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/0001702_powermix-repair-150-ml-loreal-professionnel_600_c8gllu.jpg',
        true,
        'Proporciona fuerza al cabello.'),

        ('Esmalte Isnt it Grand Avenue - OPI',
        'La gran ciudad se une a la expansión moderna con este tono azul intenso.Lleva tu manicura del día a la noche con este espectacular esmalte de uñas de larga duración.OPI Infinite Shine es un sistema de 3 pasos que proporciona hasta 11 días de uso y un brillo parecido al gel.',
        950,
        'Producto',
        'Manicuría',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/isnt-it-grand-avenue-islla07-long-lasting-nail-polish-99350098525_xrvb5b.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/isnt-it-grand-avenue-islla07-long-lasting-nail-polish-99350098525_xrvb5b.jpg',
        true,
        'Esmalte de larga duración'),

        ('Infinite Shine ProStay Primer - OPI',
        'Juntos, el ProStay Primer y Gloss proporcionan óptima potencia de adherencia, menos astillado, 60 % más de retención de brillo y 25 % más de brillo. Úsalos con uno de los 122 tonos de Infinite Shine para hasta 11 días* de uso y lustre tipo gel',
        830,
        'Producto',
        'Manicuría',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/infinite-shine-prostay-primer-ist11-long-lasting-nail-polish-22006697211_3_0_0_zte6wd.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/infinite-shine-prostay-primer-ist11-long-lasting-nail-polish-22006697211_3_0_0_zte6wd.jpg',
        true,
        'Base para esmalte de larga duración'),

        ('Infinite Shine ProStay Gloss - OPI',
        'Juntos, el ProStay Primer y Gloss proporcionan óptima potencia de adherencia, menos astillado, 60 % más de retención de brillo y 25 % más de brillo. Úsalos con uno de los 122 tonos de Infinite Shine para hasta 11 días* de uso y lustre tipo gel',
        830,
        'Producto',
        'Manicuría',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/infinite-shine-prostay-gloss-ist31-long-lasting-nail-polish-22006697231_3_0_0_ad43te.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048723/Productos/infinite-shine-prostay-gloss-ist31-long-lasting-nail-polish-22006697231_3_0_0_ad43te.jpg',
        true,
        'Protector para esmalte de larga duración'),

        ('Shampoo y Acond. Oriental Premium - Kerasys',
        'Tipo de cabello dañados por decoloración y luces. Revitaliza el cabello dañado por la química, dando elasticidad y movimiento con un toque irresistible de suavidad y brillo dejando el cabello radiante. Ingredientes especiales: aceite de Semilla de Camelia, Extracto de Orquídea y esencia Oriental.',
        1900,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/oriental_premium_duo_ctcovb.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/oriental_premium_duo_ctcovb.jpg',
        true,
        'Shampoo y Acond. para cabello dañado'),

        ('Shampoo y Acond. Salon Care - Kerasys',
        'Tipo de cabello dañado y frágil. Contiene extractos naturales de aceite de girasol que proporcionan beneficios antioxidantes y extracto de moringa que es rico en ácidos grasos y vitaminas A,C y una tecnología con protección térmica.',
        1900,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/sc_nutritive_ampoule_duo_wjorj9.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/sc_nutritive_ampoule_duo_wjorj9.jpg',
        true,
        'Shampoo y Acond. para cabellos frágiles'),

        ('Ampollas Ampoule Oriental Premium x4 - Kerasys',
       'Tipo de cabello dañados por decoloración y luces. El resultado obtenido es una superficie más lisa que permite un mayor reflejo de luz, creando un brillo intenso, proporcionando una base perfecta para la finalización perfecta con el aceite de Camelia.',
        1700,
        'Producto',
        'Peluquería',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/oriental_premium_ampoulex4_gtutin.jpg',
        'https://res.cloudinary.com/dhcdkw7os/image/upload/v1638048724/Productos/oriental_premium_ampoulex4_gtutin.jpg',
        true,
        'Ampolla para cabello dañado.');"
}

# funcion para subir muestras de prueba a la base de datos
function subir_muestras() {
  psql -d example -U gitpod -c "INSERT INTO public.muestra (nombre,imagen, thumbnail, categoria, activo)                             
VALUES ('Muestra1','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello2_yceqnt.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello2_yceqnt.jpg','Peluquería', true),
('Muestra2','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello3_jqncxy.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello3_jqncxy.jpg','Peluquería', true),
('Muestra3','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello4_ynxfh2.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello4_ynxfh2.jpg','Peluquería', true),
('Muestra4','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello1_s3joci.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello1_s3joci.jpg','Peluquería', true),
('Muestra5','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello8_zmz8ab.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello8_zmz8ab.jpg','Peluquería', true),
('Muestra6','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello7_vujojl.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978949/Muestras/Cabello7_vujojl.jpg','Peluquería', true),
('Muestra7','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello9_ajjpgi.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello9_ajjpgi.jpg','Peluquería', true),
('Muestra8','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello12_x0zwzn.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello12_x0zwzn.jpg','Peluquería', true),
('Muestra9','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello10_obgn7w.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello10_obgn7w.jpg','Peluquería', true),
('Muestra10','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello11_ta7hb8.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello11_ta7hb8.jpg','Peluquería', true),
('Muestra11','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello14_k8gtyc.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello14_k8gtyc.jpg','Peluquería', true),
('Muestra12','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello13_dudm3j.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello13_dudm3j.jpg','Peluquería', true),
('Muestra13','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello16_qoafwj.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello16_qoafwj.jpg','Peluquería', true),
('Muestra14','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello18_b8j3se.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello18_b8j3se.jpg','Peluquería', true),
('Muestra15','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello19_xcb1hp.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello19_xcb1hp.jpg','Peluquería', true),
('Muestra16','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello15_mrvjzj.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello15_mrvjzj.jpg','Peluquería', true),
('Muestra17','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello20_pmepyf.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello20_pmepyf.jpg','Peluquería', true),
('Muestra18','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello17_gzvkev.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978950/Muestras/Cabello17_gzvkev.jpg','Peluquería', true),
('Muestra19','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/Cabello21_icjpzi.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/Cabello21_icjpzi.jpg','Peluquería', true),
('Muestra20','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/Cabello22_t5lrd7.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/Cabello22_t5lrd7.jpg','Peluquería', true),
('Muestra21','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as3_yhzeai.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as3_yhzeai.jpg','Manicuría', true),
('Muestra22','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as2_ylsko6.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as2_ylsko6.jpg','Manicuría', true),
('Muestra23','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as1_heedcp.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as1_heedcp.jpg','Manicuría', true),
('Muestra24','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as6_gf2crq.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as6_gf2crq.jpg','Manicuría', true),
('Muestra25','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as5_h7jcal.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as5_h7jcal.jpg','Manicuría', true),
('Muestra26','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as4_yxmhob.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as4_yxmhob.jpg','Manicuría', true),
('Muestra27','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as7_mgc1so.jpg','https://res.cloudinary.com/dhcdkw7os/image/upload/v1637978951/Muestras/U%C3%B1as7_mgc1so.jpg','Manicuría', true);"
}